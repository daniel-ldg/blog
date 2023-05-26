import { Button, Center, Input, Modal, Stack } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconCircleCheckFilled, IconCircleMinus, IconDragDrop, IconEmphasis } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Image as PrismaImage } from ".prisma/client";
import ImageKit from "imagekit-javascript";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGE_KIT_END_POINT || "";
const publicKey = process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || "";
const authenticationEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/imageUploadAuth`;

interface Props {
	opened: boolean;
	onClose: () => void;
	onUploaded: (upload: PrismaImage) => void;
}

const UploadImageModal: React.FC<Props> = ({ opened, onClose, onUploaded }) => {
	const [alt, setAlt] = useState("");
	const [files, setFiles] = useState<FileWithPath[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const isFileSelected = !!files.length;
	const preview = files
		.map((file, i) => {
			const imageUrl = URL.createObjectURL(file);
			return <Image key={i} src={imageUrl} alt='preview' style={{ objectFit: "contain" }} height={100} width={200} />;
		})
		.at(0);

	const uploadImage = () => {
		const file = files.at(0);
		if (!file) {
			console.warn("no file");
			return;
		}
		setIsLoading(true);
		const { name: fileName } = file;
		new ImageKit({ publicKey, urlEndpoint, authenticationEndpoint })
			.upload({ file, fileName })
			.then(uploadResponse => {
				const { url, height, width } = uploadResponse;
				onUploaded({ alt, url, height, width });
				onClose();
			})
			.catch(console.error)
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		if (!opened) {
			setFiles([]);
			setAlt("");
		}
	}, [opened]);

	return (
		<Modal opened={opened} onClose={onClose} title='Subir imagen' zIndex={3000} centered>
			<Stack>
				<Input.Wrapper label='Texto alternativo' description='Descripción del contenido de la imagen' withAsterisk>
					<Input icon={<IconEmphasis />} value={alt} onChange={e => setAlt(e.target.value)} disabled={isLoading} />
				</Input.Wrapper>
				<Input.Wrapper label='Imagen' withAsterisk>
					<Dropzone onDrop={setFiles} multiple={false} accept={IMAGE_MIME_TYPE} disabled={isLoading}>
						<Center h={100} mx='auto' pos='relative'>
							<Dropzone.Idle>
								{isFileSelected && preview}
								{!isFileSelected && <IconDragDrop size='3rem' />}
							</Dropzone.Idle>
							<Dropzone.Accept>
								<IconCircleCheckFilled size='3rem' />
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconCircleMinus size='3rem' />
							</Dropzone.Reject>
						</Center>
					</Dropzone>
				</Input.Wrapper>
				<Button disabled={alt === "" || !files.length} onClick={uploadImage} loading={isLoading}>
					Subir
				</Button>
			</Stack>
		</Modal>
	);
};

export default UploadImageModal;

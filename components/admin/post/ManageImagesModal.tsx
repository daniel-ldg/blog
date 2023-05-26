import { Alert, Button, Group, LoadingOverlay, Modal, Skeleton, Stack } from "@mantine/core";
import useSWRMutation, { MutationFetcher } from "swr/mutation";
import { Image } from "@prisma/client";
import { useEffect } from "react";
import CenteredImage from "@/components/images/CenteredImage";
import { z } from "zod";
import useMutableList from "@/hooks/useMutableList";
import { Flatten } from "@/utils/TypeUtils";
import { IconAlertCircle, IconArrowBigDown, IconArrowBigUp, IconCloudUpload, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import UploadImageModal from "../UploadImageModal";

interface ModalProps {
	opened: boolean;
	onClose: () => void;
	postUrl: string;
}

const ManageImagesModal: React.FC<ModalProps> = ({ opened, onClose, postUrl: post }) => {
	const {
		data: serverImages,
		error,
		isMutating,
		trigger,
	} = useSWRMutation<FetcherResponse, any, string, Image[] | undefined>(post, fetcher);
	const { list: images, setList: setImages, moveBefore, moveAfter, remove } = useMutableList<Flatten<FetcherResponse>>([]);
	const [showUpload, { open: openUpload, close: closeUpload }] = useDisclosure();

	useEffect(() => {
		if (opened) {
			trigger(undefined).then(res => setImages(res ?? []));
		} else {
			setImages([]);
		}
	}, [opened]);

	const topImage = 0;
	const midImage = 1;
	const bottomImage = 2;

	const setupImage = (i: number) => (
		<PreviewImage
			image={serverImages?.at(i)}
			index={i}
			max={serverImages ? serverImages.length - 1 : 0}
			onMoveDown={() =>
				moveAfter(i)
					.then(updated => trigger(updated))
					.catch(console.error)
			}
			onMoveUp={() =>
				moveBefore(i)
					.then(updated => trigger(updated))
					.catch(console.error)
			}
			onRemove={() =>
				remove(i)
					.then(updated => trigger(updated))
					.catch(console.error)
			}
			onAdd={openUpload}
		/>
	);

	const onAddedImage = (newImage: Image) => {
		if (serverImages) {
			trigger([...serverImages, newImage]);
		}
	};

	return (
		<>
			<UploadImageModal opened={showUpload} onClose={closeUpload} onUploaded={onAddedImage} />
			<Modal size='lg' opened={opened} onClose={onClose} title='Admistrar imágenes' zIndex={2000}>
				<Stack pos='relative' pb='xl' px='xl'>
					<LoadingOverlay visible={isMutating} overlayBlur={2} />
					{!!error && (
						<Alert icon={<IconAlertCircle size='1rem' />} color='red'>
							Se ha producido un error inesperado
						</Alert>
					)}
					<Skeleton animate={false} height={10} width='70%' />
					{setupImage(topImage)}
					<Skeleton animate={false} height={2} width='50%' mx='auto' />
					<div>
						<Skeleton animate={false} height={2} width='100%' />
						<Skeleton animate={false} height={2} width='100%' mt={4} />
						<Skeleton animate={false} height={2} width='100%' mt={4} />
						<Skeleton animate={false} height={2} width='60%' mt={4} />
					</div>
					{setupImage(midImage)}
					<div>
						<Skeleton animate={false} height={5} width='50%' mt={4} />
						<Skeleton animate={false} height={2} width='100%' mt={10} />
						<Skeleton animate={false} height={2} width='100%' mt={4} />
						<Skeleton animate={false} height={2} width='100%' mt={4} />
						<Skeleton animate={false} height={2} width='60%' mt={4} />
					</div>
					{setupImage(bottomImage)}
				</Stack>
			</Modal>
		</>
	);
};

type FetcherArgs = { post: string; images?: Image[] };

const fetcher: MutationFetcher<FetcherResponse, Image[] | undefined, string> = (post, { arg: images }) => {
	const api = "/api/postImages";
	const request: (images?: Image[]) => Promise<Response> = images => {
		if (images) {
			return fetch(api, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ post, images }),
			});
		} else {
			return fetch(`${api}?post=${post}`);
		}
	};

	return request(images)
		.then(res => res.json())
		.then(json => fetcherValidator.parse(json));
};

const fetcherValidator = z
	.object({
		url: z.string(),
		alt: z.string(),
		width: z.number(),
		height: z.number(),
	})
	.strict()
	.array();

type FetcherResponse = z.infer<typeof fetcherValidator>;

interface PreviewImageProps {
	image?: Image;
	onMoveUp: () => void;
	onMoveDown: () => void;
	onRemove: () => void;
	onAdd: () => void;
	index: number;
	max: number;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ image, index, max, onMoveUp, onMoveDown, onRemove, onAdd }) => {
	const placeholder: Image = {
		url: "/no_image_placeholder.svg",
		alt: "no image",
		height: 406,
		width: 329,
	};
	const isPlaceholder = !image;
	const isFirstImage = index === 0;
	const isLastImage = index === max;
	const isFirstPlaceholder = index === max + 1;

	return (
		<Group grow>
			<Stack spacing={5} align='center'>
				<Button variant='default' color='gray' compact disabled={isPlaceholder} onClick={onRemove}>
					<IconTrash stroke={1} />
				</Button>
				<Button variant='default' color='gray' compact disabled={!isFirstPlaceholder} onClick={onAdd}>
					<IconCloudUpload stroke={1} />
				</Button>
			</Stack>
			<div>
				<CenteredImage image={isPlaceholder ? placeholder : image} desiredHeight={100} />
			</div>
			<Stack spacing={5} align='center'>
				<Button variant='default' color='gray' compact disabled={isFirstImage || isPlaceholder} onClick={onMoveUp}>
					<IconArrowBigUp stroke={1} />
				</Button>
				<Button variant='default' color='gray' compact disabled={isLastImage || isPlaceholder} onClick={onMoveDown}>
					<IconArrowBigDown stroke={1} />
				</Button>
			</Stack>
		</Group>
	);
};

export default ManageImagesModal;

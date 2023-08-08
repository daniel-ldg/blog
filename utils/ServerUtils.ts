import { ServerResponse } from "http";

const sendChunkedBody = (res: ServerResponse) => {
	res.chunkedEncoding = true;

	// Create encoding to convert data (string) to Uint8Array
	const encoder = new TextEncoder();

	const write = async (data: string) => {
		if (res.writable) {
			res.write(encoder.encode(data));
		} else {
			throw new Error("Not writable: the stream has been destroyed, errored or ended");
		}
	};

	return { write };
};

export default sendChunkedBody;

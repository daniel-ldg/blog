import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { imagekit } from "@/services/api/imagekit";

const handler: NextApiHandler = async (req, res) => {
	// Check for session to confirm this is a valid request
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).end("Unauthorized");
	}
	try {
		res.json(imagekit.getAuthenticationParameters());
		return res.end();
	} catch (err) {
		return res.status(500).send("Error");
	}
};

export default handler;

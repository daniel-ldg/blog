import { ExtendedPost } from "@/services/posts.service";
import { Blockquote, Space, Title } from "@mantine/core";
import React from "react";
import CenteredImage from "../images/CenteredImage";
import PostInfo from "./PostInfo";

interface IProps {
	post: ExtendedPost;
}

const PostViewer: React.FC<IProps> = ({ post }) => {
	const mainImage = post.images.at(0);
	const extraImageOne = post.images.at(1);
	const extraImageTwo = post.images.at(2);
	return (
		<article>
			<Title>{post.title}</Title>
			<PostInfo author={post.author} date={post.createdAt} />
			{mainImage && <CenteredImage image={mainImage} priority={true} />}
			<Blockquote cite={`- ${post.quote?.author || "Anónimo"}`}>{post.quote?.text}</Blockquote>
			<section>
				{post.introduction.map((paragraph, i) => (
					<p key={i}>{paragraph}</p>
				))}
			</section>
			{extraImageOne && <CenteredImage image={extraImageOne} />}
			{post.sections.map((section, i) => (
				<section key={i}>
					{section.title && <h2>{section.title}</h2>}
					{section.paragraphs.map((paragraph, j) => (
						<p key={j}>{paragraph}</p>
					))}
				</section>
			))}
			{extraImageTwo && <CenteredImage image={extraImageTwo} />}
			<section>
				{post.conclusion.map((paragraph, i) => (
					<p key={i}>{paragraph}</p>
				))}
			</section>
		</article>
	);
};

export default PostViewer;

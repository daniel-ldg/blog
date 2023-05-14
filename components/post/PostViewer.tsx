import { ExtendedPost } from "@/services/posts.service";
import { Blockquote, Divider, Title } from "@mantine/core";
import React from "react";
import CenteredImage from "../images/CenteredImage";
import PostInfo from "./PostInfo";
import Keywords from "./Keywords";
import RelatedPosts from "../posts/related/RelatedPosts";
import { placeholderPostImage } from "../images/Placeholders";

interface IProps {
	post: ExtendedPost;
}

const PostViewer: React.FC<IProps> = ({ post }) => {
	const mainImage = post.images.at(0) ?? placeholderPostImage;
	const extraImageOne = post.images.at(1);
	const extraImageTwo = post.images.at(2);
	return (
		<article>
			<Title>{post.title}</Title>
			<PostInfo author={post.author} date={post.createdAt} />
			<CenteredImage image={mainImage} priority={true} />
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
			{!extraImageTwo && <Divider my='sm' />}
			<section>
				{post.conclusion.map((paragraph, i) => (
					<p key={i}>{paragraph}</p>
				))}
			</section>
			<section>
				<Keywords keywords={post.keywords} asLink hideOverflow={false} />
			</section>
			<RelatedPosts postUrl={post.url} />
		</article>
	);
};

export default PostViewer;

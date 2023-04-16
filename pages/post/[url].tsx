import PostViewer from "@/components/post/PostViewer";
import { ExtendedPost, getAllPostUrl, getPost } from "@/services/posts.service";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
	url: string;
}

interface IProps {
	post: ExtendedPost;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const allPostUrl = await getAllPostUrl();
	return { paths: allPostUrl.map(url => ({ params: { url } })), fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async context => {
	const { url } = context.params!;
	const post = await getPost(url);
	if (!post) {
		return { notFound: true };
	}
	const props: IProps = {
		post,
	};

	return { props };
};

const ViewPost: React.FC<IProps> = ({ post }) => {
	const image = post.images.at(0);
	const authorInfo = !post.author
		? undefined
		: {
				firstName: post.author.name.split(" ").at(0) || "",
				lastName: post.author.name.split(" ").slice(1).join(" "),
				userName: post.author.url,
		  };
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.introduction.at(0)} />
				<meta name='robots' content='follow, index' />
				<meta property='og:type' content='article' />
				<meta property='og:title' content={post.title} />
				{image && (
					<>
						<meta property='og:image' content={image.url} />
						<meta property='og:image:width' content={`${image.width}`} />
						<meta property='og:image:height' content={`${image.height}`} />
						<meta property='og:image:alt' content={image.alt} />
					</>
				)}
				<meta property='og:description' content={post.introduction.at(0)} />
				<meta property='article:published_time' content={post.createdAt.toISOString()} />
				{post.keywords.map((keyword, i) => (
					<meta key={i} property='article:tag' content={keyword} />
				))}
				{authorInfo && (
					<>
						<meta property='profile:first_name' content={authorInfo.firstName} />
						<meta property='profile:last_name' content={authorInfo.lastName} />
						<meta property='profile:username' content={authorInfo.userName} />
					</>
				)}
			</Head>
			<PostViewer post={post} />
		</>
	);
};

export default ViewPost;

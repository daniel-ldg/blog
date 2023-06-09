import PostViewer from "@/components/post/PostViewer";
import { ExtendedPost, getAllPostUrl, getPost } from "@/services/posts.service";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { jsonLdScriptProps } from "react-schemaorg";
import { BlogPosting, FAQPage } from "schema-dts";

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
	const description = post.introduction.at(0);
	const fullUrl = `https://www.scriniun.com/post/${post.url}`;
	const authorInfo = !post.author
		? undefined
		: {
				firstName: post.author.name.split(" ").at(0) || "",
				lastName: post.author.name.split(" ").slice(1).join(" "),
				userName: post.author.url,
		  };

	const questions = post.sections.reduce<{ question: string; answer: string }[]>((prev, curr) => {
		const regex = new RegExp("¿.+\\\\?", "");
		const match = curr.title.match(regex);
		return match ? [...prev, { question: match.at(0)!, answer: curr.paragraphs.at(0)! }] : prev;
	}, []);
	return (
		<>
			<Head>
				{/* HTML Meta Tags */}
				<title>{post.title}</title>
				<meta name='description' content={description} />
				<meta name='robots' content='follow, index' />
				{/* Facebook Meta Tags */}
				<meta property='og:url' content={fullUrl} />
				<meta property='og:type' content='article' />
				<meta property='og:title' content={post.title} />
				<meta property='og:description' content={description} />
				{image && (
					<>
						<meta property='og:image' content={image.url} />
						<meta property='og:image:width' content={`${image.width}`} />
						<meta property='og:image:height' content={`${image.height}`} />
						<meta property='og:image:alt' content={image.alt} />
					</>
				)}
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
				{/* Twitter Meta Tags */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='scriniun.com' />
				<meta property='twitter:url' content={fullUrl} />
				<meta name='twitter:title' content={post.title} />
				<meta name='twitter:description' content={description} />
				{image && <meta name='twitter:image' content={image.url} />}
				{/* Google JSON-LD */}
				<script
					{...jsonLdScriptProps<BlogPosting>({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.title,
						name: post.title,
						description,
						datePublished: post.createdAt.toISOString(),
						...(post.author
							? {
									author: {
										"@type": "Person",
										name: post.author.name,
										url: `https://www.scriniun.com/autor/${post.author.url}`,
										image: {
											"@type": "ImageObject",
											url: post.author.picture,
											height: "200",
											width: "200",
										},
									},
							  }
							: {}),
						publisher: {
							"@type": "Organization",
							name: "scriniun",
							logo: {
								"@type": "ImageObject",
								url: "https://www.scriniun.com/scriniun_logo.svg",
								width: "850",
								height: "180",
							},
						},
						...(image
							? {
									image: {
										"@type": "ImageObject",
										url: image.url,
										height: `${image.height}`,
										width: `${image.width}`,
									},
							  }
							: {}),
						url: fullUrl,
						isPartOf: {
							"@type": "Blog",
							name: "scriniun",
							publisher: {
								"@type": "Organization",
								name: "scriniun",
							},
						},
						keywords: post.keywords,
					})}
				/>
				{questions.length && (
					<script
						{...jsonLdScriptProps<FAQPage>({
							"@context": "https://schema.org",
							"@type": "FAQPage",
							mainEntity: questions.map(entry => ({
								"@type": "Question",
								name: entry.question,
								acceptedAnswer: {
									"@type": "Answer",
									text: entry.answer,
								},
							})),
						})}
					/>
				)}
			</Head>
			<PostViewer post={post} />
		</>
	);
};

export default ViewPost;

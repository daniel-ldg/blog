import SimpleHeader from "@/components/header/SimpleHeader";
import { Container, MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";

const MyApp = (props: AppProps) => {
	const { Component, pageProps } = props;

	return (
		<>
			<Head>
				<title>Page title</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: "light",
				}}>
				<SimpleHeader />
				<Container size={"sm"} mb='xl'>
					<Component {...pageProps} />
				</Container>
			</MantineProvider>
		</>
	);
};

export default MyApp;

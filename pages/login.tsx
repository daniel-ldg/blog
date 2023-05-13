import { Alert, Button, PinInput, Stack, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { getProviders, signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";

interface IProps {
	providers: Awaited<ReturnType<typeof getProviders>>;
	error?: string;
	callbackUrl?: string;
}

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
	const { req, res, query } = context;
	const session = await getServerSession(req, res, authOptions);

	let error;
	if (query.error) {
		error = Array.isArray(query.error) ? query.error[0] : query.error;
	}

	let callbackUrl;
	if (query.callbackUrl) {
		callbackUrl = Array.isArray(query.callbackUrl) ? query.callbackUrl[0] : query.callbackUrl;
	}

	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (session) {
		return { redirect: { permanent: false, destination: "/" } };
	}

	const providers = await getProviders();
	return {
		props: { providers, error, callbackUrl },
	};
};

const Login: React.FC<IProps> = ({ providers, error, callbackUrl }) => {
	const [pin, setPin] = useState<string>("");
	const credentialsProvider = providers?.credentials;
	const pinLength = 6;

	if (!credentialsProvider) {
		return (
			<Alert icon={<IconAlertCircle size='1rem' />} title='error!' color='red'>
				Invalid auth config: Missing credentials provider
			</Alert>
		);
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		signIn(credentialsProvider.id, { callbackUrl, password: pin });
	};

	return (
		<>
			<Head>
				<title>Login</title>
				<meta name='robots' content='noindex' />
			</Head>

			<Stack align='center'>
				<Title>Login</Title>
				{error && (
					<Alert icon={<IconAlertCircle size='1rem' />} color='red' variant='outline'>
						{`Error: ${error}`}
					</Alert>
				)}
				<form onSubmit={handleSubmit}>
					<PinInput
						length={pinLength}
						type='number'
						mask
						value={pin}
						onChange={setPin}
						error={!!error && pin.length === 0}
					/>
					<Button type='submit' fullWidth mt='lg' disabled={pin.length !== pinLength}>
						Login
					</Button>
				</form>
			</Stack>
		</>
	);
};

export default Login;

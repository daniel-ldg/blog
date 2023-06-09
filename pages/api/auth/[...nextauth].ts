import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	// nescesary to work
	secret: process.env.NEXTAUTH_SECRET,
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "PIN",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				password: { label: "PIN", type: "password" },
			},
			async authorize(credentials) {
				// Add logic here to look up the user from the credentials supplied

				const adminPin = process.env.ADMIN_PIN;
				if (typeof adminPin !== "string") {
					return Promise.reject(new Error("Invalid config (pin)"));
				}

				let user = null;
				if (credentials?.password === adminPin) {
					user = { id: "1", name: "Admin" };
				}
				return user;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
};

export default NextAuth(authOptions);

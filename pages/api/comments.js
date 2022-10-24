/**
 * Any file inside the pages/api is mapped to /api/* and
 * will be treated as an API endpoint instead of a page
 */

import { GraphQLClient, gql } from 'graphql-request';

/** graphql endpoint */
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

/** export a default function for API route to work */
export default async function comments(req, res) {
	const client = new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
		},
	});

	/** create comment query */
	const query = gql`
		mutation createComment(
			$name: String!
			$email: String!
			$comment: String!
			$slug: String!
		) {
			createComment(
				data: {
					name: $name
					email: $email
					comment: $comment
					post: { connect: { slug: $slug } }
				}
			) {
				id
			}
		}
	`;

	try {
		const result = await client.request(query, {
			name: req.body.name,
			email: req.body.email,
			comment: req.body.comment,
			slug: req.body.slug,
		});

		return res.status(200).send(result);
	} catch (error) {
		return res.status(500).send(error);
	}
}

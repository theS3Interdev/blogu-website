import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				Author: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				Category: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				Comment: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				Post: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

/** configure the apollo client */
const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT,
	cache: cache,
});

export default client;

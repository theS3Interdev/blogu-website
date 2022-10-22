import { gql } from '@apollo/client';

const getPosts = gql`
	query getPosts {
		posts {
			author {
				id
				name
				photo {
					url
				}
				bio
			}
			title
			slug
			excerpt
			featuredImage {
				url
			}
			categories {
				name
				slug
			}
			createdAt
		}
	}
`;

export { getPosts };

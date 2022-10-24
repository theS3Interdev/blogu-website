import { request, gql } from 'graphql-request';

/** graphql endpoint */
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

/** getPosts query */
export const getPosts = async () => {
	const query = gql`
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

	const result = await request(endpoint, query);

	return result.posts;
};

/** getPostDetails query */
export const getPostDetails = async (slug) => {
	const query = gql`
		query getPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				title
				slug
				excerpt
				featuredImage {
					url
				}
				author {
					name
					bio
					photo {
						url
					}
				}
				content {
					raw
				}
				categories {
					name
					slug
				}
				createdAt
			}
		}
	`;

	const result = await request(endpoint, query, { slug });

	return result.post;
};

/** getRecentPosts query */
export const getRecentPosts = async () => {
	const query = gql`
		query getRecentPosts {
			posts(orderBy: createdAt_ASC, last: 3) {
				title
				slug
				featuredImage {
					url
				}
				createdAt
			}
		}
	`;

	const result = await request(endpoint, query);

	return result.posts;
};

/** getSimilarPosts query */
export const getSimilarPosts = async (slug, categories) => {
	const query = gql`
		query getSimilarPosts($slug: String!, $categories: [String!]) {
			posts(
				where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
				last: 3
			) {
				title
				slug
				featuredImage {
					url
				}
				createdAt
			}
		}
	`;

	const result = await request(endpoint, query, { slug, categories });

	return result.posts;
};

/** getAdjacentPosts query */
export const getAdjacentPosts = async (createdAt, slug) => {
	const query = gql`
		query getAdjacentPosts($createdAt: DateTime!, $slug: String!) {
			next: posts(
				first: 1
				orderBy: createdAt_ASC
				where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
			) {
				title
				slug
				featuredImage {
					url
				}
				createdAt
			}
			previous: posts(
				first: 1
				orderBy: createdAt_DESC
				where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
			) {
				title
				slug
				featuredImage {
					url
				}
				createdAt
			}
		}
	`;

	const result = await request(endpoint, query, { createdAt, slug });

	return { next: result.next[0], previous: result.previous[0] };
};

export const getFeaturedPosts = async () => {
	const query = gql`
    query getFeaturedPosts() {
      posts(where: {featuredPost: true}) {
        title
        slug
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        createdAt
      }
    }   
  `;

	const result = await request(endpoint, query);

	return result.posts;
};

/** getCategories query */
export const getCategories = async () => {
	const query = gql`
		query getCategories {
			categories {
				name
				slug
			}
		}
	`;

	const result = await request(endpoint, query);

	return result.categories;
};

/** submit comment */
export const submitComment = async (obj) => {
	const result = await fetch('/api/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(obj),
	});

	return result.json();
};

/** get comments */
export const getComments = async (slug) => {
	const query = gql`
		query getComments($slug: String!) {
			comments(where: { post: { slug: $slug } }) {
				name
				comment
				createdAt
			}
		}
	`;

	const result = await request(endpoint, query, { slug });

	return result.comments;
};

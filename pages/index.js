import client from '../lib/apollo-client';
import { getPosts } from '../graphql/queries/post-queries';
import { Layout, PostCard, Categories, PostWidget } from '../components/index';

/** fetch data at build time */
export const getStaticProps = async () => {
	const { data } = await client.query({
		query: getPosts,
	});

	return {
		props: { posts: data.posts },
	};
};

const Home = ({ posts }) => {
	return (
		<Layout title="Home">
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
				<div className="col-span-1 lg:col-span-8">
					{posts.map((post, index) => (
						<PostCard key={index} post={post} />
					))}
				</div>

				<div className="col-span-1 lg:col-span-4">
					<div className="relative top-8 lg:sticky">
						<PostWidget />
						<Categories />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;

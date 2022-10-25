import { useRouter } from 'next/router';
import { getCategories, getCategoryPosts } from '../../services';
import { Categories, Layout, Loader, PostCard } from '../../components';

/** fetch data at build time */
export const getStaticProps = async ({ params }) => {
	const data = await getCategoryPosts(params.slug);

	return {
		props: {
			posts: data,
		},
		revalidate: 55,
	};
};

/**define a list of paths to be statically generated */
export const getStaticPaths = async () => {
	const categories = await getCategories();

	return {
		paths: categories.map(({ slug }) => ({ params: { slug } })),

		/** server-render pages on-demand if the path doesn't exist. */
		fallback: 'blocking',
	};
};

const CatgegoryPost = ({ posts }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Loader />;
	}

	return (
		<Layout title="Category">
			<div className="container mx-auto mb-8 px-10">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					<div className="col-span-1 lg:col-span-8">
						{posts.map((post, index) => (
							<PostCard key={index} post={post} />
						))}
					</div>
					<div className="col-span-1 lg:col-span-4">
						<div className="relative top-8 lg:sticky">
							<Categories />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CatgegoryPost;

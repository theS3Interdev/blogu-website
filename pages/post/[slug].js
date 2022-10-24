import { getPosts, getPostDetails } from '../../services/index';
import {
	Author,
	Categories,
	Comments,
	CommentsForm,
	Layout,
	PostDetail,
	PostWidget,
} from '../../components/index';

/** fetch data at build time */
export const getStaticProps = async ({ params }) => {
	const data = await getPostDetails(params.slug);

	return {
		props: {
			post: data,
		},
	};
};

/**define a list of paths to be statically generated */
export const getStaticPaths = async () => {
	const posts = await getPosts();

	return {
		paths: posts.map(({ slug }) => ({ params: { slug } })),

		/** server-render pages on-demand if the path doesn't exist. */
		fallback: 'blocking',
	};
};

const PostDetails = ({ post }) => {
	return (
		<Layout title={post.title}>
			<div className="container mx-auto mb-8 px-10">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					<div className="col-span-1 lg:col-span-8">
						<PostDetail post={post} />
						<Author author={post.author} />
						<CommentsForm slug={post.slug} />
						<Comments slug={post.slug} />
					</div>

					<div className="col-span-1 lg:col-span-4">
						<div className="relative top-8 lg:sticky">
							<PostWidget
								slug={post.slug}
								categories={post.categories.map((category) => category.slug)}
							/>
							<Categories />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PostDetails;

import { Layout, PostCard, Categories, PostWidget } from '../components/index';

const posts = [
	{
		id: 1,
		title: 'React Testing',
		excerpt: 'Facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
	},
	{
		id: 2,
		title: 'React with Tailwind',
		excerpt: 'Facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
	},
];

const Home = () => {
	return (
		<Layout title="Home">
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
				<div className="col-span-1 lg:col-span-8">
					{posts.map((post) => (
						<PostCard key={post.id} post={post} />
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

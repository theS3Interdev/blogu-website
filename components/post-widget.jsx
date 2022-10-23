import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { getRecentPosts, getSimilarPosts } from '../services/index';

const PostWidget = ({ slug, categories }) => {
	const [relatedPosts, setRelatedPosts] = useState([]);

	useEffect(() => {
		if (slug) {
			getSimilarPosts(slug, categories).then((result) => setRelatedPosts(result));
		} else {
			getRecentPosts().then((result) => setRelatedPosts(result));
		}
	}, [slug, categories]);

	return (
		<div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
			<h3 className="mb-8 border-b pb-4 text-xl font-semibold">
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>

			{relatedPosts.map((post, index) => (
				<div key={index} className="mb-4 flex w-full items-center">
					<div className="w-16 flex-none">
						<Image
							src={post.featuredImage.url}
							alt={post.title}
							unoptimized
							width="55px"
							height="55px"
							className="rounded-lg align-middle"
						/>
					</div>

					<div className="ml-4 flex-grow">
						<p className="font-xs font-semibold text-gray-800">
							{format(parseISO(post.createdAt), 'MMMM do, yyyy')}
						</p>
						<Link key={index} href={`/post/${post.slug}`}>
							<span className="text-md cursor-pointer transition duration-500 hover:text-sky-500">
								{post.title}
							</span>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default PostWidget;

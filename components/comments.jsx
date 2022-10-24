import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import parse from 'html-react-parser';
import { getComments } from '../services';

const Comments = ({ slug }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getComments(slug).then((result) => {
			setComments(result);
		});
	}, [slug]);

	return (
		<>
			{comments.length > 0 && (
				<div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
					<h3 className="mb-8 border-b pb-4 text-xl font-semibold">
						{comments.length} Comments
					</h3>

					{comments.map((comment, index) => (
						<div key={index} className="mb-4 border-b border-gray-100 pb-4">
							<p className="mb-4">
								<span className="font-semibold">{comment.name}</span>{' '}
								{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
							</p>

							<p className="w-full whitespace-pre-line text-gray-800">
								{parse(comment.comment)}
							</p>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Comments;

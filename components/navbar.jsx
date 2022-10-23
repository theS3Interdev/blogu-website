import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategories } from '../services';

const Navbar = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories().then((newCategories) => {
			setCategories(newCategories);
		});
	}, []);

	return (
		<div className="container mx-auto mb-8 px-10">
			<div className="inline-block w-full border-b border-blue-500 py-8">
				<div className="block md:float-left">
					<Link href="/">
						<span className="cursor-pointer text-4xl font-bold text-white">Blogu</span>
					</Link>
				</div>

				<div className="hidden md:float-left md:contents">
					{categories.map((category) => (
						<Link href={`/category/${category.slug}`} key={category.slug}>
							<span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right">
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Navbar;

import Head from 'next/head';
import { Navbar } from './index';

const Layout = ({ title, children }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Blogu is the best GraphQL Blog Application on the web."
				/>
				<link rel="icon" type="image/png" href="/favicon.png" />
				<title>{title ? title + ' | Blogu' : 'Blogu'}</title>
			</Head>

			{/** body section start */}
			<div>
				{/** header section start start */}
				<header>
					<Navbar />
				</header>
				{/** header section start end */}

				{/** main content section start */}
				<main className="container mx-auto mb-8 px-10">{children}</main>
				{/** main content section end */}

				{/** footer section start start */}
				<footer></footer>
				{/** footer section start start */}
			</div>
			{/** body section end */}
		</>
	);
};

export default Layout;

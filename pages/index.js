import { getPosts } from "../services/index";
import { FeaturedPosts } from "../sections/index";
import { Layout, PostCard, Categories, PostWidget } from "../components/index";

/** fetch data at build time */
export const getStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: { posts },
    revalidate: 60,
  };
};

const Home = ({ posts }) => {
  return (
    <Layout title="Home">
      <FeaturedPosts />
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

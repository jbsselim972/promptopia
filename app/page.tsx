import Feed from "@components/Feed";
import Image from "next/image";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <div className="orange_gradient text-center">AI-Powered Prompts</div>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI-powered prompting tool for modern world
        to discover, create and share creative prompts.
      </p>

      <Feed />
    </section>
  );
};

export default Home;

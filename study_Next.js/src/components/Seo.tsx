import Head from "next/head";

const Seo = ({ title }: any) => {
  return (
    <Head>
      <title>{title} | movies</title>
    </Head>
  );
};

export default Seo;

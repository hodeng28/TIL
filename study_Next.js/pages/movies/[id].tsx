import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  console.log(router);
  return <div>{router.query.title || <h4>loading</h4>}</div>;
};
export default Details;

import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  return <div>{router.query.title || <h4>loading</h4>}</div>;
};
export default Details;

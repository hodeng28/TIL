import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  console.log(router);
  return <div>detail</div>;
};
export default Details;

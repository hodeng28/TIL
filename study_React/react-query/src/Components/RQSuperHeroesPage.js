import axios from "axios";
import { useQuery } from "react-query";

const RQSuperHeroesPages = () => {
  const { isLoading, data, isError, error } = useQuery("super-heroes", () => {
    axios.get("http://localhost:3000/superheroes");
  });

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Query Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
export default RQSuperHeroesPages;

import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:3000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:3000/Friends");
};

const RQSuperHeroesPages = () => {
  const { data, isLoading, isError, error } = useQuery(
    "super-heroes",
    fetchSuperHeroes
  );

  // 쿼리키, 쿼리 함수, 옵션
  // 쿼리 키가 다르면 호출하는 API가 같더라도 캐싱을 별도로 관리

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React-Query Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
export default RQSuperHeroesPages;

import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
  const response = await axios.get('http://jsonplaceholder.typicode.com/users/');
  return response.data;
}
function Users1() {
  const [state, refetch] = useAsync(getUsers, [], true);
  const { loading, error, data: users } = state;
  if (loading) return <div>로딩중</div>
  if (error) return <div>에러발생</div>
  if (!users) return <button onClick={refetch}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users1;

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const posts = [
  {
    id: 1,
    title: '정호영',
    body: 'rorororo'
  },
  {
    id: 2,
    title: '하이',
    body: '랠랠ㄹ랠'
  },
  {
    id: 3,
    title: '안녕~',
    body: 'ㅋㅋㅋㅋㅋㅋ'
  }
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
}

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find(post => post.id === id);
};


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

type TestUser = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestUser>
) {
  // 에디터 이미지 업로드를 위한 임시 테스트 토큰
  // 여기서 인증 서버에 인증 요청을 보내고 token 응답을 받음
  const token = 'luhhw4nsvrhtgk0x2ddm2yzt';
  res.setHeader(
    'Set-Cookie',
    serialize('ASP.NET_SessionId', token, { path: '/' })
  );

  res.status(200).json({ name: 'test' });
}

export const getCookie = (name: string) => {
  // name과 일치하는 cookie가져와 value 리턴
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name + '=([^;]*)')
  );

  return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
};

interface socialLoginInfo {
  name: string;
  division: number;
  idaccount: string;
  expires?: string;
}

export const setSocialInfo = ({
  name,
  division,
  idaccount,
  expires
}: socialLoginInfo) => {
  const socialInfo = {
    division,
    idaccount,
    status: 'complete'
  };

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    JSON.stringify(socialInfo)
  )};path=/${expires ? ';max-age=' + expires : ''}`;
};

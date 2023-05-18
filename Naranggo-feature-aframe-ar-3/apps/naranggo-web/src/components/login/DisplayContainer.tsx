import modalInformationAtom from '@/atoms/modalInformationAtom';
import { Box, Stack, styled } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import { isLoggedInAtom, loginRoutingAtom } from '@/atoms/webLoginAtom';
import router from 'next/router';

interface DisplayContainerProps {
  children?: React.ReactNode;
  modal?: boolean;
  pathName?: string;
  activeTab?: 1;
  value?: string;
}

const DisplayContainer = ({
  children,
  modal,
  pathName,
  activeTab
}: DisplayContainerProps) => {
  const setModalInformation = useSetAtom(modalInformationAtom);
  const [loginRouting, setLoginRouting] = useAtom(loginRoutingAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const handleModalOpen = () => {
    setModalInformation({
      type: 'NEED_LOGIN',
      handleClickRightBtn: () => {
        setLoginRouting({
          routingPage: pathName || location.pathname || '',
          storyListActiveTab: activeTab || 0,
          status: 'none'
        });
        router.push('/account/login');
      }
    });
  };

  if (window.isWebViewAccess || (!window.isWebViewAccess && isLoggedIn))
    return <>{children}</>;

  if (pathName || activeTab) {
    return <TabContents onMouseDown={handleModalOpen}>{children}</TabContents>;
  }

  if (modal) {
    return <Contents onMouseDown={handleModalOpen}>{children}</Contents>;
  }

  return <BoxWraper>{children}</BoxWraper>;
};

export default DisplayContainer;

const BoxWraper = styled(Box)(() => ({ display: 'none' }));

const Contents = styled(Stack)(() => ({}));

const TabContents = styled(Stack)(() => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',

  '& button': {
    width: '100%',
    opacity: 1
  }
}));

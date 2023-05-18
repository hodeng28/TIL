import useAuth from '@/hooks/useAuth';
import useWebAuth from '@/hooks/useWebAuth';
import React, { useCallback, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import modalInformationAtom from '@/atoms/modalInformationAtom';
import useOpenLoginPage from '@/hooks/useOpenLoginPage';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P> & NextPageWithLayout
) => {
  if (typeof window === 'undefined') {
    return WrappedComponent;
  }

  const AuthenticatedComponent = ({ ...props }) => {
    const { isError, error } = useAuth();
    const { isError: isWebError, error: webError } = useWebAuth();
    const setModalInformation = useSetAtom(modalInformationAtom);

    const getErrorMessage = useCallback(() => {
      switch (error?.response?.status || webError?.response?.status) {
        case 500:
          return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
        default:
          return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }
    }, [error, webError]);

    useOpenLoginPage();

    useEffect(() => {
      if (isError || isWebError) {
        setModalInformation({
          type: 'LOGIN_ERROR'
        });
      }
    }, [getErrorMessage, isError, isWebError, setModalInformation]);

    return <WrappedComponent {...props} />;
  };

  if (WrappedComponent.getLayout) {
    AuthenticatedComponent.getLayout = WrappedComponent.getLayout;
  }

  return AuthenticatedComponent;
};

export default withAuth;

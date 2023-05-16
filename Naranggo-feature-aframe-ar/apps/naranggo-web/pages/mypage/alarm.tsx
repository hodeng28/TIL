import { Stack, styled } from '@mui/material';
import AlertList from '@/components/List/AlertList';
import withAuth from '@/components/withAuth';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import useInfiniteScrollWithQuery from '@/hooks/useInfiniteScrollWithQuery';
import { useInfiniteList } from '@/components/story/queries';
import {
  getAlertList,
  GetAlertListRequestParam,
  useAllDelAlert
} from '@/components/follow/queries';
import { useEffect } from 'react';
import notificationIconShowAtom from '@/atoms/notificationIconShowAtom';
import modalInformationAtom from '@/atoms/modalInformationAtom';

const Alarm: NextPageWithLayout = () => {
  const { back } = useRouter();
  const currentTime = Date.now();
  const setIsShowNotification = useSetAtom(notificationIconShowAtom);
  const setModalInformation = useSetAtom(modalInformationAtom);

  const router = useRouter();

  const { accesstoken, iduser: loggedInUserId } =
    useAtomValue(loginProfileAtom);

  const {
    data: alertList,
    refetch,
    ObservationComponent
  } = useInfiniteScrollWithQuery<AlertItem>(
    useInfiniteList<AlertItem, GetAlertListRequestParam>({
      queryKey: ['alertList'],
      apiParam: {
        lastidalert: -1,
        accessId: loggedInUserId,
        accesstoken: accesstoken,
        timeStamp: currentTime
      },
      queryFn: getAlertList,
      pagingRequestParamKey: 'lastidalert',
      pagingParamKey: 'idalert',
      pagingType: 'IdProperty',
      pagingParamStartValue: -1
    })
  );

  const { mutate: delAlert } = useAllDelAlert();

  useEffect(() => {
    setIsShowNotification(false);
  }, [setIsShowNotification]);

  return (
    <>
      <Wrapper>
        <Header
          pageName="알림"
          options={{
            close: true,
            deleteNotification: [true, !alertList || !alertList.length]
          }}
          onClickClose={() => {
            if (
              typeof window.notificationPagePath === 'number' &&
              history.length === 2
            ) {
              router.push('/');
              return;
            }
            back();
          }}
          onClickDeleteNotification={() =>
            setModalInformation({
              type: 'DELETE_ALERT',
              handleClickRightBtn: () => {
                delAlert(
                  {
                    accesstoken,
                    accessId: loggedInUserId
                  },
                  {
                    onSuccess: refetch as () => void
                  }
                );
              }
            })
          }
        />
        {alertList?.length === 0 ? (
          <NoAlertList>새로운 알림이 없습니다.</NoAlertList>
        ) : (
          <AlertList
            alertList={alertList}
            ObservationComponent={ObservationComponent}
            alarmRefetching={refetch}
          />
        )}
      </Wrapper>
    </>
  );
};

export default withAuth(Alarm);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

const NoAlertList = styled(Stack)(() => ({
  marginTop: '50%',
  overflow: 'hidden',
  textAlign: 'center'
}));

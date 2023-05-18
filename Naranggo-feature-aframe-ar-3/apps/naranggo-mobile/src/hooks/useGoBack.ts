import WebView from 'react-native-webview';
import { Alert, BackHandler } from 'react-native';
import { useEffect, useState } from 'react';

const useGoBack = (ref: React.RefObject<WebView>) => {
  const [isGoBack, setIsGoBack] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const onClickAndroidBack = () => {
      if (url.split('app')[1] === '/mypage/edit' && isGoBack) {
        Alert.alert(
          '변경된 내용은 저장되지 않습니다.',
          '이 페이지를 나가시겠습니까?',
          [
            {
              text: '취소',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            { text: '나가기', onPress: () => ref.current.goBack() }
          ],
          { cancelable: false }
        );

        return true;
      }

      if (ref.current && isGoBack) {
        ref.current.goBack();

        return true;
      }

      Alert.alert(
        '종료 알림',
        '나랑고를 종료 하시겠습니까?',
        [
          {
            text: '취소',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: '확인', onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onClickAndroidBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onClickAndroidBack);
    };
  }, [isGoBack, ref, url]);

  return { setIsGoBack, setUrl };
};

export default useGoBack;

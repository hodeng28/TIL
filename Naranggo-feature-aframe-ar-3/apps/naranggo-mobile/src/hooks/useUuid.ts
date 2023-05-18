import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';

const useUuid = () => {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    DeviceInfo.getUniqueId().then((uniqueId) => {
      setUuid(`NRG_UUID=${uniqueId}`);
    });
  }, []);

  return uuid;
};

export default useUuid;

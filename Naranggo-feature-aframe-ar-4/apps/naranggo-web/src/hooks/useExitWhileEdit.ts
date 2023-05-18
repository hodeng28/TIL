import isHardwareBackButtonTriggeredAtom from '@/atoms/isHardwareBackButtonTriggeredAtom';
import modalInformationAtom from '@/atoms/modalInformationAtom';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import useIsDirty from './useIsDirty';

const useExitWhileEdit = <T>(
  editingState: T,
  option: {
    modalType: 'EXIT_NEW_WRITE' | 'EXIT_EDIT';
    runBeforeShowExitModal?: () => void;
    isWatchingStateInitializedImmediately?: boolean;
  }
) => {
  const { isStateInitialized, isDirty, setIsPossibleToInitialize } =
    useIsDirty<T>(editingState, option);
  const pageToExecuteRef = useRef<string>(window.location.href);

  const [isHardwareBackButtonTriggered, setIsHardwareBackButtonTriggered] =
    useAtom(isHardwareBackButtonTriggeredAtom);

  const [currentModalInformation, setModalInformation] =
    useAtom(modalInformationAtom);

  useEffect(() => {
    if (pageToExecuteRef.current !== window.location.href) {
      return;
    }

    if (
      isHardwareBackButtonTriggered &&
      isDirty &&
      currentModalInformation?.type !== option.modalType
    ) {
      option.runBeforeShowExitModal && option.runBeforeShowExitModal();
      setModalInformation({ type: option.modalType });
      return;
    }

    if (isHardwareBackButtonTriggered && !isDirty) {
      setIsHardwareBackButtonTriggered(false);
      history.back();
    }
  }, [
    editingState,
    isDirty,
    isHardwareBackButtonTriggered,
    currentModalInformation,
    option,
    setIsHardwareBackButtonTriggered,
    setModalInformation
  ]);

  return {
    isDirty,
    isStateInitialized,
    setIsPossibleToInitialize,
    setModalInformation
  };
};

export default useExitWhileEdit;

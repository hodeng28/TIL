import { reportModalAtom } from '@/atoms/ModalAtom';
import { useAtom } from 'jotai';
import router from 'next/router';
import { useEffect, useState } from 'react';

const useReport = () => {
  const [isReportModalAtom, setIsReportModalAtom] = useAtom(reportModalAtom);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    if (!isReportModalAtom) {
      setIsReportModalOpen(false);
    }
  }, [isReportModalAtom]);

  const handleCloseReportModal = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    setIsReportModalOpen(false);
    router.back();
  };

  const handleOpenReportModal = () => {
    setIsReportModalAtom(true);
    setIsReportModalOpen(true);
  };

  return {
    isReportModalOpen,
    handleOpenReportModal,
    handleCloseReportModal
  };
};

export default useReport;

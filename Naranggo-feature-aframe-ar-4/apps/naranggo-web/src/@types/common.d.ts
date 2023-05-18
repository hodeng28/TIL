type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type RequestPermissionStatus =
  | 'blocked' // 권한 승인 거부되었으며, 권한 승인 재요청도 불가함
  | 'denied' // 권한 요청된적도 없거나, 권한 승인이 거절됐지만 재요청이 가능함
  | 'granted' // 권한 승인
  | 'unavailable' // 기능 지원되지 않음 (일정상 고려 못함)
  | 'limited'; // 권한을 제한적으로 승인 (일정상 고려 못함)

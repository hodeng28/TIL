interface ApiResponse<T> {
  returnValue: number;
  data: T;
  message: string;
}

interface RepCode {
  code: number;
  message: string;
}

interface AccessInfo {
  accesstoken: string;
  accessId: number;
}

const myLogger = (store) => (next) => (action) => {
  console.log(action);
  console.log("\tPrev: ", store.getState());
  const result = next(action);
  console.log("\tNext: ", store.getState()); // 액션이 리듀서에서 처리가 모두 되고 난 다음에 그 다음 상태를 가져와서 콘솔 출력
  return result;
};

export default myLogger;

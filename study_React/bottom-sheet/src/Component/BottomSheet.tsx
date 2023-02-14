import { Stack, styled } from "@mui/material";
import useBottomSheet from "../useBottomSheet";
import BottomSheetHeader from "./BottomSheetHeader";

export const MIN_Y = 80; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 50; // 바텀시트가 최소로 내려갔을 때의 y 값
export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y;

const BottomSheet = () => {
  const { sheet } = useBottomSheet();
  return (
    <Wrapper ref={sheet}>
      <BottomSheetHeader />
    </Wrapper>
  );
};

export default BottomSheet;

const Wrapper = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  paddingTop: "16px",
  paddingBottom: "4px",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  zIndex: 1,
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)",
  height: `${BOTTOM_SHEET_HEIGHT}px`,
}));

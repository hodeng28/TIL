import { Stack, styled } from "@mui/material";

const BottomSheetHeader = () => {
  return (
    <Wrapper>
      <Handler />
    </Wrapper>
  );
};

export default BottomSheetHeader;

const Wrapper = styled(Stack)(() => ({
  height: "48px",
  position: "relative",
  paddingTop: "16px",
  paddingBottom: "4px",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
}));

const Handler = styled(Stack)(() => ({
  width: "32px",
  height: "4px",
  borderRadius: "2px",
  backgroundColor: "#d0d0d0",
  margin: "auto",
}));

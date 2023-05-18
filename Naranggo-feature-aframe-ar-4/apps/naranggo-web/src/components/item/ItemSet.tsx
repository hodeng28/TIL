import Image from 'next/image';
import theme from '@/utils/theme';
import {
  Stack,
  styled,
  ButtonGroup,
  Button,
  Typography,
  Input
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ItemImageModal from '../Modal/ItemImageModal';
import { useState } from 'react';

interface ItemSetInputProps {
  itemname?: string | string[];
  contents?: string | string[];
  imgpath?: string | string[];
  onChangeItemInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedIconImagePath: (imgpath: string) => void;
}

const ItemSet = ({
  itemname,
  contents,
  imgpath,
  onChangeItemInputValue,
  setSelectedIconImagePath
}: ItemSetInputProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Wrapper>
        <Stack>
          <ImageWrapper>
            {!imgpath ? (
              <StyledCameraAltIcon color="disabled" />
            ) : (
              <Image
                src={`/images/items/${imgpath}.png`}
                alt={`${imgpath}아이콘 이미지`}
                width={206}
                height={206}
              />
            )}
          </ImageWrapper>
          <ModalBtnGroup variant="contained">
            <ModalBtn>직접 올리기</ModalBtn>
            <ModalBtn onClick={() => setIsModalOpen(true)}>
              아이콘 선택
            </ModalBtn>
          </ModalBtnGroup>
        </Stack>
        <ItemTextFiledWrapper>
          <SetTypography>아이템 이름</SetTypography>
          <ItemTextField
            name="itemname"
            placeholder="아이템 이름을 적어주세요."
            size="small"
            value={itemname || ''}
            onChange={onChangeItemInputValue}
          />
          <SetTypography>아이템 설명</SetTypography>
          <ItemTextField
            name="contents"
            placeholder="아이템에 대한 설명을 적어주세요."
            size="small"
            value={contents || ''}
            onChange={onChangeItemInputValue}
          />
        </ItemTextFiledWrapper>
      </Wrapper>
      <ItemImageModal
        isModalOpen={isModalOpen}
        onClose={(imagepathParam?: string) => {
          setIsModalOpen(false);
          if (imagepathParam) {
            setSelectedIconImagePath(imagepathParam);
          }
        }}
      />
    </>
  );
};
export default ItemSet;

const Wrapper = styled(Stack)(() => ({
  padding: '.5rem',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const ImageWrapper = styled(Stack)(() => ({
  position: 'relative',
  width: '13rem',
  height: '13rem',
  margin: '3rem auto .5rem',
  background: theme.palette.custom.grey200,
  border: `1px solid ${theme.palette.custom.dark}`
}));

const StyledCameraAltIcon = styled(CameraAltIcon)(() => ({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 4.5rem)',
  fontSize: '4.5rem'
}));

const ModalBtnGroup = styled(ButtonGroup)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '14rem',
  margin: '0 auto 2rem',
  boxShadow: 'none',
  border: 'none'
}));

const ModalBtn = styled(Button)(() => ({
  marginTop: '1rem',
  color: theme.palette.custom.light,
  backgroundColor: theme.palette.custom.blue,
  borderRadius: '.25rem !important'
}));

const ItemTextFiledWrapper = styled(Stack)(() => ({
  padding: '0 1rem'
}));

const SetTypography = styled(Typography)(() => ({
  color: theme.palette.custom.dark,
  fontWeight: 'bold'
}));

const ItemTextField = styled(Input)(() => ({
  marginBottom: '2rem'
}));

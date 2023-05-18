import Image from 'next/image';
import { Box, Stack, styled, Modal } from '@mui/material';
import theme from '@/utils/theme';
import { ITEM_IMAGE } from '../../ItemImage';

interface ItemModalProps {
  isModalOpen: boolean;
  onClose: (imgpath?: string) => void;
}

const ItemImageModal = ({ isModalOpen, onClose }: ItemModalProps) => {
  const handleOnClose = (imgpath: string) => {
    onClose(imgpath);
  };

  return (
    <Modal open={isModalOpen} onClose={handleOnClose}>
      <ModalWrapper>
        <AlignWrapper>
          <ItemImageWrapper>
            {ITEM_IMAGE.map(({ imgpath, imgname }) => (
              <IconImage
                key={imgname}
                src={`/images/items/${imgpath}.png`}
                alt={imgname}
                width={60}
                height={60}
                onClick={() => handleOnClose(imgpath)}
              />
            ))}
          </ItemImageWrapper>
        </AlignWrapper>
      </ModalWrapper>
    </Modal>
  );
};

export default ItemImageModal;

const ModalWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20rem',
  height: '35rem',
  padding: '1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '.25rem',
  border: 'none'
}));

const AlignWrapper = styled(Stack)(() => ({
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignSelf: 'center',
  position: 'relative',
  width: '100%',
  marginTop: '0.5rem',
  overflowY: 'auto',
  '& input': {
    marginBottom: '0.5rem'
  }
}));

const ItemImageWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignSelf: 'center',
  width: '100%',
  gap: '1rem',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const IconImage = styled(Image)(() => ({}));

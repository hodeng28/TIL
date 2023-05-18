import { Box, Modal, styled } from '@mui/material';
import Image from 'next/image';
import { NextImageWrapperTemplate } from '../common/style/CommonStyles';

interface ImageModalProps {
  open: boolean;
  src: string;
  onClose: () => void;
}

const ImageModal = ({ open, onClose, src }: ImageModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Wrapper as={Box}>
        <Image
          src={src}
          layout="fill"
          objectFit="contain"
          alt="content image"
        />
      </Wrapper>
    </Modal>
  );
};

export default ImageModal;

const Wrapper = styled(NextImageWrapperTemplate)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%'
}));

import { styled, Box } from '@mui/material';

const ContentEditable = styled(Box)(({ theme }) => ({
  '&:empty:before': {
    content: 'attr(placeholder)',
    display: 'block',
    fontSize: '1rem',
    color: theme.palette.custom.grey3
  },
  '&:focus': {
    outline: 'none'
  }
}));

const MarkerWrapper = styled('button')(() => ({
  position: 'absolute',
  width: '40px',
  height: '40px',
  transform: 'translate(-50%, -100%)',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none'
}));

export const NextImageWrapperTemplate = styled('template')(() => ({
  '& > span': {
    position: 'unset !important'
  },

  '& > span > img': {
    objectFit: 'contain',
    width: '100% !important',
    position: 'relative !important',
    height: 'unset !important'
  }
}));

export const CommonStyles = Object.freeze({
  ContentEditable,
  MarkerWrapper
});

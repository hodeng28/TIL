import { Box, styled } from '@mui/material';
import MapButton, { Control } from '../Button/MapButton';

interface MapControlButtonGroupProps {
  controls: Control[];
}

const MapControlButtonGroup = ({ controls }: MapControlButtonGroupProps) => {
  return (
    <ButtonWrapper>
      {controls.map((control) => (
        <MapButton key={control.type} {...control} />
      ))}
    </ButtonWrapper>
  );
};

export default MapControlButtonGroup;

const ButtonWrapper = styled(Box)(() => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  display: 'flex',
  flexDirection: 'column'
}));

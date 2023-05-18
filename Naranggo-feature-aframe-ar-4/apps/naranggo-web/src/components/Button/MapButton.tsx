import { styled } from '@mui/material';
import { shouldNotForwardProp } from '@/utils/helpers';
import PublicIcon from '@mui/icons-material/Public';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddIcon from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export type MapButtonType =
  | 'MapType'
  | 'UserLocation'
  | 'ZoomIn'
  | 'ZoomOut'
  | 'Expand'
  | 'Shrink'
  | 'Search';

export interface Control {
  type: MapButtonType;
  onClick: () => void;
}

type MapButtonProps = Control;

const MapButton = ({ type, onClick }: MapButtonProps) => {
  const [isSatellite, setIsSatellite] = useState(false);

  const btnTypeToComponent = {
    'MapType': <EarthIcon isSatellite={isSatellite} />,
    'UserLocation': <Icon as={MyLocationIcon} />,
    'ZoomIn': <Icon as={AddIcon} />,
    'ZoomOut': <Icon as={Remove} />,
    'Expand': <Icon as={FullscreenIcon} />,
    'Shrink': <Icon as={FullscreenExitIcon} />,
    'Search': <Icon as={SearchIcon} />
  };

  const handleClick = () => {
    if (type === 'MapType') {
      setIsSatellite(!isSatellite);
    }
    onClick();
  };

  return (
    <StyledBtn onClick={handleClick}>{btnTypeToComponent[type]}</StyledBtn>
  );
};

export default MapButton;

const StyledBtn = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '3px',
  padding: 0,
  margin: '0 0 16px 0',
  backgroundColor: theme.palette.custom.light,
  cursor: 'pointer'
}));

const EarthIcon = styled(
  PublicIcon,
  shouldNotForwardProp('isSatellite')
)<{ isSatellite?: boolean }>(({ theme, isSatellite }) => ({
  fontSize: '1.6rem',
  margin: '0.2rem',
  color: isSatellite ? '#736dee' : theme.palette.custom.grey
}));

const Icon = styled('template')(() => ({
  fontSize: '1.6rem',
  margin: '0.2rem',
  color: '#736dee'
}));

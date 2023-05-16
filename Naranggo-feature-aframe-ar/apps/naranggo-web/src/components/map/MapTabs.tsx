import { Button, Stack, styled, Typography } from '@mui/material';
import theme from '@/utils/theme';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import FilterModal from './FilterModal';

interface MapTabsProps {
  onClickRightTab: () => void;
  children: React.ReactNode;
}

const MapTabs = ({ children, onClickRightTab }: MapTabsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Stack direction="row">
      <TabBtn onClick={() => setIsModalOpen(true)}>
        <FilterAltIcon />
        <Typography>필터</Typography>
      </TabBtn>
      <TabBtn
        onClick={() => {
          onClickRightTab();
        }}
      >
        {children}
      </TabBtn>
      <FilterModal
        isModalOpen={isModalOpen}
        setIsModalClose={() => setIsModalOpen(false)}
        setIsModalOpen={() => setIsModalOpen(true)}
      />
    </Stack>
  );
};

export default MapTabs;

const TabBtn = styled(Button)(() => ({
  flex: 1,
  gap: '0.5rem',
  padding: '1rem',
  backgroundColor: theme.palette.custom.grey2,
  '&:hover': {
    backgroundColor: theme.palette.custom.grey2
  },
  color: theme.palette.custom.grey3
}));

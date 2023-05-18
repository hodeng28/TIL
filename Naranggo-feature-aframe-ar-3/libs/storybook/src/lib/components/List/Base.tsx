import { List, styled, SxProps } from '@mui/material';
import { forwardRef } from 'react';

interface ListProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  sx?: SxProps;
}

const BaseList = forwardRef<HTMLUListElement, ListProps>(
  ({ direction, sx, children }, ref) => {
    return direction === 'horizontal' ? (
      <Wrapper ref={ref} sx={sx}>
        {children}
      </Wrapper>
    ) : (
      <List ref={ref} sx={{ padding: '0 1rem', ...sx }}>
        {children}
      </List>
    );
  }
);

export default BaseList;

const Wrapper = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  gap: '1rem',
  overflowX: 'scroll',

  '& > li': {
    flex: '0 0 90%',
    alignItems: 'stretch',
    padding: 0
  }
}));

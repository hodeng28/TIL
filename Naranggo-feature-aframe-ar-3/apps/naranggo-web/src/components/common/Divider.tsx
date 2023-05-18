import { shouldNotForwardProp } from '@/utils/helpers';
import { styled } from '@mui/material';
import { CSSProperties } from 'react';

interface DividerProps {
  type?: 'row' | 'column';
  width?: string;
  height?: string;
  style?: CSSProperties;
}

const Divider = ({ type = 'row', ...props }: DividerProps) => {
  return (
    <>
      {type === 'row' ? (
        <RowDivider {...props} />
      ) : (
        <ColumnDivider {...props} />
      )}
    </>
  );
};

export default Divider;

const RowDivider = styled(
  'div',
  shouldNotForwardProp('width', 'height')
)<Omit<DividerProps, 'type'>>(({ theme, width, height }) => ({
  width: width || '100%',
  height: height || '0.1rem',
  border: 'none',
  backgroundColor: theme.palette.custom.grey200
}));

const ColumnDivider = styled(
  'div',
  shouldNotForwardProp('width', 'height')
)<Omit<DividerProps, 'type'>>(({ theme, width, height }) => ({
  width: width || '0.1rem',
  height: height || '1rem',
  border: 'none',
  backgroundColor: theme.palette.custom.grey200
}));

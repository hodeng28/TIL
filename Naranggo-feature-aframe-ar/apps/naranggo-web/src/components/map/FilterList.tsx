import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography
} from '@mui/material';
import theme from '@/utils/theme';
import React from 'react';

interface FilterListProps {
  title: string;
  filterList: FilterItem[];
  setFilterList: (list: FilterItem[]) => void;
}

const FilterList = ({ title, filterList, setFilterList }: FilterListProps) => {
  const handleChangeCheck = (clickedId: number) => {
    setFilterList(
      filterList.map(({ text, id, checked, filterType }) => ({
        text,
        id,
        checked: clickedId === id ? !checked : checked,
        filterType
      }))
    );
  };

  return (
    <List>
      <ListTitle>{title}</ListTitle>
      {filterList.map(({ text, id, checked }) => {
        return (
          <StorySet
            key={text}
            secondaryAction={
              <CheckBox
                edge="end"
                checked={checked}
                onChange={() => handleChangeCheck(id)}
              />
            }
          >
            <StorySetText primary={text} />
          </StorySet>
        );
      })}
    </List>
  );
};

export default React.memo(FilterList);

const ListTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1.1rem'
}));

const StorySet = styled(ListItem)(() => ({}));

const StorySetText = styled(ListItemText)(() => ({}));

const CheckBox = styled(Checkbox)(() => ({
  color: theme.palette.custom.yellow,
  '& .MuiSvgIcon-root': { fontSize: '1.5rem' },
  '&.Mui-checked': {
    color: theme.palette.custom.yellow
  }
}));

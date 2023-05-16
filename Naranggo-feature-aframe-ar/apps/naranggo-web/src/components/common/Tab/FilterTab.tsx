interface TabProps {
  children?: React.ReactNode;
  index: number;
  tabValue: number;
}

const FilterTab = ({ children, tabValue, index }: TabProps) => {
  return <div hidden={tabValue !== index}>{children}</div>;
};

export default FilterTab;

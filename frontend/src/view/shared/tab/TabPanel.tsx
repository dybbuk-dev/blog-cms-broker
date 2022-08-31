import MDBox from 'src/mui/components/MDBox';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <MDBox display={value === index ? 'block' : 'none'}>
      {children}
    </MDBox>
  );
}

export default TabPanel;

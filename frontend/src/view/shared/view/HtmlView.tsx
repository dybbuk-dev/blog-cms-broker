import { styled } from '@mui/material/styles';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import MDBox from 'src/mui/components/MDBox';

export const HtmlViewWrapper = styled('div')(() => ({
  fontSize: '1rem',
  fontWeight: 400,
  '& ul, ol': {
    paddingLeft: '3rem',
  },
  '& h1, h2, h3, h4, h5, h6, u strong': {
    display: 'block',
    lineHeight: '200%',
    marginTop: '1rem',
  },
  '& p': {
    marginBottom: '10px',
  },
  '& .table': {
    marginBottom: '20px',
    borderCollapse: 'collapse',
  },
  '& .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th':
    {
      padding: '8px',
      lineHeight: '1.42857143',
      verticalAlign: 'top',
      borderTop: '1px solid #ddd',
    },
  '& .table > thead > tr > th': {
    verticalAlign: 'bottom',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  '& .table > thead > tr:first-of-type > th': {
    borderTop: 0,
  },
  '& .table-hover > tbody > tr:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

function HtmlView({ value }) {
  return (
    <MDBox color="text">
      <HtmlViewWrapper>{parse(value)}</HtmlViewWrapper>
    </MDBox>
  );
}

HtmlView.propTypes = {
  value: PropTypes.any.isRequired,
};

export default HtmlView;

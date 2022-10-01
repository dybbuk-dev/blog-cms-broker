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
  '& h1, h2, h3, h4, h5, h6': {
    display: 'block',
    lineHeight: '200%',
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

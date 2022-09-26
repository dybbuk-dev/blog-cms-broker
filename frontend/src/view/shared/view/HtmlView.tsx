import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

const Content = styled('div')(() => ({
  padding: '2rem',
  zoom: 0.8,
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
    <Card>
      <Content>{parse(value)}</Content>
    </Card>
  );
}

HtmlView.propTypes = {
  value: PropTypes.string.isRequired,
};

export default HtmlView;

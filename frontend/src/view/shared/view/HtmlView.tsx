import parse from 'html-react-parser';
import PropTypes from 'prop-types';

function HtmlView({ value }) {
  return <>{parse(value)}</>;
}

HtmlView.propTypes = {
  value: PropTypes.string.isRequired,
};

export default HtmlView;

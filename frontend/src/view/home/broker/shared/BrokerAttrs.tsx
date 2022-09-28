import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import MaterialLink from '@mui/material/Link';
import PropTypes from 'prop-types';

function BrokerAttrs({
  records,
  attrs: { link, title },
  filterFn,
  renderFn,
  noIndent,
}) {
  return (records || []).filter(filterFn).map((v, idx) => (
    <AttrTypography key={idx} noIndent={noIndent}>
      <MaterialLink
        href={v[link]}
        target="_blank"
        underline="hover"
      >
        {renderFn ? renderFn(v) : v[title]}
      </MaterialLink>
    </AttrTypography>
  ));
}

BrokerAttrs.defaultProps = {
  records: [],
  attrs: {
    link: 'url',
    title: 'name',
  },
  filterFn: () => true,
  renderFn: null,
  noIndent: false,
};

BrokerAttrs.propTypes = {
  records: PropTypes.any,
  filterFn: PropTypes.func,
  attrs: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
  }),
  renderFn: PropTypes.func,
  noIndent: PropTypes.bool,
};

export default BrokerAttrs;

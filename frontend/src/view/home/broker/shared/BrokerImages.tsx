import ImageView from 'src/view/home/ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';

function BrokerImages({
  records,
  attrs: { link, image },
  filterFn,
  renderFn,
}) {
  return (
    <MDBox
      display="inline-flex"
      flexWrap="wrap"
      position="relative"
      gap={1}
      my={1}
      pl={3}
    >
      {(records || []).filter(filterFn).map((v, idx) => (
        <MaterialLink
          key={idx}
          href={v[link]}
          target="_blank"
        >
          {renderFn ? (
            renderFn(v)
          ) : (
            <ImageView value={v[image]} />
          )}
        </MaterialLink>
      ))}
    </MDBox>
  );
}

BrokerImages.defaultProps = {
  records: [],
  attrs: {
    link: 'url',
    image: 'image',
  },
  filterFn: () => true,
  renderFn: null,
};

BrokerImages.propTypes = {
  records: PropTypes.any,
  filterFn: PropTypes.func,
  attrs: PropTypes.objectOf(
    PropTypes.shape({
      link: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
  renderFn: PropTypes.func,
};

export default BrokerImages;

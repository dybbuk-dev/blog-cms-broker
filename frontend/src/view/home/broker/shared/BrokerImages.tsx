import AttachLink from 'src/view/home/broker/shared/AttachLink';
import ImageView from 'src/view/home/ImageView';
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
        <AttachLink key={idx} link={v[link]}>
          {renderFn ? (
            renderFn(v)
          ) : (
            <ImageView value={v[image]} />
          )}
        </AttachLink>
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
  attrs: PropTypes.shape({
    link: PropTypes.string,
    image: PropTypes.string,
  }),
  renderFn: PropTypes.func,
};

export default BrokerImages;

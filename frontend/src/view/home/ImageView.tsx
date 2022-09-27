import { CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

function ImageView({ value }) {
  const url = value && value[0] && value[0].downloadUrl;
  const alt = value && value[0] && value[0].name;
  return (
    <CardMedia
      component="img"
      src={url}
      alt={alt}
      sx={{
        margin: 0,
      }}
    />
  );
}

ImageView.propTypes = {
  value: PropTypes.any.isRequired,
};

export default ImageView;

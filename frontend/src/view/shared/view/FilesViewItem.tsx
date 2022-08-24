import PropTypes from 'prop-types';
import React from 'react';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import MDTypography from 'src/mui/components/MDTypography';

function FilesViewItem(props) {
  const { darkMode } = selectMuiSettings();

  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox
      pt={2}
      sx={{
        position: 'relative',
      }}
    >
      <MDTypography
        variant="caption"
        color={darkMode ? 'text' : 'secondary'}
        fontWeight="regular"
        sx={{
          lineHeight: 1,
          position: 'absolute',
          top: 0,
        }}
      >
        {props.label}
      </MDTypography>
      <FilesUploader readonly value={valueAsArray()} />
    </MDBox>
  );
}

FilesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default FilesViewItem;

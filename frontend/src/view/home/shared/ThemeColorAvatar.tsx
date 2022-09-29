import { Avatar } from '@mui/material';

import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

import lColors from 'src/mui/assets/theme/base/colors';
import dColors from 'src/mui/assets/theme-dark/base/colors';

function ThemeColorAvatar({ children }) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;

  return (
    <Avatar sx={{ bgcolor: colors[sidenavColor].main }}>
      {children}
    </Avatar>
  );
}

export default ThemeColorAvatar;

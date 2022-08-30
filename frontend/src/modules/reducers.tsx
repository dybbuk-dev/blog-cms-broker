import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import auth from 'src/modules/auth/authReducers';
import author from 'src/modules/author/authorReducers';
import category from 'src/modules/category/categoryReducers';
import layout from 'src/modules/layout/layoutReducers';
import mui from 'src/modules/mui/muiReducers';
import navigation from 'src/modules/navigation/navigationReducers';
import plan from 'src/modules/plan/planReducers';
import settings from 'src/modules/settings/settingsReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import user from 'src/modules/user/userReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auditLog,
    auth,
    author,
    category,
    layout,
    mui,
    navigation,
    plan,
    settings,
    tenant,
    user,
  });

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import auth from 'src/modules/auth/authReducers';
import author from 'src/modules/author/authorReducers';
import affiliateLink from 'src/modules/affiliateLink/affiliateLinkReducers';
import broker from 'src/modules/broker/brokerReducers';
import category from 'src/modules/category/categoryReducers';
import layout from 'src/modules/layout/layoutReducers';
import mui from 'src/modules/mui/muiReducers';
import news from 'src/modules/news/newsReducers';
import navigation from 'src/modules/navigation/navigationReducers';
import openx from 'src/modules/openx/openxReducers';
import plan from 'src/modules/plan/planReducers';
import promotion from 'src/modules/promotion/promotionReducers';
import settings from 'src/modules/settings/settingsReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import trackingParameter from 'src/modules/trackingParameter/trackingParameterReducers';
import user from 'src/modules/user/userReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    affiliateLink,
    auditLog,
    auth,
    author,
    broker,
    category,
    layout,
    mui,
    navigation,
    news,
    openx,
    plan,
    promotion,
    settings,
    tenant,
    trackingParameter,
    user,
  });

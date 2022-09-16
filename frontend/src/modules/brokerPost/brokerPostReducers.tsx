import list from 'src/modules/brokerPost/list/brokerPostListReducers';
import form from 'src/modules/brokerPost/form/brokerPostFormReducers';
import view from 'src/modules/brokerPost/view/brokerPostViewReducers';
import spam from 'src/modules/brokerPost/spam/brokerPostSpamReducers';
import review from 'src/modules/brokerPost/review/brokerPostReviewReducers';
import destroy from 'src/modules/brokerPost/destroy/brokerPostDestroyReducers';
import importerReducer from 'src/modules/brokerPost/importer/brokerPostImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  spam,
  review,
  destroy,
  importer: importerReducer,
});

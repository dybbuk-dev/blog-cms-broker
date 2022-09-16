import list from 'src/modules/blogComment/list/blogCommentListReducers';
import form from 'src/modules/blogComment/form/blogCommentFormReducers';
import view from 'src/modules/blogComment/view/blogCommentViewReducers';
import spam from 'src/modules/blogComment/spam/blogCommentSpamReducers';
import review from 'src/modules/blogComment/review/blogCommentReviewReducers';
import destroy from 'src/modules/blogComment/destroy/blogCommentDestroyReducers';
import importerReducer from 'src/modules/blogComment/importer/blogCommentImporterReducers';
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

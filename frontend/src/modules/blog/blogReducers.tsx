import list from 'src/modules/blog/list/blogListReducers';
import form from 'src/modules/blog/form/blogFormReducers';
import view from 'src/modules/blog/view/blogViewReducers';
import destroy from 'src/modules/blog/destroy/blogDestroyReducers';
import importerReducer from 'src/modules/blog/importer/blogImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});

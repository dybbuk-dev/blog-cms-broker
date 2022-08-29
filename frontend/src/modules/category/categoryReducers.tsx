import list from 'src/modules/category/list/categoryListReducers';
import form from 'src/modules/category/form/categoryFormReducers';
import view from 'src/modules/category/view/categoryViewReducers';
import destroy from 'src/modules/category/destroy/categoryDestroyReducers';
import importerReducer from 'src/modules/category/importer/categoryImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});

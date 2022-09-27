import home from 'src/modules/broker/home/brokerHomeReducers';
import list from 'src/modules/broker/list/brokerListReducers';
import form from 'src/modules/broker/form/brokerFormReducers';
import view from 'src/modules/broker/view/brokerViewReducers';
import destroy from 'src/modules/broker/destroy/brokerDestroyReducers';
import importerReducer from 'src/modules/broker/importer/brokerImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  home,
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});

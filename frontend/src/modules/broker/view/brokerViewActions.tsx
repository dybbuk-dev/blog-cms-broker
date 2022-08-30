import BrokerService from 'src/modules/broker/brokerService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BROKER_VIEW';

const brokerViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: brokerViewActions.FIND_STARTED,
      });

      const record = await BrokerService.find(id);

      dispatch({
        type: brokerViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerViewActions.FIND_ERROR,
      });

      getHistory().push('/broker');
    }
  },
};

export default brokerViewActions;

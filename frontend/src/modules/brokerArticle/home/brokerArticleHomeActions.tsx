import BrokerArticleService from 'src/modules/brokerArticle/brokerArticleService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BROKER_HOME';

const brokerArticleHomeActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  doInit: (filter) => async (dispatch) => {
    try {
      dispatch({
        type: brokerArticleHomeActions.INIT_STARTED,
      });

      let record = {};

      record = await BrokerArticleService.findByFilter(
        filter,
      );

      dispatch({
        type: brokerArticleHomeActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerArticleHomeActions.INIT_ERROR,
      });
    }
  },
};

export default brokerArticleHomeActions;

import BrokerPostService from 'src/modules/brokerPost/brokerPostService';
import selectors from 'src/modules/brokerPost/home/brokerPostHomeSelectors';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BROKER_POST_HOME';

const brokerPostHomeActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  doChangePagination: (pagination) => async (dispatch) => {
    dispatch({
      type: brokerPostHomeActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(brokerPostHomeActions.doFetch());
  },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: brokerPostHomeActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response =
          await BrokerPostService.findBrokerPostList(
            filter,
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );

        dispatch({
          type: brokerPostHomeActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: brokerPostHomeActions.FETCH_ERROR,
        });
      }
    },
};

export default brokerPostHomeActions;

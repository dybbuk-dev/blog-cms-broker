import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/expertAdvisorTest/form/expertAdvisorTestFormActions';
import selectors from 'src/modules/expertAdvisorTest/form/expertAdvisorTestFormSelectors';
import { getHistory } from 'src/modules/store';
import ExpertAdvisorTestForm from 'src/view/expertAdvisorTest/form/ExpertAdvisorTestForm';
import Spinner from 'src/view/shared/Spinner';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ExpertAdvisorTestFormExpertAdvisorTest(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  const title = isEditing
    ? i18n('entities.expertAdvisorTest.edit.title')
    : i18n('entities.expertAdvisorTest.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <>
      <Card>
        <MDBox py={3} px={3}>
          <MDBox
            pb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {title}
            </MDTypography>
          </MDBox>
          {initLoading && <Spinner />}

          {dispatched && !initLoading && (
            <MDBox p={3}>
              <ExpertAdvisorTestForm
                saveLoading={saveLoading}
                initLoading={initLoading}
                record={record}
                isEditing={isEditing}
                onSubmit={doSubmit}
                onCancel={() =>
                  getHistory().push('/expert-advisor-test')
                }
              />
            </MDBox>
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default ExpertAdvisorTestFormExpertAdvisorTest;

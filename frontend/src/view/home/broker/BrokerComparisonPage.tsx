import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import BrokerAutocompleteFormItem from 'src/view/broker/autocomplete/BrokerAutocompleteFormItem';
import brokerComparisonActions from 'src/modules/broker/comparison/brokerComparisonActions';
import brokerComparisonSelectors from 'src/modules/broker/comparison/brokerComparisonSelectors';
import CompareDetail from 'src/view/home/broker/comparisons/CompareDetail';
import CompareOverview from 'src/view/home/broker/comparisons/CompareOverview';
import CompareProfile from 'src/view/home/broker/comparisons/CompareProfile';
import CompareRegulation from 'src/view/home/broker/comparisons/CompareRegulation';
import CompareSection from 'src/view/home/broker/comparisons/CompareSection';
import CompareService from 'src/view/home/broker/comparisons/CompareService';
import CompareSpreadsAndFees from 'src/view/home/broker/comparisons/CompareSpreadsAndFees';
import CompareTradable from 'src/view/home/broker/comparisons/CompareTradable';
import CompareTradingPlatforms from 'src/view/home/broker/comparisons/CompareTradingPlatforms';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import Spinner from 'src/view/shared/Spinner';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  brokerA: yupFormSchemas.relationToOne(
    i18n('entities.broker.comparison.brokerA'),
    {
      required: true,
    },
  ),
  brokerB: yupFormSchemas.relationToOne(
    i18n('entities.broker.comparison.brokerB'),
    {
      required: true,
    },
  ),
});

function BrokerComparePage(props) {
  const dispatch = useDispatch();

  const { sidenavColor } = selectMuiSettings();

  const loading = useSelector(
    brokerComparisonSelectors.selectLoading,
  );
  const recordA = useSelector(
    brokerComparisonSelectors.selectRecordA,
  );
  const recordB = useSelector(
    brokerComparisonSelectors.selectRecordB,
  );

  const recordToValue = (record) =>
    record && {
      id: record.name_normalized,
      name: record.name,
    };

  const [initialValues] = useState(() => {
    return {
      brokerA: recordToValue(recordA),
      brokerB: recordToValue(recordB),
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    console.log(values);
    dispatch(
      brokerComparisonActions.doFind(
        values.brokerA,
        values.brokerB,
      ),
    );
  };

  return (
    <PageLayout fixedNavBar={false}>
      <Container>
        <PageContent>
          <MDTypography variant="h2">
            {i18n('entities.broker.comparison.title')}
          </MDTypography>
          <MDTypography
            color="text"
            fontWeight="regular"
            variant="body2"
          >
            {i18n('entities.broker.comparison.description')}
          </MDTypography>
          <FormWrapper>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TableContainer sx={{ boxShadow: 'none' }}>
                  <Table>
                    <TableBody
                      sx={{
                        '& tr': {
                          verticalAlign: 'top',
                        },
                      }}
                    >
                      <TableRow>
                        <CompareSection name="selectBrokers" />
                        <CompareDetail
                          childrenA={
                            <BrokerAutocompleteFormItem
                              name="brokerA"
                              label={i18n(
                                'entities.broker.comparison.brokerA',
                              )}
                              variant="standard"
                              value={recordToValue(recordA)}
                              forceValue
                              disabled={loading}
                              useLink
                              required
                              fullWidth
                            />
                          }
                          childrenB={
                            <BrokerAutocompleteFormItem
                              name="brokerB"
                              label={i18n(
                                'entities.broker.comparison.brokerB',
                              )}
                              variant="standard"
                              value={recordToValue(recordB)}
                              forceValue
                              disabled={loading}
                              useLink
                              required
                              fullWidth
                            />
                          }
                          after={
                            <MDButton
                              variant="contained"
                              disabled={loading}
                              type="submit"
                              onClick={form.handleSubmit(
                                onSubmit,
                              )}
                              color={sidenavColor}
                              fullWidth
                            >
                              {i18n(
                                'entities.broker.comparison.compare',
                              )}
                            </MDButton>
                          }
                        />
                      </TableRow>
                      {loading && (
                        <TableRow>
                          <TableCell colSpan={100}>
                            <Spinner />
                          </TableCell>
                        </TableRow>
                      )}
                      {!loading && recordA && recordB && (
                        <>
                          <CompareOverview
                            recordA={recordA}
                            recordB={recordB}
                          />
                          <CompareRegulation
                            recordA={recordA}
                            recordB={recordB}
                          />
                          <CompareProfile
                            recordA={recordA}
                            recordB={recordB}
                          />
                          <CompareTradable
                            recordA={recordA}
                            recordB={recordB}
                          />
                          <CompareSpreadsAndFees
                            recordA={recordA}
                            recordB={recordB}
                          />
                          <CompareTradingPlatforms
                            recordA={recordA}
                            recordB={recordB}
                          />
                          <CompareService
                            recordA={recordA}
                            recordB={recordB}
                          />
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </form>
            </FormProvider>
          </FormWrapper>
        </PageContent>
      </Container>
    </PageLayout>
  );
}

export default BrokerComparePage;

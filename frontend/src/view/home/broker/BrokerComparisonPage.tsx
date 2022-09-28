import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import MaterialLink from '@mui/material/Link';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import BrokerAutocompleteFormItem from 'src/view/broker/autocomplete/BrokerAutocompleteFormItem';
import brokerComparisonActions from 'src/modules/broker/comparison/brokerComparisonActions';
import brokerComparisonSelectors from 'src/modules/broker/comparison/brokerComparisonSelectors';
import CompareDetail from 'src/view/home/broker/comparisons/CompareDetail';
import CompareSection from 'src/view/home/broker/comparisons/CompareSection';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import ImageView from 'src/view/home/ImageView';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import OverallRating from 'src/view/home/broker/shared/OverallRating';
import PageContent from 'src/view/shared/view/PageContent';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import Spinner from 'src/view/shared/Spinner';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import BrokerLinks from 'src/view/home/broker/shared/BrokerLinks';
import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import BrokerUpsides from 'src/view/home/broker/shared/BrokerUpsides';

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
                          <TableRow>
                            <CompareSection name="logo" />
                            <CompareDetail
                              childrenA={
                                <ImageView
                                  value={
                                    recordA.broker_image_broker_detail_logo
                                  }
                                />
                              }
                              childrenB={
                                <ImageView
                                  value={
                                    recordB.broker_image_broker_detail_logo
                                  }
                                />
                              }
                            />
                          </TableRow>
                          <TableRow>
                            <CompareSection name="brokerType" />
                            <CompareDetail
                              childrenA={
                                <AttrTypography>
                                  {i18n(
                                    `entities.broker.enumerators.meta.broker_type.${recordA.meta?.broker_type}`,
                                  )}
                                </AttrTypography>
                              }
                              childrenB={
                                <AttrTypography>
                                  {i18n(
                                    `entities.broker.enumerators.meta.broker_type.${recordB.meta?.broker_type}`,
                                  )}
                                </AttrTypography>
                              }
                            />
                          </TableRow>
                          <TableRow>
                            <CompareSection name="overallRating" />
                            <CompareDetail
                              childrenA={
                                <OverallRating
                                  record={recordA}
                                />
                              }
                              childrenB={
                                <OverallRating
                                  record={recordB}
                                />
                              }
                            />
                          </TableRow>
                          <TableRow>
                            <CompareSection name="customerReviews" />
                            <CompareDetail
                              childrenA={
                                <AttrTypography>
                                  <MaterialLink
                                    href={`/erfahrungsberichte/${recordA.name_normalized}`}
                                    target="_blank"
                                    underline="hover"
                                  >
                                    {recordA.name}
                                  </MaterialLink>
                                </AttrTypography>
                              }
                              childrenB={
                                <AttrTypography>
                                  <MaterialLink
                                    href={`/erfahrungsberichte/${recordB.name_normalized}`}
                                    target="_blank"
                                    underline="hover"
                                  >
                                    {recordB.name}
                                  </MaterialLink>
                                </AttrTypography>
                              }
                            />
                          </TableRow>
                          <TableRow>
                            <CompareSection name="links" />
                            <CompareDetail
                              childrenA={
                                <BrokerLinks
                                  record={recordA}
                                />
                              }
                              childrenB={
                                <BrokerLinks
                                  record={recordB}
                                />
                              }
                            />
                          </TableRow>
                          <TableRow>
                            <CompareSection name="brokerFeature" />
                            <CompareDetail
                              childrenA={
                                <BrokerAttrs
                                  records={recordA.features}
                                  attrs={{
                                    link: 'url',
                                    title: 'feature',
                                  }}
                                />
                              }
                              childrenB={
                                <BrokerAttrs
                                  records={recordB.features}
                                  attrs={{
                                    link: 'url',
                                    title: 'feature',
                                  }}
                                />
                              }
                            />
                          </TableRow>
                          <TableRow>
                            <CompareSection name="customerReviews" />
                            <CompareDetail
                              childrenA={
                                <BrokerUpsides
                                  record={recordA}
                                />
                              }
                              childrenB={
                                <BrokerUpsides
                                  record={recordB}
                                />
                              }
                            />
                          </TableRow>
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

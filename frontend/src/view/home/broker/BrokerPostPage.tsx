import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { FormButtons } from 'src/view/shared/styles/FormWrapper';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/brokerPost/home/brokerPostHomeActions';
import brokerPostFormActions from 'src/modules/brokerPost/form/brokerPostFormActions';
import brokerPostFormSelectors from 'src/modules/brokerPost/form/brokerPostFormSelectors';
import brokerPostSelectors from 'src/modules/brokerPost/brokerPostSelectors';
import BugReportIcon from '@mui/icons-material/BugReport';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import HtmlView from 'src/view/shared/view/HtmlView';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SaveIcon from '@mui/icons-material/Save';
import selectors from 'src/modules/brokerPost/home/brokerPostHomeSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import OverallRating from 'src/view/home/broker/shared/OverallRating';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';
import RatingFormItem from 'src/view/shared/form/items/RatingFormItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(i18n('common.name'), {
    required: true,
    min: 1,
    max: 255,
  }),
  email: yupFormSchemas.string(i18n('common.email'), {
    required: true,
    min: 1,
    max: 255,
  }),
  review: yupFormSchemas.string(i18n('common.review'), {
    required: true,
  }),
  rating: yupFormSchemas.integer(i18n('common.rating'), {}),
});
const BrokerPostPage = ({ record }) => {
  const { sidenavColor } = selectMuiSettings();
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });
  const dispatch = useDispatch();
  const saveLoading = useSelector(
    brokerPostFormSelectors.selectSaveLoading,
  );
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasPermissionToEdit = useSelector(
    brokerPostSelectors.selectPermissionToEdit,
  );

  const onSubmit = (values) => {
    values.broker_id = record.id;
    dispatch(brokerPostFormActions.doCreate(values));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  useEffect(() => {
    dispatch(
      actions.doFetch(
        {
          spam: false,
          review_required: false,
          deleted: false,
          broker_id: record.id,
        },
        null,
        false,
      ),
    );
  }, [record.id]);

  return (
    <>
      <MDTypography variant="h2" py={3}>
        {i18n(
          'entities.broker.text.activeTraderExperience',
        )}
      </MDTypography>
      <MDBox
        display="flex"
        flexDirection="column"
        color="text"
        gap={2}
      >
        {!loading
          ? rows.map((post) => (
              <MDBox
                key={post.id}
                display="flex"
                flexDirection="column"
                color="text"
                gap={1}
              >
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDBox
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <MDTypography color="text" variant="h6">
                      {post.name +
                        ' (' +
                        moment(post.modified).format(
                          DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                        ) +
                        ')'}
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <RatingViewItem
                      value={post.rating}
                      precision={0.1}
                      size="large"
                    />
                    {hasPermissionToEdit && (
                      <>
                        <Tooltip
                          title={i18n('common.edit')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            component={Link}
                            to={`/admin/broker-post/${post.id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={i18n('common.spam')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            component={Link}
                            to={`/admin/broker-post`}
                          >
                            <BugReportIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={i18n('common.review')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            component={Link}
                            to={`/admin/broker-post`}
                          >
                            <ReviewsIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={i18n('common.destroy')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            component={Link}
                            to={`/admin/broker-post`}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </MDBox>
                </MDBox>
                <HtmlView value={post.review} />
              </MDBox>
            ))
          : i18n('common.noCommit')}
      </MDBox>
      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
      />
      <MDBox color="text" py={4}>
        <MDTypography variant="h4">
          {i18n('common.writeReview')}
        </MDTypography>
      </MDBox>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="name"
                variant="standard"
                label={i18n('common.name')}
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="email"
                variant="standard"
                label={i18n('common.email')}
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <RatingFormItem
                color={sidenavColor}
                name="rating"
                label={i18n('common.rating')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="review"
                required={true}
                label={i18n('common.review')}
              />
            </Grid>
          </Grid>
          <FormButtons>
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>
          </FormButtons>
        </form>
      </FormProvider>
    </>
  );
};

export default BrokerPostPage;

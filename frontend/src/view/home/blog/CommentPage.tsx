import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { FormButtons } from 'src/view/shared/styles/FormWrapper';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouteMatch } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/blogComment/home/blogCommentHomeActions';
import blogCommentFormActions from 'src/modules/blogComment/form/blogCommentFormActions';
import blogCommentFormSelectors from 'src/modules/blogComment/form/blogCommentFormSelectors';
import blogFindSelectors from 'src/modules/blog/find/blogFindSelectors';
import BugReportIcon from '@mui/icons-material/BugReport';
import commentDestroyActions from 'src/modules/blogComment/destroy/blogCommentDestroyActions';
import commentReviewActions from 'src/modules/blogComment/review/blogCommentReviewActions';
import commentSpamActions from 'src/modules/blogComment/spam/blogCommentSpamActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
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
import selectors from 'src/modules/blogComment/home/blogCommentHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

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
  content: yupFormSchemas.string(i18n('common.content'), {
    required: true,
  }),
});
const CommentPage = ({ record }) => {
  const { sidenavColor } = selectMuiSettings();
  const [dispatched, setDispatched] = useState(false);
  const [blogRecordIdToDestroy, setBlogRecordIdToDestroy] =
    useState(null);
  const [blogRecordIdToSpam, setBlogRecordIdToSpam] =
    useState(null);
  const [blogRecordIdToReview, setBlogRecordIdToReview] =
    useState(null);
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const match = useRouteMatch();

  const dispatch = useDispatch();
  const saveLoading = useSelector(
    blogCommentFormSelectors.selectSaveLoading,
  );
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const hasRows = useSelector(selectors.selectHasRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasPermissionToEdit = useSelector(
    blogFindSelectors.selectPermissionToEdit,
  );

  const onSubmit = (values) => {
    values.blog_entry_id = record.id;
    dispatch(blogCommentFormActions.doCreate(values));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doOpenDestroyConfirmModal = (id) => {
    setBlogRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setBlogRecordIdToDestroy(null);
  };

  const doOpenSpamConfirmModal = (id) => {
    setBlogRecordIdToSpam(id);
  };

  const doCloseSpamConfirmModal = () => {
    setBlogRecordIdToSpam(null);
  };

  const doOpenReviewConfirmModal = (id) => {
    setBlogRecordIdToReview(id);
  };

  const doCloseReviewConfirmModal = () => {
    setBlogRecordIdToReview(null);
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(
      commentDestroyActions.doDestroy(id, match.url),
    );
    setDispatched(!dispatched);
  };

  const doSpam = (id) => {
    doCloseSpamConfirmModal();
    dispatch(commentSpamActions.doSpam(id, match.url));
    setDispatched(!dispatched);
  };

  const doReview = (id) => {
    doCloseReviewConfirmModal();
    dispatch(commentReviewActions.doReview(id, match.url));
    setDispatched(!dispatched);
  };
  useEffect(() => {
    dispatch(
      actions.doFetch(
        {
          spam: false,
          review_required: false,
          deleted: false,
          blog_entry_id: record.id,
        },
        null,
        false,
      ),
    );
  }, [dispatched]);

  return (
    <>
      <MDBox color="text" py={4}>
        <MDTypography variant="h4">
          {i18n('common.comment') + '(' + rows.length + ')'}
        </MDTypography>
      </MDBox>
      <MDBox
        display="flex"
        flexDirection="column"
        color="text"
        gap={2}
      >
        {loading && <Spinner />}
        {!loading &&
          hasRows &&
          rows.map((comment) => (
            <MDBox
              key={comment.id}
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
                  <MDTypography variant="h5">
                    {`${comment.name} (${moment(
                      comment.modified,
                    ).format(
                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                    )})`}
                  </MDTypography>
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="flex-end"
                >
                  {hasPermissionToEdit && (
                    <>
                      <Tooltip title={i18n('common.edit')}>
                        <IconButton
                          size="small"
                          color={sidenavColor}
                          component={Link}
                          to={`/admin/blog-comment/${comment.id}/edit`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={i18n('common.spam')}>
                        <IconButton
                          size="small"
                          color={sidenavColor}
                          onClick={() =>
                            doOpenSpamConfirmModal(
                              comment.id,
                            )
                          }
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
                          onClick={() =>
                            doOpenReviewConfirmModal(
                              comment.id,
                            )
                          }
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
                          onClick={() =>
                            doOpenDestroyConfirmModal(
                              comment.id,
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </MDBox>
              </MDBox>
              <MDBox
                color="text"
                fontSize="1rem"
                fontWeight="regular"
                pt={1}
                pl={5}
              >
                <HtmlView value={comment.content} />
              </MDBox>
            </MDBox>
          ))}
        {!loading && !hasRows && (
          <MDTypography variant="body2">
            {i18n('common.noCommit')}
          </MDTypography>
        )}
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
          {i18n('common.toComment')}
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
              <HtmlEditorFormItem
                name="content"
                required={true}
                label={i18n('common.content')}
                toolbars={[
                  {
                    name: 'basicstyles',
                    groups: ['basicstyles'],
                  },
                  {
                    name: 'paragraph',
                    groups: ['list'],
                  },
                  { name: 'colors' },
                ]}
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
              {i18n('common.toComment')}
            </MDButton>
          </FormButtons>
        </form>
      </FormProvider>
      {blogRecordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(blogRecordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {blogRecordIdToSpam && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doSpam(blogRecordIdToSpam)}
          onClose={() => doCloseSpamConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {blogRecordIdToReview && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doReview(blogRecordIdToReview)}
          onClose={() => doCloseReviewConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
};

export default CommentPage;

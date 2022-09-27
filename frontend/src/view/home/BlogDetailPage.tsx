import {
  Card,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { FormButtons } from 'src/view/shared/styles/FormWrapper';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouteMatch } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import blogCommentFormActions from 'src/modules/blogComment/form/blogCommentFormActions';
import blogCommentFormSelectors from 'src/modules/blogComment/form/blogCommentFormSelectors';
import blogFindActions from 'src/modules/blog/find/blogFindActions';
import blogFindSelectors from 'src/modules/blog/find/blogFindSelectors';
import BugReportIcon from '@mui/icons-material/BugReport';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import HtmlView from 'src/view/shared/view/HtmlView';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SaveIcon from '@mui/icons-material/Save';
import Spinner from 'src/view/shared/Spinner';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import moment from 'moment';

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

const BlogDetailPage = () => {
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(
    blogFindSelectors.selectLoading,
  );

  const saveLoading = useSelector(
    blogCommentFormSelectors.selectSaveLoading,
  );
  const record = useSelector(
    blogFindSelectors.selectRecord,
  );

  const hasPermissionToEdit = useSelector(
    blogFindSelectors.selectPermissionToEdit,
  );

  useEffect(() => {
    dispatch(blogFindActions.doFind(match.url));
    setDispatched(true);
  }, [match.url]);

  const onSubmit = (values) => {
    values.blog_entry_id = record.id;
    dispatch(blogCommentFormActions.doCreate(values));
  };

  return (
    <PageLayout fixedNavBar={false}>
      <Container>
        <Card>
          <MDBox p={5} color="text">
            {loading && <Spinner />}
            {dispatched && !loading && record && (
              <>
                <HtmlView value={record.content} />
                <MDBox color="text" py={4}>
                  <MDTypography variant="h4">
                    {i18n('common.comment') +
                      '(' +
                      record.blog_comment.length +
                      ')'}
                  </MDTypography>
                </MDBox>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  color="text"
                  gap={2}
                >
                  {record.blog_comment.length !== 0
                    ? record.blog_comment.map((comment) => (
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
                              <MDTypography
                                color="text"
                                variant="h4"
                              >
                                {comment.name}
                              </MDTypography>
                              <span color="text">
                                {' (' +
                                  moment(
                                    comment.modified,
                                  ).format(
                                    DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                                  ) +
                                  ')'}
                              </span>
                            </MDBox>
                            <MDBox
                              display="flex"
                              justifyContent="flex-end"
                            >
                              {hasPermissionToEdit && (
                                <>
                                  <Tooltip
                                    title={i18n(
                                      'common.edit',
                                    )}
                                  >
                                    <IconButton
                                      size="small"
                                      component={Link}
                                      to={`/admin/blog-comment/${comment.id}/edit`}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip
                                    title={i18n(
                                      'common.spam',
                                    )}
                                  >
                                    <IconButton
                                      size="small"
                                      component={Link}
                                      to={`/admin/blog-comment`}
                                    >
                                      <BugReportIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip
                                    title={i18n(
                                      'common.review',
                                    )}
                                  >
                                    <IconButton
                                      size="small"
                                      component={Link}
                                      to={`/admin/blog-comment`}
                                    >
                                      <ReviewsIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip
                                    title={i18n(
                                      'common.destroy',
                                    )}
                                  >
                                    <IconButton
                                      size="small"
                                      component={Link}
                                      to={`/admin/blog-comment`}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                            </MDBox>
                          </MDBox>
                          <HtmlView
                            value={comment.content}
                          />
                        </MDBox>
                      ))
                    : i18n('common.noCommit')}
                </MDBox>
                <MDBox color="text" py={4}>
                  <MDTypography variant="h4">
                    {i18n('common.toComment')}
                  </MDTypography>
                </MDBox>
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <Grid spacing={2} container>
                      <Grid item md={12} xs={12}>
                        <InputFormItem
                          name="name"
                          variant="standard"
                          label={i18n('common.name')}
                          required={true}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
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
                        />
                      </Grid>
                    </Grid>
                    <FormButtons>
                      <MDButton
                        variant="gradient"
                        color="info"
                        disabled={saveLoading}
                        type="button"
                        onClick={form.handleSubmit(
                          onSubmit,
                        )}
                        startIcon={<SaveIcon />}
                        size="small"
                      >
                        {i18n('common.toComment')}
                      </MDButton>
                    </FormButtons>
                  </form>
                </FormProvider>
              </>
            )}
          </MDBox>
        </Card>
      </Container>
    </PageLayout>
  );
};

export default BlogDetailPage;

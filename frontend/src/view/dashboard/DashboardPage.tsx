import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import blogCommentActions from 'src/modules/blogComment/list/blogCommentListActions';
import blogCommentSelectors from 'src/modules/blogComment/list/blogCommentListSelectors';
import blogSelectors from 'src/modules/blog/blogSelectors';
import brokerPostActions from 'src/modules/brokerPost/list/brokerPostListActions';
import brokerPostSelectors from 'src/modules/brokerPost/list/brokerPostListSelectors';
import BugReportIcon from '@mui/icons-material/BugReport';
import commentDestroyActions from 'src/modules/blogComment/destroy/blogCommentDestroyActions';
import commentReviewActions from 'src/modules/blogComment/review/blogCommentReviewActions';
import commentSpamActions from 'src/modules/blogComment/spam/blogCommentSpamActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HtmlView from 'src/view/shared/view/HtmlView';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PageContent from 'src/view/shared/view/PageContent';
import postDestroyActions from 'src/modules/brokerPost/destroy/brokerPostDestroyActions';
import postReviewActions from 'src/modules/brokerPost/review/brokerPostReviewActions';
import postSpamActions from 'src/modules/brokerPost/spam/brokerPostSpamActions';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Spinner from 'src/view/shared/Spinner';

function DashboardPage() {
  const { sidenavColor } = selectMuiSettings();
  const [blogRecordIdToDestroy, setBlogRecordIdToDestroy] =
    useState(null);
  const [blogRecordIdToSpam, setBlogRecordIdToSpam] =
    useState(null);
  const [blogRecordIdToReview, setBlogRecordIdToReview] =
    useState(null);

  const [postRecordIdToDestroy, setPostRecordIdToDestroy] =
    useState(null);
  const [postRecordIdToSpam, setPostRecordIdToSpam] =
    useState(null);
  const [postRecordIdToReview, setPostRecordIdToReview] =
    useState(null);

  const [blog_dispatched, setBlogDispatched] =
    useState(false);
  const [broker_dispatched, setBrokerDispatched] =
    useState(false);
  const dispatch = useDispatch();
  const blogCommentLoading = useSelector(
    blogCommentSelectors.selectLoading,
  );
  const blogCommentHasRows = useSelector(
    blogCommentSelectors.selectHasRows,
  );
  const blogComments = useSelector(
    blogCommentSelectors.selectRows,
  );

  const brokerPostLoading = useSelector(
    brokerPostSelectors.selectLoading,
  );
  const brokerPostHasRows = useSelector(
    brokerPostSelectors.selectHasRows,
  );
  const brokerPosts = useSelector(
    brokerPostSelectors.selectRows,
  );

  const hasPermissionToEdit = useSelector(
    blogSelectors.selectPermissionToEdit,
  );

  const doOpenDestroyConfirmModal = (id, field) => {
    if (field == 'comment') {
      setBlogRecordIdToDestroy(id);
    }
    if (field == 'post') {
      setPostRecordIdToDestroy(id);
    }
  };

  const doCloseDestroyConfirmModal = (field) => {
    if (field == 'comment') {
      setBlogRecordIdToDestroy(null);
    }
    if (field == 'post') {
      setPostRecordIdToDestroy(null);
    }
  };

  const doOpenSpamConfirmModal = (id, field) => {
    if (field == 'comment') {
      setBlogRecordIdToSpam(id);
    }
    if (field == 'post') {
      setPostRecordIdToSpam(id);
    }
  };

  const doCloseSpamConfirmModal = (field) => {
    if (field == 'comment') {
      setBlogRecordIdToSpam(null);
    }
    if (field == 'post') {
      setPostRecordIdToSpam(null);
    }
  };

  const doOpenReviewConfirmModal = (id, field) => {
    if (field == 'comment') {
      setBlogRecordIdToReview(id);
    }
    if (field == 'post') {
      setPostRecordIdToReview(id);
    }
  };

  const doCloseReviewConfirmModal = (field) => {
    if (field == 'comment') {
      setBlogRecordIdToReview(null);
    }
    if (field == 'post') {
      setPostRecordIdToReview(null);
    }
  };

  const doDestroy = (id, field) => {
    if (field == 'comment') {
      doCloseDestroyConfirmModal(field);
      dispatch(
        commentDestroyActions.doDestroy(
          id,
          '/admin/dashboard',
        ),
      );
    }
    if (field == 'post') {
      doCloseDestroyConfirmModal(field);
      dispatch(
        postDestroyActions.doDestroy(
          id,
          '/admin/dashboard',
        ),
      );
    }
  };

  const doSpam = (id, field) => {
    if (field == 'comment') {
      doCloseSpamConfirmModal(field);
      dispatch(
        commentSpamActions.doSpam(id, '/admin/dashboard'),
      );
    }
    if (field == 'post') {
      doCloseSpamConfirmModal(field);
      dispatch(
        postSpamActions.doSpam(id, '/admin/dashboard'),
      );
    }
  };

  const doReview = (id, field) => {
    if (field == 'comment') {
      doCloseReviewConfirmModal(field);
      dispatch(
        commentReviewActions.doReview(
          id,
          '/admin/dashboard',
        ),
      );
    }
    if (field == 'post') {
      doCloseReviewConfirmModal(field);
      dispatch(
        postReviewActions.doReview(id, '/admin/dashboard'),
      );
    }
  };
  useEffect(() => {
    dispatch(
      blogCommentActions.doFetch({
        limit: 5,
        deleted: false,
      }),
    );
    setBlogDispatched(true);
  }, [blog_dispatched]);
  useEffect(() => {
    dispatch(
      brokerPostActions.doFetch({
        limit: 5,
        deleted: false,
      }),
    );
    setBrokerDispatched(true);
  }, [broker_dispatched]);
  return (
    <>
      <Grid spacing={2} container>
        <Grid md={6} xs={12} item>
          <PageContent p={3}>
            <MDTypography variant="h3" mb={3}>
              {'Blog Comments'}
            </MDTypography>
            {blogCommentLoading && <Spinner />}
            {!blogCommentLoading &&
              blogCommentHasRows &&
              blogComments.map((comment) => (
                <MDBox key={comment.id}>
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
                          <Tooltip
                            title={i18n('common.edit')}
                          >
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              component={Link}
                              to={`/admin/blog-comment/${comment.id}/edit`}
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
                              onClick={() =>
                                doOpenSpamConfirmModal(
                                  comment.id,
                                  'comment',
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
                                  'comment',
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
                                  'comment',
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
                    mt={1}
                    ml={5}
                    mb={3}
                  >
                    <HtmlView value={comment.content} />
                  </MDBox>
                </MDBox>
              ))}
            {!blogCommentLoading && !blogCommentHasRows && (
              <MDTypography variant="body2">
                {i18n('common.noRecord')}
              </MDTypography>
            )}
          </PageContent>
        </Grid>
        <Grid md={6} xs={12} item>
          <PageContent p={3}>
            <MDTypography variant="h3" mb={3}>
              {'Broker Posts'}
            </MDTypography>
            {brokerPostLoading && <Spinner />}
            {!brokerPostLoading &&
              brokerPostHasRows &&
              brokerPosts.map((post) => (
                <MDBox key={post.id}>
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <MDTypography variant="h5">
                      {`${post.name} (${moment(
                        post.modified,
                      ).format(
                        DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                      )})`}
                    </MDTypography>
                    <MDBox display="flex" gap={1}>
                      <RatingViewItem
                        value={post.rating}
                        precision={0.1}
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
                              onClick={() =>
                                doOpenSpamConfirmModal(
                                  post.id,
                                  'post',
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
                                  post.id,
                                  'post',
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
                                  post.id,
                                  'post',
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
                    mt={1}
                    ml={5}
                    mb={3}
                  >
                    <HtmlView value={post.review} />
                  </MDBox>
                </MDBox>
              ))}
            {!brokerPostLoading && !brokerPostHasRows && (
              <MDTypography variant="body2">
                {i18n('common.noRecord')}
              </MDTypography>
            )}
          </PageContent>
        </Grid>
      </Grid>
      {blogRecordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doDestroy(blogRecordIdToDestroy, 'comment')
          }
          onClose={() =>
            doCloseDestroyConfirmModal('comment')
          }
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {blogRecordIdToSpam && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doSpam(blogRecordIdToSpam, 'comment')
          }
          onClose={() => doCloseSpamConfirmModal('comment')}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {blogRecordIdToReview && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doReview(blogRecordIdToReview, 'comment')
          }
          onClose={() =>
            doCloseReviewConfirmModal('comment')
          }
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {postRecordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doDestroy(postRecordIdToDestroy, 'post')
          }
          onClose={() => doCloseDestroyConfirmModal('post')}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {postRecordIdToSpam && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doSpam(postRecordIdToSpam, 'post')
          }
          onClose={() => doCloseSpamConfirmModal('post')}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {postRecordIdToReview && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doReview(postRecordIdToReview, 'post')
          }
          onClose={() => doCloseReviewConfirmModal('post')}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default DashboardPage;

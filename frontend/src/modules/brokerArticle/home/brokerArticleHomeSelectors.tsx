import { createSelector } from 'reselect';

const selectRaw = (state) => state.brokerArticle.home;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const brokerArticleHomeSelectors = {
  selectInitLoading,
  selectRecord,
  selectRaw,
};

export default brokerArticleHomeSelectors;

import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import CategoryViewItem from 'src/view/category/view/CategoryViewItem';

function CategoryView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.category.fields.id')}
            value={record.id}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.category.fields.name')}
            value={record.name}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.category.fields.link')}
            value={record.link}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.category.fields.title')}
            value={record.title}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.category.fields.author_name',
            )}
            value={record.author_name}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.category.fields.author_link',
            )}
            value={record.author_link}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.category.fields.target')}
            value={record.target}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.category.fields.sort')}
            value={record.sort}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CheckboxViewItem
            label={i18n(
              'entities.category.fields.activated',
            )}
            checked={record.activated}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CheckboxViewItem
            label={i18n(
              'entities.category.fields.show_in_navigation',
            )}
            checked={record.show_in_navigation}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CheckboxViewItem
            label={i18n(
              'entities.category.fields.show_in_footer',
            )}
            checked={record.show_in_footer}
          />
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default CategoryView;

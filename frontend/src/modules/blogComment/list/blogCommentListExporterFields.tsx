import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.blogComment.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'name',
    label: i18n('entities.blogComment.fields.name'),
  },
  {
    name: 'image',
    label: i18n('entities.blogComment.fields.image'),
  },
  {
    name: 'link',
    label: i18n('entities.blogComment.fields.link'),
  },
  {
    name: 'description',
    label: i18n('entities.blogComment.fields.description'),
  },
];

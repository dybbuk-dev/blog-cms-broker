import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.navigation.fields.id'),
  },
  {
    name: 'reference',
    label: i18n('entities.navigation.fields.reference'),
  },
  {
    name: 'title',
    label: i18n('entities.navigation.fields.title'),
  },
  {
    name: 'description',
    label: i18n('entities.navigation.fields.description'),
  },
  {
    name: 'category',
    label: i18n('entities.navigation.fields.category'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'website',
    label: i18n('entities.navigation.fields.website'),
  },
  {
    name: 'logo',
    label: i18n('entities.navigation.fields.logo'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'rating',
    label: i18n('entities.navigation.fields.rating'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'popularity',
    label: i18n('entities.navigation.fields.popularity'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.navigation.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.navigation.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

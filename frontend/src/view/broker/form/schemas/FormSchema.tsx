import { i18n } from 'src/i18n';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  // #region Base
  navigation: yupFormSchemas.relationToOne(
    i18n('entities.broker.fields.navigation'),
    {},
  ),
  author: yupFormSchemas.relationToOne(
    i18n('entities.broker.fields.author'),
    {},
  ),
  name: yupFormSchemas.string(
    i18n('entities.broker.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  name_normalized: yupFormSchemas.string(
    i18n('entities.broker.fields.name_normalized'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.broker.fields.activated'),
    {},
  ),
  is_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.is_broker'),
    {},
  ),
  is_compareable: yupFormSchemas.boolean(
    i18n('entities.broker.fields.is_compareable'),
    {},
  ),
  top_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_broker'),
    {},
  ),
  top_binary_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_binary_broker'),
    {},
  ),
  top_forex_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_forex_broker'),
    {},
  ),
  featured_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.featured_broker'),
    {},
  ),
  pdf: yupFormSchemas.boolean(
    i18n('entities.broker.fields.pdf'),
    {},
  ),
  // #endregion
});

export default schema;

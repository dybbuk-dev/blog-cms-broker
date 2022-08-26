import { i18n } from 'src/i18n';
import navigationEnumerators from 'src/modules/navigation/navigationEnumerators';

export const navigationTypeOptions =
  navigationEnumerators.type.map((label, value) => ({
    value: value.toString(),
    label: i18n(
      `entities.navigation.enumerators.type.${value}`,
    ),
  }));

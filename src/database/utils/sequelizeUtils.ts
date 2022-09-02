export default class SequelizeUtils {
  static value(obj, fieldName, defaultValue = null) {
    if (!obj || !obj.dataValues) {
      return defaultValue;
    }
    return obj.dataValues[fieldName] || defaultValue;
  }
}

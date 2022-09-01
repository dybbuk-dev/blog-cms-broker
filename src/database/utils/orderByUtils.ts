export function orderByUtils(orderBy) {
  return [
    orderBy.substring(0, orderBy.lastIndexOf('_')),
    orderBy.substring(orderBy.lastIndexOf('_') + 1),
  ];
}

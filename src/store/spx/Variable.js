import { types } from 'mobx-state-tree';

export default types.model('Variable', {
  id: types.identifier,
  name: types.string,
  type: types.string,
  value: types.maybe(types.string),
});

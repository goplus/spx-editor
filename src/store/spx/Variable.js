import { types } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';

export default types.model('Variable', {
  id:  types.optional(types.identifier, uuidv4),
  name: types.string,
  type: types.string,
  value: types.maybe(types.string),
});

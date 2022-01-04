import { types } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';

export default types.model('Variable', {
  id:  types.optional(types.identifier, uuidv4),
  name: types.string,
  type: types.string,
  value: types.union(types.string, types.integer, types.number, types.undefined),
})
.views(self => ({
  get isDefault() {
    if (self.value === undefined) {
      return true;
    }

    switch (self.type) {
      case 'int':
        return self.value === 0;
      case 'float':
        return self.value === 0.0;
      case 'string':
        return self.value === '';
      default:
        return false;
    }
  },
}));

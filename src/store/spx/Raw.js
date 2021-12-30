import {types} from 'mobx-state-tree';

const Raw = types.custom({
  name: 'Raw',
  fromSnapshot(snapshot) {
    return snapshot;
  },
  toSnapshot(imageData) {
    return imageData;
  },
  isTargetType(value) {
    return true;
  },
});

export default Raw;

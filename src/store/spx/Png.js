import {types} from 'mobx-state-tree';
import {encode, decode} from 'fast-png'

export default types.custom({
  name: 'Png',
  fromSnapshot(snapshot) {
    return decode(snapshot);
  },
  toSnapshot(imageData) {
    return encode(imageData);
  },
  isTargetType(value) {
    console.log("isTargetType", value);
    return true;
  },
});

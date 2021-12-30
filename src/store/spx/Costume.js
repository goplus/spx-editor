import { types } from 'mobx-state-tree';
import Png from './Png';

export default types.model('Costume', {
  id: types.identifier,
  name: types.string,
  dataFormat: types.enumeration('ImageFormat', ['svg', 'png']),
  image: types.union(types.string, Png),
  bitmapResolution: types.number,
  rotationCenterX: types.number,
  rotationCenterY: types.number,
})
.actions(self => ({
  setName(name) {
    self.name = name;
  },
  setImage(dataFormat, image) {
    self.dataFormat = dataFormat;
    self.image = image;
  },
}));

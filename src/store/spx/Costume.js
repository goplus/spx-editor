import { types } from 'mobx-state-tree';
import {v4 as uuidv4} from 'uuid';

export default types.model('Costume', {
  id: types.optional(types.identifier, uuidv4),
  name: types.string,
  dataFormat: types.optional(types.enumeration('ImageFormat', ['svg', 'png']), 'svg'),
  image: types.optional(types.string, ''),
  bitmapResolution: types.optional(types.number, 1),
  rotationCenterX: types.optional(types.number, 0),
  rotationCenterY: types.optional(types.number, 0),
})
.views(self => ({
  get isShowable() {
    return self.image.length > 0;
  }
}))
.actions(self => ({
  setName(name) {
    self.name = name;
  },
  setImage(isVector, image, x, y) {
    const isOldVector = self.dataFormat === 'svg';

    if (isOldVector !== isVector) {
      if (isVector) {
        self.switchToVector();
      } else {
        self.switchToBitmap();
      }
    }

    const dataFormat = isVector ? 'svg' : 'png';

    self.dataFormat = dataFormat;
    self.image = image;
    if (isVector) {
      self.rotationCenterX = x;
      self.rotationCenterY = y;
    }
  },
  switchToBitmap() {
    self.rotationCenterX *= 2;
    self.rotationCenterY *= 2;
    self.bitmapResolution *= 2;
  },
  switchToVector() {
    self.rotationCenterX /= 2;
    self.rotationCenterY /= 2;
    self.bitmapResolution /= 2;
  },
}));

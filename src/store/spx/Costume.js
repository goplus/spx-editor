import { types } from 'mobx-state-tree';

export default types.model('Costume', {
  id: types.identifier,
  name: types.string,
  dataFormat: types.enumeration('ImageFormat', ['svg', 'png']),
  image: types.string,
  bitmapResolution: types.number,
  rotationCenterX: types.number,
  rotationCenterY: types.number,
})
.actions(self => ({
  setName(name) {
    self.name = name;
  },
  setImage(dataFormat, image) {
    const isOldVector = self.dataFormat === 'svg';
    const isNewVector = dataFormat === 'svg';

    if (isOldVector !== isNewVector) {
      if (isNewVector) {
        self.switchToVector();
      } else {
        self.switchToBitmap();
      }
    }

    self.dataFormat = dataFormat;
    self.image = image;
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

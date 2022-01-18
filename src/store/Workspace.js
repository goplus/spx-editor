import {types, clone} from 'mobx-state-tree';
import {parse as svgParse} from 'svg-parser';
import {Project, Sound} from './spx';
import defaultProject from '../lib/default-project'
import {imageDataToDataUrl} from '../lib/image';

const Workspace = types.model('Workspace', {
  project: types.maybe(Project),
  currentSpriteIndex: types.optional(types.integer, 0),
  currentSound: types.maybe(types.reference(Sound)),
  // Refresh some stateful components when create new project
  refreshCounter: types.optional(types.integer, 0),
  handleVisible: types.optional(types.boolean, false),
})
.views(self => ({
  isCurrentSprite(sprite) {
    return self.currentSprite === sprite;
  },
  isCurrentCostume(costume) {
    return self.currentCostume === costume;
  },
  isCurrentSound(sound) {
    return self.currentSound === sound;
  },
  isHandleNeedShow(sprite) {
    return self.handleVisible && self.isCurrentSprite(sprite);
  },
  get currentSprite() {
    return self.project.sprites[self.currentSpriteIndex]
  },
  get currentCostume() {
    return self.currentSprite && self.currentSprite.currentCostume;
  },
}))
.actions( self => ({
  setHandleVisible(visible) {
    self.handleVisible = visible;
  },
  setCurrentSpriteIndex(index) {
    if (typeof(index) !== 'number') {
      throw new Error("index is not a number");
    }
    self.currentSpriteIndex = index;
    self.handleVisible = false;
  },
  deleteCurrentSprite() {
    self.project.deleteSprite(self.currentSpriteIndex)
    self.currentSpriteIndex = 0
  },
  setCurrentCostumeIndex(index) {
    self.currentSprite.setCurrentCostumeIndex(index);
  },
  deleteCurrentCostome() {
    self.currentSprite.delCostome(self.currentCostume.id);
  },
  setCurrentSound(sound) {
    if (!self.project.sounds.find(s => s.id === sound.id)) {
      throw new Error("Sound not found in current project");
    }
    self.currentSound = sound;
  },
  newProject() {
    self.project = clone(defaultProject);
    self.setCurrentSpriteIndex(1);
    self.setCurrentCostumeIndex(0);
    self.refreshCounter += 1;
  },
  newSprite() {
    self.project.newSprite();
    self.setCurrentSpriteIndex(self.project.sprites.length-1);
  },
  newCostume() {
    self.currentSprite.newCostume();
    self.setCurrentCostumeIndex(self.currentSprite.costumes.length-1);
  },
  updateCostumeImage(isVector, image) {
    if (isVector) {
      const svgRoot = svgParse(image);
      const elem = svgRoot.children[0];
      const {transform} = elem.children[0].properties;
      const [transX, transY] = transform.replace("translate(", "").replace(")", "").split(",").map(x => parseFloat(x));
      const [x, y] = [self.project.stageWidth / 2 + transX, self.project.stageHeight / 2 + transY];
      self.currentCostume.setImage(isVector, image, x, y);
    } else {
      image = imageDataToDataUrl(image);
      self.currentCostume.setImage(isVector, image);
    }
  },
}));

export function createWorkspace() {
  const workspace = Workspace.create({});
  workspace.newProject();
  return workspace;
}

export default Workspace;

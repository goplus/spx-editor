import {types, clone} from 'mobx-state-tree';
import {parse as svgParse} from 'svg-parser';
import {Project, Sprite, Costume, Sound} from './spx';
import defaultProject from '../lib/default-project'
import {imageDataToDataUrl} from '../lib/image';

const Workspace = types.model('Workspace', {
  project: types.maybe(Project),
  currentSprite: types.maybe(types.reference(Sprite)),
  currentCostume: types.maybe(types.reference(Costume)),
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
  }
}))
.actions( self => ({
  setHandleVisible(visible) {
    self.handleVisible = visible;
  },
  setCurrentSprite(sprite) {
    self.currentSprite = sprite;
    self.currentCostume = sprite.costumes[0];
    self.handleVisible = false;
  },
  setCurrentCostume(costume) {
    if (!self.currentSprite.costumes.find(c => c.id === costume.id)) {
      throw new Error("Costume not found in current sprite");
    }
    self.currentCostume = costume;
    self.currentSprite.setCurrentCostume(costume);
  },
  deleteCurrentCostome() {
    self.currentSprite.delCostome(self.currentCostume.id)
    self.currentCostume = self.currentSprite.costumes[0];
  },
  setCurrentSound(sound) {
    if (!self.project.sounds.find(s => s.id === sound.id)) {
      throw new Error("Sound not found in current project");
    }
    self.currentSound = sound;
  },
}))
.actions(self => ({
  newProject() {
    self.project = clone(defaultProject);
    self.setCurrentSprite(self.project.sprites[1]);
    self.setCurrentCostume(self.project.sprites[1].costumes[0]);
    self.refreshCounter += 1;
  },
  newSprite() {
    const sprite = self.project.newSprite();
    self.setCurrentSprite(sprite);
  },
  newCostume() {
    const costume = self.currentSprite.newCostume();
    self.setCurrentCostume(costume);
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

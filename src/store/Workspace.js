import {types, clone} from 'mobx-state-tree';
import {Project, Sprite, Costume} from './spx';
import defaultProject from '../lib/default-project/project-data'

const Workspace = types.model('Workspace', {
  project: types.maybe(Project),
  currentSprite: types.maybe(types.reference(Sprite)),
  currentCostume: types.maybe(types.reference(Costume)),
  // Refresh some stateful components when create new project
  refreshCounter: types.optional(types.integer, 0),
})
.views(self => ({
  isCurrentSprite(sprite) {
    return self.currentSprite === sprite;
  },
  isCurrentCostume(costume) {
    return self.currentCostume === costume;
  }
}))
.actions( self => ({
  setCurrentSprite(sprite) {
    self.currentSprite = sprite;
    self.currentCostume = sprite.costumes[0];
  },
  setCurrentCostume(costume) {
    self.currentCostume = costume;
  },
  newProject() {
    self.project = clone(defaultProject);
    self.setCurrentSprite(self.project.sprites[1]);
    self.setCurrentCostume(self.project.sprites[1].costumes[0]);
    self.refreshCounter += 1;
  }
}));

export function createWorkspace() {
  const workspace = Workspace.create({});
  workspace.newProject();
  return workspace;
}

export default Workspace;

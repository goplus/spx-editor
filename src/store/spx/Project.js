import { types } from 'mobx-state-tree';

import Sprite from './Sprite';
import Sound from './Sound';

const Project = types.model('Project', {
  id: types.identifier,
  name: types.string,
  stageWidth: types.number,
  stageHeight: types.number,
  sprites: types.array(Sprite),
  sounds: types.array(Sound),
})
.views(self => ({
  get pureSprites() {
    return self.sprites.filter(sprite => !sprite.isStage);
  },
  get stage() {
    return self.sprites.find(sprite => sprite.isStage);
  },
}));

export default Project

export function exportSpxPkg(project) {

}

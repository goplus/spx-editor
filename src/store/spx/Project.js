import { types } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';

import Sprite from './Sprite';
import Sound from './Sound';
import Costume from './Costume';

const Project = types.model('Project', {
  id: types.optional(types.identifier, uuidv4),
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
}))
.actions(self => ({
  setName(name) {
    self.name = name;
  },
  newSprite() {
    for (let i = 1; i < 1000; i++) {
      const spriteName = `Sprite${i}`;
      if (!self.sprites.find(sprite => sprite.name === spriteName)) {
        const sprite = Sprite.create({
          name: spriteName,
          isStage: false,
          costumes: [
            Costume.create({
              name: 'Costume1',
            })
          ],
        });
        self.sprites.push(sprite);
        return sprite;
      }
    }

    throw new Error('Too many sprites');
  },
}));

export default Project

export function exportSpxPkg(project) {

}

import { clone } from "mobx-state-tree"
import {Project, Sprite} from './spx';
import { DEFAULT_SPRITE_CODE } from '../helpers/constants';

const defaultSprite = Sprite.create({
  id: 'default',
  isStage: false,
  name: '小猫',
  code: DEFAULT_SPRITE_CODE,
});

export const project = Project.create({
  id: 'default',
  name: '我的作品',
  sprites: [clone(defaultSprite)],
});

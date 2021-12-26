import { types } from 'mobx-state-tree';

export const Variable = types.model('Variable', {
  id: types.identifier,
  name: types.string,
  type: types.string,
  value: types.string,
});

export const Constume = types.model('Constume', {
  id: types.identifier,
  name: types.string,
  imageType: types.string,
  image: types.string,
});

export const Sound = types.model('Sound', {
  id: types.identifier,
  name: types.string,
  sound: types.string,
  dataFormat: types.string,
});

export const Sprite = types.model('Sprite', {
  id: types.identifier,
  isStage: types.boolean,
  name: types.string,
  code: types.string,
  variables: types.array(Variable),
  constumes: types.array(types.string),
});

export const Project = types.model('Project', {
  id: types.identifier,
  name: types.string,
  sprites: types.array(Sprite),
  sounds: types.array(Sound),
});

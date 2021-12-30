import { types } from 'mobx-state-tree';

export const Sound = types.model('Sound', {
  id: types.identifier,
  name: types.string,
  format: types.string,
  soundData: types.string,
  dataFormat: types.enumeration('SoundFormat', ['wav', 'mp3']),
  sampleCount: types.number,
  rate: types.number,
});

export default Sound;

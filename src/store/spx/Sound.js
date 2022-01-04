import { types } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';

export const Sound = types.model('Sound', {
  id: types.optional(types.identifier, uuidv4),
  name: types.string,
  format: types.string,
  soundData: types.string,
  dataFormat: types.enumeration('SoundFormat', ['wav', 'mp3']),
  sampleCount: types.number,
  rate: types.number,
});

export default Sound;

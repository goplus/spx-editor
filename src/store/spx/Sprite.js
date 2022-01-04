import { types } from 'mobx-state-tree';
import {v4 as uuidv4} from 'uuid';

import Variable from './Variable';
import Costume from './Costume';

const Sprite = types.model('Sprite', {
  id: types.optional(types.identifier, uuidv4),
  name: types.string,
  isStage: types.boolean,
  isDraggable: types.optional(types.boolean, true),
  heading: types.optional(types.number, 0),
  rotationStyle: types.optional(types.string, 'normal'),
  size: types.optional(types.number, 1.0),
  visible: types.optional(types.boolean, true),
  x: types.optional(types.number, 0),
  y: types.optional(types.number, 0),
  volume: types.optional(types.number, 100.0),
  code: types.optional(types.string, ''),
  currentCostume: types.optional(types.integer, 0),
  variables: types.array(Variable),
  lists: types.array(types.string),
  costumes: types.array(Costume),
})
.actions(self => ({
  newCostume() {
    for (let i = 1; i < 1000; i++) {
      const costumeName = `costume${i}`;
      if (!self.costumes.find(costume => costume.name === costumeName)) {
        const costume = Costume.create({
          name: costumeName,
        });
        self.costumes.push(costume);
        return costume;
      }
    }

    throw new Error('Too many costumes');
  },
  setCode(code) {
    self.code = code;
  },
  addVar(varName, varType, varValue) {
    if (self.variables.filter(v => v.name === varName).length > 0) {
      return false;
    }

    self.variables.push(Variable.create({
      id: `var-${varName}`,
      name: varName,
      type: varType,
      value: varValue,
    }));

    return true;
  },
  delVar(varId){
    self.variables = self.variables.filter(v => v.id !== varId);
  }
}));

export default Sprite;

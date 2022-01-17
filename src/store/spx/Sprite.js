import { types } from 'mobx-state-tree';
import {v4 as uuidv4} from 'uuid';

import Variable from './Variable';
import Costume from './Costume';

const Sprite = types.model('Sprite', {
  id: types.optional(types.identifier, uuidv4),
  name: types.string,
  isStage: types.boolean,
  isDraggable: types.optional(types.boolean, true),
  heading: types.optional(types.number, 90),
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
  delCostome(id) {
    // TODO:
    // self.costumes = self.costumes.filter(v => v.id !== id)
    self.currentCostume = 0
    // error after execute the code in line 42:
    // mobx-state-tree.module.js:7592 Uncaught Error: [mobx-state-tree] Failed to resolve reference 'xxx' to type 'Costume' (from node: /currentCostume)
  },
  setCurrentCostume(costume) {
    if (typeof(costume) === 'number') {
      self.currentCostume = costume;
    } else {
      self.currentCostume = self.costumes.indexOf(costume);
    }
  },
  setName(name) {
    self.name = name;
  },
  setCode(code) {
    self.code = code;
  },
  setVisible(visible) {
    self.visible = visible;
  },
  setX(x) {
    self.x = x;
  },
  setY(y) {
    self.y = y;
  },
  setSize(size) {
    self.size = size;
  },
  setHeading(heading) {
    self.heading = heading;
  },
  addVar(varName, varType, varValue) {
    if (self.variables.filter(v => v.name === varName).length > 0) {
      return false;
    }

    if (varValue !== undefined) {
      switch (varType) {
        case 'int':
          varValue = parseInt(varValue, 10);
          break;
        case 'float':
          varValue = parseFloat(varValue);
          break;
        default:
          varValue = varValue.toString();
      }
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

import raw from '../raw.macro';
import {Project, Costume, Sound, Sprite, Variable} from '../../store/spx';

const DEFAULT_SPRITE_CODE =
`// 小猫
onStart => {
  play 喵
  say "喵"
}

onClick => {
  play 喵
  say "喵～喵～"
  nextCostume
}
`

const projectData = Project.create({
  id: 'default-project',
  name: '我的作品',
  stageWidth: 480,
  stageHeight: 360,
  sprites: [
    Sprite.create({
      id: 'stage',
      isStage: true,
      name: "Stage",
      code: '',
      variables: [
        Variable.create({
          id: "default-var",
          name: "我的变量",
          type: "int",
          value: "0",
        }),
      ],
      lists: [],
      currentCostume: 0,
      costumes: [
        Costume.create({
          id: "cd21514d0531fdffb22204e0ec5ed84a",
          name: '背景',
          image: raw('./cd21514d0531fdffb22204e0ec5ed84a.svg'),
          dataFormat: "svg",
          bitmapResolution: 1,
          rotationCenterX: 240,
          rotationCenterY: 180,
        }),
      ],
      volume: 100,
      heading: 90,
    }),
    Sprite.create({
      id: 'cat',
      isStage: false,
      name: '小猫',
      variables: [],
      code: DEFAULT_SPRITE_CODE,
      currentCostume: 0,
      costumes: [
        Costume.create({
          id: "bcf454acf82e4504149f7ffe07081dbc",
          name: 'costume1',
          bitmapResolution: 1,
          image: raw('./bcf454acf82e4504149f7ffe07081dbc.svg'),
          dataFormat: "svg",
          rotationCenterX: 48,
          rotationCenterY: 50,
        }),
        Costume.create({
          id: "0fb9be3e8397c983338cb71dc84d0b25",
          name: 'costume2',
          bitmapResolution: 1,
          image: raw('./0fb9be3e8397c983338cb71dc84d0b25.svg'),
          dataFormat: "svg",
          rotationCenterX: 46,
          rotationCenterY: 53,
        }),
      ],
      volume: 100,
      visible: true,
      x: 0,
      y: 0,
      size: 1,
      heading: 90,
      draggable: false,
      rotationStyle: "all around",
    }),
  ],
  sounds: [
    Sound.create({
      id: "83c36d806dc92327b9e7049a565c6bff",
      name: '喵',
      dataFormat: "wav",
      format: "",
      rate: 22050,
      sampleCount: 18688,
      soundData: raw('./83c36d806dc92327b9e7049a565c6bff.wav'),
    }),
    Sound.create({
      id: "83a9787d4cb6f3b7632b4ddfebf74367",
      name: 'pop',
      dataFormat: "wav",
      format: "",
      rate: 11025,
      sampleCount: 258,
      soundData: raw('./83a9787d4cb6f3b7632b4ddfebf74367.wav'),
    }),
  ],
});

export default projectData;

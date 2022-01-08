import {useState, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
import Moveable from "react-moveable";
import { workspace } from '../store';

const Costume = observer(function Costume({project, costume, sprite}) {
  const ref = useRef(null);
  const x = project.stageWidth / 2 + sprite.x - costume.rotationCenterX;
  const y = project.stageHeight / 2 + sprite.y - costume.rotationCenterY;

  return (
    <>
      <div ref={ref} className="stage-sprite inline-block absolute" style={{transform: `translate(${x}px, ${y}px)`}}>
        <img key={sprite.id}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(costume.image)}`} />
      </div>
      <Moveable
        target={ref}
        edge={false}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={0}
        origin={false}
        padding={{"left":0,"top":0,"right":0,"bottom":0}}
        onDragStart={e => {
          e.set([x, y]);
        }}
        onDrag={e => {
          const [transX, transY] = e.beforeTranslate;
          sprite.setX(transX + costume.rotationCenterX - project.stageWidth / 2);
          sprite.setY(transY + costume.rotationCenterY - project.stageHeight / 2);
        }}
      />
    </>
  );
});

export default observer(function Stage() {
  return (
    <div className="stage flex-none bg-white rounded-md" style={{width: '480px', height: '360px'}}>
      {workspace.project.pureSprites.map(sprite => {
        if (!sprite.visible) {
          return null;
        }

        const costume = sprite.costumes[sprite.currentCostume];
        return (
          costume.isShowable && <Costume key={sprite.id}
            project={workspace.project}
            sprite={sprite}
            costume={costume} />
        );
    })}
    </div>
  );
});

import {useRef} from 'react';
import {observer} from 'mobx-react';
import Moveable from "react-moveable";
import { workspace } from '../store';

const Costume = observer(function Costume({project, costume, sprite, spriteIndex}) {
  const ref = useRef(null);
  const x = project.stageWidth / 2 + sprite.x - costume.rotationCenterX;
  const y = project.stageHeight / 2 - sprite.y - costume.rotationCenterY;
  const rotate = sprite.heading - 90;

  return (
    <>
      <div ref={ref} className="stage-sprite inline-block absolute"
        style={{transform: `translate(${x}px, ${y}px) scale(${sprite.size}) rotate(${rotate}deg)`}}
        onClick={e => {
          workspace.setHandleVisible(true);
          e.stopPropagation();
        }}>
        <img key={sprite.id}
          alt={sprite.name + '/' + costume.name}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(costume.image)}`} />
      </div>
      <Moveable
        target={ref}
        draggable
        rotatable
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={workspace.isHandleNeedShow(sprite) ? 1 : 0}
        origin={false}
        padding={{"left":0,"top":0,"right":0,"bottom":0}}
        onDragStart={e => {
          workspace.setCurrentSpriteIndex(spriteIndex);
          workspace.setHandleVisible(true);

          e.set([x, y]);
        }}
        onDrag={e => {
          const [transX, transY] = e.beforeTranslate;
          sprite.setX(transX + costume.rotationCenterX - project.stageWidth / 2);
          sprite.setY(-transY - costume.rotationCenterY + project.stageHeight / 2);
        }}
        onRotateStart={e => {
          e.set(sprite.heading);
        }}
        onRotate={e => {
          sprite.setHeading(e.beforeRotate);
        }}
      />
    </>
  );
});

export default observer(function Stage() {
  const [w, h] = [workspace.project.stageWidth, workspace.project.stageHeight];

  return (
    <div className="stage flex-none bg-white rounded-md overflow-hidden relative"
      style={{width: `${w}px`, height: `${h}px`}}
      onClick={() => workspace.setHandleVisible(false)}>
      {workspace.project.pureSprites.map((sprite, i) => {
        if (!sprite.visible) {
          return null;
        }

        const costume = sprite.currentCostume;
        return (
          costume.isShowable && <Costume key={sprite.id}
            project={workspace.project}
            sprite={sprite}
            spriteIndex={i+1}
            costume={costume} />
        );
    })}
    </div>
  );
});

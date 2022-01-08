import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import PaintEditor from 'scratch-paint/dist/scratch-paint';
import {workspace} from '../store';

export default observer(function CostumeEditor() {
  const currentCostume = workspace.currentCostume;

  const optionalZoomLevelId = '0'

  return (
    <div className="costume-editor flex flex-row flex-auto space-x-0.5 bg-gray-100">
      <div className="costume-list w-32 p-2 space-y-2 bg-white">
        {workspace.currentSprite.costumes.map(costume => (
          <div key={costume.id}
            className={classnames(
              "costume-item flex flex-row items-center space-x-2 p-2 rounded-md bg-gray-200",
              workspace.isCurrentCostume(costume) ? 'bg-sky-300' : 'bg-gray-200'
            )}
            onClick={() => workspace.setCurrentCostume(costume)}
          >
            {costume.name}
          </div>
        ))}
        <button
            className={classnames(
              "costume-item flex flex-row items-center space-x-2 p-2 rounded-md bg-gray-200 bg-green-300"
            )}
            onClick={workspace.newCostume}
          >
            Paint
          </button>
      </div>
      <div className="costume-editor-content flex-1 flex flex-col bg-white">
        <PaintEditor
          name={currentCostume.name}
          image={currentCostume.image}
          imageId={currentCostume.id}
          imageFormat={currentCostume.dataFormat}
          rotationCenterX={currentCostume.rotationCenterX}
          rotationCenterY={currentCostume.rotationCenterY}
          onUpdateImage={workspace.updateCostumeImage}
          onUpdateName={currentCostume.setName}
          zoomLevelId={optionalZoomLevelId}
        />
      </div>
    </div>
  );
});

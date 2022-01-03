import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import PaintEditor from 'scratch-paint/dist/scratch-paint';
import {imageDataToDataUrl} from '../lib/image';
import {workspace} from '../store';

export default observer(function CostumeEditor() {
  const currentCostume = workspace.currentCostume;

  const optionalZoomLevelId = '0'
  const handleUpdateImageFunction = async (isVector, image) => {
    const dataFormat = isVector ? 'svg' : 'png';
    if (!isVector) {
      image = imageDataToDataUrl(image);
    }
    currentCostume.setImage(dataFormat, image);
  }
  const handleUpdateNameFunction = (name) => {
    currentCostume.setName(name)
  }

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
      </div>
      <div className="costume-editor-content flex-1 flex flex-col bg-white">
        <PaintEditor
          name={currentCostume.name}
          image={currentCostume.image}
          imageId={currentCostume.id}
          imageFormat={currentCostume.dataFormat}
          rotationCenterX={currentCostume.rotationCenterX}
          rotationCenterY={currentCostume.rotationCenterY}
          onUpdateImage={handleUpdateImageFunction}
          onUpdateName={handleUpdateNameFunction}
          zoomLevelId={optionalZoomLevelId}
        />
      </div>
    </div>
  );
});

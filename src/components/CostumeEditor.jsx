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
        {workspace.currentSprite.costumes.map((costume, i) => (
          <div key={costume.id}
            className={classnames(
              "costume-item flex flex-row items-center space-x-2 p-2 rounded-md bg-gray-200 group",
              workspace.isCurrentCostume(costume) ? 'bg-sky-300' : 'bg-gray-200'
            )}
            onClick={() => workspace.setCurrentCostumeIndex(i)}
          >
            <p> {costume.name} </p>
            { workspace.isCurrentCostume(costume) && workspace.currentSprite.costumes.length > 1 &&
            <button onClick={ (e) => {
              e.stopPropagation()
              workspace.deleteCurrentCostome()
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="red">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            }
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

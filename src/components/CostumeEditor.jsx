import React from 'react';
import PaintEditor from 'scratch-paint/dist/scratch-paint';

export default function CostumeEditor() {
  const optionalZoomLevelId = '0'
  const handleUpdateImageFunction = (image) => {}
  const optionalImage = null
  const optionalId = null
  return (
    <div className="costume-editor flex flex-auto">
      <PaintEditor
        image={optionalImage}
        imageId={optionalId}
        imageFormat='svg'
        rotationCenterX={0}
        rotationCenterY={0}
        onUpdateImage={handleUpdateImageFunction}
        onUpdateName={() => {}}
        zoomLevelId={optionalZoomLevelId}
      />
    </div>
  );
}

import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import {workspace} from '../store';

export default observer(function SoundEditor() {
  return (
    <div className="sound-editor flex flex-row flex-auto space-x-0.5 bg-gray-100">
      <div className="sound-list w-32 p-2 space-y-2 bg-white">
        {workspace.project.sounds.map(sound => (
          <div key={sound.id}
            className={classnames(
              "sound-item flex flex-row items-center space-x-2 p-2 rounded-md bg-gray-200",
              workspace.isCurrentSound(sound) ? 'bg-sky-300' : 'bg-gray-200'
            )}
            onClick={() => workspace.setCurrentSound(sound)}
          >
            {sound.name}
          </div>
        ))}
      </div>
      <div className="sound-editor-content flex-1 flex flex-col bg-white">
      </div>
    </div>
  );
});

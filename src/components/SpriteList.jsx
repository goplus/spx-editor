import React from 'react';
import classnames from 'classnames';
import {observer} from 'mobx-react'
import {workspace} from '../store'

export default observer(function SpriteList() {
  return (
    <div className="sprite-list flex-1 flex-auto bg-white rounded-md p-1 space-y-2">
      <div className="sprite-list-item flex flex-row items-center space-x-2">
        <button className='add-var bg-sky-500 text-white p-1 rounded-md'>
          Upload sprite
        </button>
        <button className='add-var bg-sky-500 text-white p-1 rounded-md' onClick={workspace.newSprite}>
          Paint
        </button>
        <button className='add-var bg-sky-500 text-white p-1 rounded-md'>
          Search
        </button>
        <button className='add-var bg-sky-500 text-white p-1 rounded-md'>
          Suprise
        </button>
      </div>
      {workspace.project.sprites.map(sprite => (
        <div key={sprite.id}
          className={classnames("sprite-list-item flex flex-row items-center space-x-2 p-2 rounded-md",
            workspace.isCurrentSprite(sprite) ? 'bg-sky-300' : 'bg-gray-200')
        }>
          <div className="sprite-list-item-name flex-1" onClick={() => workspace.setCurrentSprite(sprite)}>
            {sprite.name}
          </div>
        </div>
      ))}
    </div>
  );
});

import React from 'react';
import classnames from 'classnames';
import {observer} from 'mobx-react'
import {workspace} from '../store'

export default observer(function SpriteList() {
  return (
    <div className="sprite-list flex-auto bg-white rounded-md p-1 space-y-2">
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
      {workspace.project.sprites.map((sprite, i) => (
        <div key={sprite.id}
          className={classnames("sprite-list-item items-center space-x-2 p-2 rounded-md flow-root",
            workspace.isCurrentSprite(sprite) ? 'bg-sky-300' : 'bg-gray-200')}
            onClick={() => workspace.setCurrentSpriteIndex(i)}
        >
          <div className="sprite-list-item-name float-left" >
            {sprite.name}
          </div>
          {!sprite.isStage && sprite === workspace.currentSprite &&
          <button className='delete-button float-right' onClick={ (e) =>
            {
              e.stopPropagation()
              workspace.deleteCurrentSprite()
            }
          }>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="red">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          }
        </div>
      ))}
    </div>
  );
});

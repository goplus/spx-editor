import React from 'react';
import SpriteEditor from './SpriteEditor';
import SpriteList from './SpriteList';
import Stage from './Stage';

export default function Workspace() {
  return (
    <div className='workspace flex flex-auto flex-row p-1 space-x-1'>
      <div className='sprite-editor-wrapper flex flex-auto flex-row flex-grow'>
        <SpriteEditor />
      </div>
      <div className='right-wrapper flex flex-none flex-col space-y-1'>
        <Stage />
        <SpriteList />
      </div>
    </div>
  );
}

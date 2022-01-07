import { Switch } from '@headlessui/react'
import { observer } from 'mobx-react'
import { workspace } from '../store'

export default observer(function SpritePropEditor() {
  const sprite = workspace.currentSprite;

  return (
    <div className="sprite-prop-editor flex flex-col flex-none bg-gray-200 rounded-md p-1 space-y-2 text-sm">
      <div className="sprite-prop-editor-item flex flex-row items-center space-x-2">
        <div className="sprite-prop-editor-item flex flex-row flex-auto items-center space-x-2">
          <div className="sprite-prop-editor-item-name">
            Name
          </div>
          <input className="sprite-prop-editor-item-input w-32 border rounded-full px-2"
            value={sprite.name}
            onChange={e => sprite.setName(e.target.value)} />
        </div>
        <div className="sprite-prop-editor-item flex flex-row flex-auto items-center justify-self-center space-x-2">
          <div className="sprite-prop-editor-item-name">
            X
          </div>
          <input className="sprite-prop-editor-item-input w-12 border rounded-full text-center"
            type='number'
            value={sprite.x}
            onChange={e => sprite.setX(parseFloat(e.target.value))} />
        </div>
        <div className="sprite-prop-editor-item flex flex-row flex-1 justify-self-end space-x-2">
          <div className="sprite-prop-editor-item-name">
            Y
          </div>
          <input className="sprite-prop-editor-item-input w-12 border rounded-full text-center"
            type='number'
            value={sprite.y}
            onChange={e => sprite.setY(parseFloat(e.target.value))} />
        </div>
      </div>
      <div className="sprite-prop-editor-item flex flex-row items-center space-x-2">
        <div className="sprite-prop-editor-item flex flex-row flex-auto items-center space-x-2">
          <div className="sprite-prop-editor-item-name">
            Show
          </div>
          <Switch
            checked={sprite.visible}
            onChange={sprite.setVisible}
            className={`${
              sprite.visible ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Show</span>
            <span
              className={`${
                sprite.visible ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
        <div className="sprite-prop-editor-item flex flex-row flex-auto items-center space-x-2">
          <div className="sprite-prop-editor-item-name">
            Size
          </div>
          <input className="sprite-prop-editor-item-input w-16 border rounded-full text-center"
            type='number' min='0.01'
            value={sprite.size * 100}
            onChange={e => parseFloat(e.target.value) / 100} />
        </div>
        <div className="sprite-prop-editor-item flex flex-row items-center space-x-2">
          <div className="sprite-prop-editor-item-name">
            Direction
          </div>
          <input className="sprite-prop-editor-item-input w-16 border rounded-full text-center"
            type='number' min='0' max='360'
            value={sprite.heading}
            onChange={e => parseFloat(e.target.value)} />
        </div>
      </div>
    </div>
  );
});

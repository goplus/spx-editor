import React from 'react';
import { Tab } from '@headlessui/react';
import {observer} from 'mobx-react-lite';
import CodeEditor from './CodeEditor';
import CostumeEditor from './CostumeEditor';
import SoundEditor from './SoundEditor';
import classnames from 'classnames';
import { workspace } from '../store';

export default observer(function SpriteEditor() {
  const tabs = [
    {
      id: 'code',
      title: 'Code',
      Component: CodeEditor,
    },
    {
      id: 'costume',
      title: 'Costume',
      Component: CostumeEditor,
    },
    {
      id: 'sound',
      title: 'Sound',
      Component: SoundEditor,
    }
  ];

  return (
    <div className="sprite-editor-tabbar flex flex-col flex-1 sm:px-0 space-y-0">
      <Tab.Group key={workspace.refreshCounter}>
        <Tab.List className="tab-list flex-none items-start ml-2 space-x-2 rounded-md">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classnames(
                  'w-24 py-2.5 mb-0 text-sm leading-5 font-medium text-blue-700 rounded-t-lg',
                  'ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="tab-panels flex flex-auto">
          {tabs.map(tab => (
            <Tab.Panel
              key={tab.id}
              className={classnames(
                'flex flex-auto bg-white rounded-md overflow-hidden',
                'focus:outline-none ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              <tab.Component project={workspace.project} sprite={workspace.currentSprite} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
});

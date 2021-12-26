import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import CodeEditor from './CodeEditor';
import CostumeEditor from './CostumeEditor';
import SoundEditor from './SoundEditor';
import classnames from 'classnames';

export default function Example() {
  let [tabs] = useState([
    {
      id: 'code',
      title: '代码',
      component: <CodeEditor />,
    },
    {
      id: 'costume',
      title: '造型',
      component: <CostumeEditor />,
    },
    {
      id: 'sound',
      title: '声音',
      component: <SoundEditor />,
    }
  ]);

  return (
    <div className="sprite-editor-tabbar flex flex-col flex-1 sm:px-0 space-y-1">
      <Tab.Group>
        <Tab.List className="tab-list flex-none items-start space-x-2 rounded-md">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classnames(
                  'w-24 py-2.5 mb-0 text-sm leading-5 font-medium text-blue-700 rounded-lg',
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
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

import React, {useState, useRef, useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import NewVarModal from './NewVarModal';
import Blocks from './Blocks';
import { workspace } from '../store';

function Var({sprite, variable}) {
  return (
    <div className='var-list-body-item flex flex-row border-b-2 py-2 group'>
      <div className='var-list-body-item-name'>
        {variable.name}
      </div>
      <div className='var-list-body-item-value flex-1 text-sky-600 ml-2 mr-2'>
        {variable.type}
      </div>
      <button className="hidden group-hover:block justify-self-end" onClick={() => sprite.delVar(variable.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="red">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

export default observer(function ({sprite, stage}) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [error, setError] = useState(null);
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  const handleClose = () => {
    setKey(key + 1);
    setIsOpen(false);
    setError(null);
  };

  const onSubmit = ({name, type, value}) => {
    if (sprite.addVar(name, type, value)) {
      handleClose();
    } else {
      setError(`变量 ${name} 已存在`);
    }
  };

  return (
    <div ref={targetRef} className='flex flex-row space-x-0.5'>
      <div className='blocks flex-none bg-white'>
        <Blocks />
      </div>
      <div className='var-list flex-auto bg-sky-300 overflow-y-auto' style={{height: dimensions.height}}>
        <div className='var-list-header flex flex-none flex-row px-1 py-2 bg-gray-200 rounded-tl-md'>
          <div className='var-list-header-title flex-none'>变量</div>
          <div className='var-list-header-buttons grid flex-auto justify-self-end justify-items-end'>
            <button className='add-var bg-sky-500 text-white p-1 rounded-md text-xs ml-6'
              onClick={() => setIsOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              添加变量
            </button>
          </div>
        </div>
        <div className='px-2' style={{backgroundColor: '#F9F9F9'}}>
          {!sprite.isStage && stage.variables.map((v, i) => (
            <Var key={`${v.id}_${i}`} sprite={stage} variable={v} />
          ))}
          {sprite.variables.map((v, i) => (
            <Var key={`${v.id}_${i}`} sprite={sprite} variable={v} />
          ))}
        </div>
        <object type='image/svg+xml' data='/svg-export/svgexport-16.svg'>
          Your browser does not support SVG
        </object>
      </div>
      <NewVarModal key={key} isOpen={isOpen} error={error} onClose={handleClose} onSubmit={onSubmit}/>
    </div>
  );
});

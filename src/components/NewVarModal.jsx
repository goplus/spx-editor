import React, {useState} from 'react';
import Modal from './Modal';
import classnames from 'classnames';

export default function NewVarModal({isOpen, error, onClose, onSubmit}) {
  const [type, setType] = useState('int');
  const [name, setName] = useState('');

  return (
    <Modal
        className=""
        closeTimeoutMS={150}
        isOpen={isOpen}
        onCancel={onClose}
      >
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto px-8 py-6 fixed inset-x-0 bottom-0 z-30 mb-4 mx-4 md:relative">
        <div className="md:flex items-center">
          <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          </div>
          <div className="flex flex-col mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">添加新变量</h3>
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="请输入变量名"
                className={classnames("px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full", {"border-rose-500": !!error, "border-2": !!error})}
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </div>
            {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}
            <div className="flex justify-center">
              {[['int', '整数'], ['float', '浮点数'], ['string', '字符串']].map(([t, name]) => (
                <div key={t} className="form-check form-check-inline">
                  <input
                    className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="var-type"
                    id={`type-${t}`}
                    value="int"
                    defaultChecked={type === t}
                    onClick={() => setType(t)} />
                  <label className="form-check-label inline-block text-gray-800" htmlFor={`type-${t}`}>{name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-400 text-green-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            onClick={() => onSubmit({name, type})}>
            确定
          </button>
          <button
            onClick={onClose}
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
      md:mt-0 md:order-1"
          >
            取消
          </button>
        </div>
      </div>
    </Modal>
  );
}

import React, { Fragment, useEffect } from "react";
import Portal from "./Portal";

const Modal = ({ isOpen, onCancel, children }) => {
  useEffect(() => {});
  return (
    <>
      {isOpen && <Portal>
        <div className="fixed inset-0 px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-black opacity-25 w-full h-full absolute z-20 inset-0" onClick={onCancel} />
          {children}
        </div>
      </Portal>}
    </>
  );
};

export default Modal;

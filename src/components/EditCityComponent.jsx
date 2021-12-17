import React, { useState } from 'react'

const EditCityComponent = ({ show, handleClose, children  }) => {

    const showHideClassName = show ? "modal d-block" : "modal d-none";

    return (
        <div className={showHideClassName}>
          <div className="edit-container">

          {children}
            <a href="javascript:;" className="modal-close" onClick={handleClose}
            >
              close
            </a>
          </div>
        </div>
      );
}

export default EditCityComponent

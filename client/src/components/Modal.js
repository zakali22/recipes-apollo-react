import React from "react"

const Modal = ({children, onModalClose}) => {
    const handleClose = (e) => {
        console.log(e.target.classList)
        if(e.target.classList.contains('modal') && !e.target.classList.contains('modal__content')){
            onModalClose()
        }
    }
    
    return (
        <div className="modal" onClick={handleClose}>
            <div className="modal__content">
                {children}
                <span className="modal__content-close" onClick={onModalClose}>x</span>
            </div>
        </div>
    )
}

export default Modal
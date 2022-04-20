import React, {useRef} from 'react'
import {CSSTransition} from "react-transition-group";

export default function Popup(props) {
  const nodeRef = useRef(null);

  return (props.trigger) ? (
    <div className="popup">
      <CSSTransition 
        in={props.trigger}
        nodeRef={nodeRef}
        appear={true}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeRef} className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
            {props.children}
        </div>
      </CSSTransition>
    </div>
  ) : "";
}
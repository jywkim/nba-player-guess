import React, {useRef, useState, useEffect} from 'react'
import {CSSTransition} from "react-transition-group";

export default function Popup(props) {
  const nodeRef = useRef(null);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(true);
  }, [props.trigger]);

  const closeWindow = () => {
    setFade(false);
    setTimeout(triggerState, 500);
  }

  const triggerState = () => {
    props.setTrigger(false);
  }

  return (props.trigger) ? (
      <CSSTransition 
        in={fade}
        nodeRef={nodeRef}
        appear={true}
        timeout={300}
        classNames="fade"
      >
      <div className="popup" ref={nodeRef}>
          <div className="popup-inner" ref={nodeRef}>
              <button className="close-btn" onClick={() => closeWindow()}>X</button>
              {props.children}
          </div>
      </div>
    </CSSTransition>
  ) : "";
}
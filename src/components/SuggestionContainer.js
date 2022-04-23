import React, { useEffect, useRef, useState } from "react";
import {CSSTransition} from "react-transition-group";

export const SuggestionContainer = ({ children, ...props }) => {
    const nodeRef = useRef(null);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        setFade(true);
      }, [props]);

    return (
        <CSSTransition 
            in={fade}
            nodeRef={nodeRef}
            appear={true}
            timeout={300}
            classNames="fade-suggest"
            {...props}
        >
            <div ref={nodeRef}>
            {children}
            </div>
        </CSSTransition>
    );
  };
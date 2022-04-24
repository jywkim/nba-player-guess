import React, { useEffect, useRef, useState } from "react";
import {CSSTransition} from "react-transition-group";

export const CellContainer = ({ children, ...props }) => {
    const nodeRef = useRef(null);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        setFade(true);
      }, [fade]);

    return (
        <CSSTransition 
            in={fade}
            nodeRef={nodeRef}
            appear={true}
            timeout={props.ptimeout}
            classNames={props.pclass}
            {...props}
        >
            <td ref={nodeRef} className={props.ptableclass}>
                {children}
            </td>
        </CSSTransition>
    );
  };
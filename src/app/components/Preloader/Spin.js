import React from 'react';
import Overlay from '../Overlay.js';
import { Spin as AntdSpin } from 'antd';

const Spin = (props) => {
    return(
        <React.Fragment>
        {props.overlay ? 
            <Overlay>
                <AntdSpin className={props.className}/>
            </Overlay>
            :
            <AntdSpin className={props.className}/>
        }
        </React.Fragment>
    )
}

export default Spin;
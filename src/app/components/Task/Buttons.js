import React from 'react';
import { Button } from 'antd';

const Buttons = (props) => {
    return(
        <div className={"tm-task-buttons " + (props.className)}>
            <Button 
                className="mr" 
                onClick={props.handleChangeButtonClick}>
                {props.isChanging 
                    ?
                    'Cancel'
                    :
                    'Edit'
                }
            </Button>
            <Button 
                onClick={props.handleSaveButtonClick}
                disabled={!props.isChanging}
                type="primary"
                htmlType="submit">
                Save
            </Button>
            <Button
                onClick={props.handleRemoveButtonClick}
                className="flr"
                type="danger">
                Delete task
            </Button>  
        </div>
    )
}

export default Buttons
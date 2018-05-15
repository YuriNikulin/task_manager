import React from 'react';
import { withFormsy } from 'formsy-react';
import { Input as antInput } from 'antd'

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    changeValue = (event) => {
        this.props.setValue(event.currentTarget.value);
    }

    render() {
        const errorMessage = ((this.props.toShowError && this.props.getErrorMessage()) 
            || (this.props.toShowError && this.props.showRequired() && 'This field is required') 
            || null);
        let showRec = this.props.showRequired();
        let params = {
                onChange: this.changeValue,
                value: this.props.getValue() || '',
                name: this.props.name,
                ...this.props.attributes,
        };
        let Element;

        switch (this.props.element) {
            case 'input': Element = <input  {...params}/>; break;
            case 'textarea': Element = <textarea {...params}/>; break;
            case 'select': Element = <select {...params}>{this.props.children}</select>; break;
            default: Element = <input {...params}/>; break;
        }

        return(
            <div className={"tm-input-container" + (this.props.isRequired() ? ' tm-input-container--required' : '')
            + (errorMessage ? ' tm-input-container--error' : '')
            }>
                {this.props.label && 
                    <label className='tm-input__label' htmlFor={this.props.attributes.id || null}>
                        {this.props.label}
                    </label>
                }
                <div className="tm-input-wrapper">

                    {Element}

                    {errorMessage && 
                        <span className="tm__error">
                            {errorMessage}
                        </span>
                    }
                </div> 
            </div>       
        )
    }
}

export default withFormsy(Input);
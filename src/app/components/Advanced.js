import React from 'react';
import {ThemeContext, themes} from './context/ThemeContext.js';
import ThemedButton from './ThemedButton.js';
import ThemedButtonGroup from './ThemedButtonGroup.js';
import ComponentWithWith from './context/ComponentWithWith.js';
import ComponentGoesInPortal from './ComponentGoesInPortal.js';
import ComponentWillCauseAnError from './ComponentWillCauseAnError.js';
import Popup from './Popup.js';
import Hoc from './hoc/Hoc.js';
import Refs from './Refs/Refs.js';
import RenderProps from './RenderProps/RenderProps.js';

class Advanced extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.dark,
            toggleTheme: this.toggleTheme
        }
    }
    toggleTheme = () => {
        console.log('test');
        this.setState(state => ({
            theme: state.theme === themes.dark
                ? themes.light
                : themes.dark,
        }));
    }
    componentDidCatch = (error, info) => {
        console.log(info);
        console.log('error! ' + error);
        console.log('info ' + info); 
    }
    render() {
        return(
            <div className="advanced">
                <ThemeContext.Provider value={this.state}>
                    <ThemedButton className="btn--light">
                        Themed Button
                    </ThemedButton>
                    <ThemedButtonGroup count={5}>

                    </ThemedButtonGroup>
                    <ComponentWithWith foo='bar'/>
                    <ComponentGoesInPortal>
                        <Popup>
                            <ComponentWithWith />
                            <ThemedButton>
                                I can toggle theme out of portal!
                            </ThemedButton>
                        </Popup>        
                    </ComponentGoesInPortal>
                    <Hoc />
                    <Refs />
                    <RenderProps />
                </ThemeContext.Provider>
            </div>
        )   
    }
}

export {Advanced};
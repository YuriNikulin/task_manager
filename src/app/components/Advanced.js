import React from 'react';
import {ThemeContext, themes} from './context/ThemeContext.js';
import ThemedButton from './ThemedButton.js';
import ThemedButtonGroup from './ThemedButtonGroup.js';
import ComponentWithWith from './context/ComponentWithWith.js';

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
                </ThemeContext.Provider>
            </div>
        )   
    }
}

export {Advanced};
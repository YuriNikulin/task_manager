import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Preloader from './app/components/Preloader.js';
import getTracks from './app/redux/actions/track.js';
import actionAuth from './app/redux/actions/auth.js';
import LogIn from './app/components/LogIn.js';
import { firebase } from './app/services/firebase';

import Authorization from './app/components/Authorization.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'song': '',
            'search': '',
            'isLoading': !this.props.auth.isLogged,
            'isLogged': this.props.auth.isLogged
        }
        console.log("STATE", this.state);
    }

    componentDidMount() {
        console.log('APP HAS THESE PROPS', this.props);
        this.props.onAuth();
        setTimeout(() => {
            console.log(this.props);
        }, 10000)
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        this.props.onAddTrack(this.state.song);
        this.setState({'song': ''})
    }

    handleRemove = (event) => {
        event.preventDefault();
        const elemId = parseInt(event.target.parentNode.id);
        this.props.onRemoveTrack(elemId);
    }

    handleFind = (event) => {
        this.props.onFindTrack(this.state.search);
    }

    render() {
        const items = this.props.items;
        if (!this.props.auth.isLogged) {
            return (
                <div>
                <LogIn />
                </div>
            )
        }
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )

        // return (
        //     <div>
        //         <div className="search">
        //             <input type="search" style={{marginBottom: 20}} onChange={this.handleInputChange} id="search" value={this.state.search} />
        //             <button onClick={this.handleFind}>Find</button>
        //         </div>
        //         <input type="text" onChange={this.handleInputChange} id="song" value={this.state.song}/>
        //         <button onClick={this.handleSubmit}>Add</button>
        //         <div>
        //             <button onClick={this.props.onGetTracks}>
        //                 Get tracks
        //             </button>
        //         </div>
        //         <ul>
        //             {items.map((item, index) => {
        //                 return (
        //                     <li key={item.id}>
        //                         <Link to={"/tracks/" + item.id}>
        //                             {item.name}
        //                         </Link>
        //                     </li>
        //                 )
        //             })}      
        //         </ul>
        //     </div>
        // )
    }
    
}

export default connect(
    (state, ownProps) => ({
        items: state.track.filter(item => item.name.includes(state.filter)),
        auth: state.auth
    }),
    dispatch => ({
        onAddTrack: (data) => {
            dispatch(
                {
                    type: "ADD_TRACK",
                    payload: {
                        name: data,
                        id: Date.now().toString() 
                    }
                }
            )
        },
        onRemoveTrack: (trackId) => {
            dispatch(
                {
                    type: 'REMOVE_TRACK',
                    payload: trackId
                }
            )
        },
        onFindTrack: (name) => {
            dispatch(
                {
                    type: "FIND_TRACK", 
                    payload: name
                }
            )
        },
        onGetTracks: () => {
            dispatch(getTracks());
        },
        onAuth: () => {
            dispatch(actionAuth());
        }
    })
)(App);
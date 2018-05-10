const initialState = [];

const notifications = (state=initialState, action) => {
    switch (action.type) {
        case 'PUSH_NOTIFICATION':
            return ([
                ...state, {
                    text: action.data.text,
                    duration: action.data.duration
                },
            ]); 
        case 'REMOVE_NOTIFICATION':
            return(state.slice(1));
        default: return state;
    }
}

export default notifications;
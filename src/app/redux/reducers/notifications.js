const initialState = [];

const notifications = (state=initialState, action) => {
    switch (action.type) {
        case 'PUSH_NOTIFICATION':
            return ([
                ...state, {
                    text: action.data.text,
                    duration: action.data.duration,
                    id: Math.random()
                },
            ]); 
        case 'REMOVE_NOTIFICATION':
            return(state.filter(item => (item.id != action.data)));
        default: return state;
    }
}

export default notifications;
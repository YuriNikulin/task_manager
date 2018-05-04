const initialState = '';

const filter = (state=initialState, action) => {
    switch (action.type) {
        case 'FIND_TRACK': return action.payload;
        default: return state;
    }
}

export default filter;
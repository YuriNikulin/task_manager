const initialState = {
    isLogged: false
};

const filter = (state=initialState, action) => {
    switch (action.type) {
        case 'AUTH_ACTION': 
        return {
            isLogged: action.payload
        };
        default: return state;
    }
}

export default filter;
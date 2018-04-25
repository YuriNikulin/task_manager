const initialState = {
    isLogged: false,
    currentUser: undefined
};

const filter = (state=initialState, action) => {
    switch (action.type) {
        case 'AUTH_ACTION': 
        return {
            isLogged: action.payload.isLogged,
            currentUser: action.payload.currentUser
        };
        default: return state;
    }
}

export default filter;
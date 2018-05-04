const initialState = {
    isLogged: false,
    currentUser: false,
};

const auth = (state=initialState, action) => {
    switch (action.type) {
        case 'AUTH_ACTION':
            return {
                isLogged: action.payload.isLogged,
                currentUser: action.payload.currentUser,
            };
        default: return state;
    }
}

export default auth;
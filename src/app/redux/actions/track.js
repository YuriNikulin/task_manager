let mockApiData = [
    {
        id: 600,
        name: 'Enter Sandman'
    },
    {
        id: 601,
        name: 'Welcome Home'
    }
];

const getTracks = () => dispatch => {
    setTimeout(() => {
        console.log('Api has loaded');
        dispatch({
            type: 'FETCH_TRACKS_SUCCESS',
            payload: mockApiData
        });
    }, 2000)
}

export default getTracks;
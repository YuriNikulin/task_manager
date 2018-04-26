import { firebase, auth } from '../../services/firebase';

// const FetchTasks = () => (dispatch) => {
//     console.log('i work but dont have props');
//     debugger;
//     dispatch({
//         type: 'FETCH_TASKS',
//         payload: {
            
//         }
//     });
// }

const FetchTasks = (data) => {
    console.log('her');
    return (
        {
            'type': 'FETCH_TASKS',
            'payload': data
        }
    )
}

export default FetchTasks;
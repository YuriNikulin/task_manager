import { firebase, auth } from '../../services/firebase';

const FetchTasks = (data) => {
    return (
        {
            'type': 'FETCH_TASKS',
            'payload': data
        }
    )
}

export default FetchTasks;
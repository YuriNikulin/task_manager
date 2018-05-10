const pushNotification = (data) => {
    console.log(data);
    return ({
        'type': 'PUSH_NOTIFICATION',
        'data': data
    })
}

export default pushNotification;
const removeFilter = (data) => {
    console.log(data);
    return ({
        'type': 'REMOVE_FILTER',
        'data': data
    })
}

export default removeFilter;
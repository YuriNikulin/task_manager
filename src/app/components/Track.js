import React from 'react';
import { connect } from 'react-redux';

const Track = (props) => {
    const tracks = props.track;
    const id = props.params.id;
    console.log(props);
    return (
        <div>
            {props.foundItem && props.foundItem.name}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.params.id;
    const items = state.track;
    const item = items.find(item => {
        return (
            Number(item.id) === Number(id)
        )
    })       
    return {foundItem: item};
};

export default connect(mapStateToProps)(Track);
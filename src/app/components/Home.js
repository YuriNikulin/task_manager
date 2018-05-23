import React from 'react';
import { connect } from 'react-redux';

import actionAuth from '../redux/actions/auth.js';
import { firebase } from '../services/firebase';

import { Redirect } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';

import { Router, Route,  hashHistory } from 'react-router';

import Toolbar from './Toolbar.js';
import ListOfTasks from './ListOfTasks/ListOfTasks.js';

import store from '../redux';
import { FirebaseComp } from '../services/firebase/firebase.js';
import Filter from './Filter.js';
import { Layout, Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'showFilter': false,
            'isLoading': true,
            'isLogged': false
        }
    }

    toggleFilter = () => {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter
            }
        })
    }

    componentDidUpdate() {

    }

    render() {
        return(
            <div>
                <Layout>
                    <Header>
                        <Toolbar toggleFilter={this.toggleFilter} currentLocation="dash" listOfTasks={true}/>
                    </Header> 
                    <Content>
                        {this.state.showFilter &&
                            <Filter />
                        }
                        <Row>
                            <Col span={24}>
                                <ListOfTasks />
                            </Col>
                        </Row>
                    </Content>  
                </Layout>
            </div>
        )
    }
}

export default Home;

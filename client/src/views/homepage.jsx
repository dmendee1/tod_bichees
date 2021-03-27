import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import config from '../config/config.json';

class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            accessToken: '',
            counter: 0,
            userlist: [],
        }
        this.handlePlus = this.handlePlus.bind(this);
        this.handleSubs = this.handleSubs.bind(this);
    }

    componentDidMount() {
        axios.get(config.host + '/worker/list')
            .then(res => {
                console.log("PPPP: ", res);
                this.setState({
                    userlist: res.data
                });
                console.log(this.state.userlist);
            })
            .catch(err => {
                this.setState({
                    username: '',
                    password: '',
                    errors: err.response.data,
                })
                console.log(this.state.errors);
            })
    }

    handlePlus(e) {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    handleSubs(e) {
        if(this.state.counter > 0) {    
            this.setState({
                counter: this.state.counter - 1
            })
        }
    }

    handleSubmit(e) {

    }

    renderItem(count, item) {
        return (
            <tr>
                <td>{count + 1}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.username}</td>
            </tr>
        )
    }

    render() {
        const list = this.state.userlist;
        return(
            <div className="container">
                <Link className="nav-link" to={"/sign-up"}>Add</Link>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => this.renderItem(index, item))}
                    </tbody>
                </Table>
                <div className="right">Size: {list.length}</div>
            </div>
        );
    }
}

export default HomePage;
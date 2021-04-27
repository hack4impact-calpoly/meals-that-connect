import React, { Component } from 'react';
import Clients from './Clients'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner"
import env from "react-dotenv";
import {Link} from "react-router-dom";


class ClientTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           clients: [],
           loaded: false
        };
    }

    async componentDidMount(){
       let info = {
          site: "SLO",
       }
       let response = await fetch(env.backendURL + 'clients/site', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
       })
       const data = await response.json();

       this.setState({clients: data, loaded: true})
    }

    setData = (data) => {
        this.setState({clients: data})
    }

    render() {
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Clients</h1>
                <Link to="/add-client">
                    <button>Add Client</button>
                </Link>
                <div className="site-manager-container">
                    {this.state.loaded === true ? <Clients data={this.state.clients} setData={this.setData}/> :
                    <div>
                        <Spinner animation="border" role="status" />
                    </div>}
                </div>
            </div>
        );
    }
}

export default ClientTableContainer;


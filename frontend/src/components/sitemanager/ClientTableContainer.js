import React, { Component } from 'react';
import Clients from './Clients'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner"
import env from "react-dotenv";

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
        console.log("here")
        this.setState({clients: data})
    }

    render() {
        console.log(this.state.clients)
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Clients</h1>
                <div className="site-manager-container3">
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


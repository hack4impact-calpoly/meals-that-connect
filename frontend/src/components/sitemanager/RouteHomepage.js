import React, { Component } from 'react';
import RouteTable from './RouteTable';
import env from "react-dotenv";
import RoutesNavbar from './RoutesNavbar';

class RouteHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            clients: {},
            routes: []
        };
    }

    async componentDidMount(){
        await this.fetchClients()
    }
    
    async fetchClients () {
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
        let clients = {}
        let prevRoute = null
        let routeData = []
        let routes = []
        for (let i = 0; i < data.length; i++) {
            let client = data[i]
            if (i > 0 && client.routeNumber != prevRoute) {
                clients[prevRoute] = routeData
                routes.push(prevRoute)
                routeData = []
            }
            prevRoute = client.routeNumber
            routeData.push(client)
        }
        if (routeData.length > 0) {
            clients[prevRoute] = routeData
            routes.push(prevRoute)
        }
        this.setState({clients: clients, routes: routes}) 
    }

    setData = (data, route) => {
        let newClients = this.state.clients
        newClients[route] = data
        this.setState({clients: newClients})
    }

    render() {
        let {routes, clients} = this.state
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Routes Page</h1>
                <div>
                    <RoutesNavbar/>
                    <div className="site-manager-container">
                        {routes.map((route, i) =>{
                            return (
                                <section>
                                    <a id={String(route)}></a>
                                    <RouteTable routenum={route} data={clients[route]} setData={this.setData}></RouteTable>
                                </section>
                        );})}
                    </div> 
                    
                </div>
            </div>
           
        );
    }
}


export default RouteHomepage;

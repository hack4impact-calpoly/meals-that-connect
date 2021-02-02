import React, { Component } from 'react';
import RoutePage from './RoutePage';
import env from "react-dotenv";

class SiteManagerHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            clients: []
        };
    }

    async componentDidMount(){
        // fetch all clients for each route
        let routes = [1,2,3,4,5,6,7,8,9]
        for(let i =0; i < routes.length; i++) {
            await this.fetchClients(routes[i])
        }
    }
    
    async fetchClients (routenum) {
        let info = {
            site: "SLO",
            route: routenum
        }
        let response = await fetch(env.backendURL + 'clients/routeSiteClients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        // let new_clients = this.state.clients
        
        this.setState({clients: [...this.state.clients, data]}) 
        return data;
    }

    render() {
        let routes = [1,2,3,4,5,6,7,8,9]

        return (
            <div style={{marginTop: "200px"}}>
                <div>Site Manager Homepage</div>
                {this.state.clients.map((route, i) =>{
					return <RoutePage routenum={routes[i]} data={route}/>
				})}
            </div>
        );
    }
}

export default SiteManagerHomepage;

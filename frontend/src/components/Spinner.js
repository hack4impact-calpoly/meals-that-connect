import React, { Component } from 'react';

class Spinner extends Component {
    render() {
        return (
            <div style={{width: '100vw', height: '100vh', zIndex: 1000, position: "absolute", top: 0, left: 0, backgroundColor: 'white', }}>
                <div class="loader"></div>
            </div>
        );
    }
}

export default Spinner;
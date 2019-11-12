import React, { Component } from 'react';

class Marvel extends Component {
    state = {
        ts:"hola",
        hash:"69b0d8685a253ac40e67516034d8982b",
        publi:"53ea5bbcf4e3f8a44df8ba64318ee282",
        private: "2cea7cb09a13de304b08442a5f0cf68ae8efb5ca",
        info: ""
    };
    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('info') === null)
                this.setState({ info: "loading..." })
            else
                this.setState({ info: localStorage.getItem('info') });
        }
      
        fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.ts}&hash=${this.state.hash}&apikey=${this.state.publi}`)
          .then(res => {
              return res.json();
          }).then(res => {
              this.setState({ info: res.value.data });
              localStorage.setItem('info', res.value.data);
          });
      }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Marvel;
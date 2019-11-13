import React, { Component } from 'react';

class Marvel extends Component {
    state = {
        ts: "hola",
        hash: "69b0d8685a253ac40e67516034d8982b",
        publi: "53ea5bbcf4e3f8a44df8ba64318ee282",
        private: "2cea7cb09a13de304b08442a5f0cf68ae8efb5ca",
        info: []
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
                this.setState({ info: res.data.results });
                localStorage.setItem('info', res.data.results);
            });
    }
    renderCarrousel() {
        let arr = [];
        let i = 0;
        for (let objeto of this.state.info) {
            if (i === 0) {
                arr.push(<div key={i} className="carousel-item active">
                    <img className="d-block img-fluid" src={objeto.thumbnail.path +"."+ objeto.thumbnail.extension} alt={objeto.name} />
                </div>);
            }
            else{
                arr.push(<div key={i} className="carousel-item">
                    <img className="d-block img-fluid" src={objeto.thumbnail.path + "."+objeto.thumbnail.extension} alt={objeto.name} />
                </div>);
            }
            i++;
        }
        return arr;
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                {this.renderCarrousel().map((e) => {
                                    return e;
                                })}
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Marvel;
import React, {Component} from 'react';
import axios from 'axios';

class Anuncio extends Component{
    constructor(props){
        super(props);
        this.state = {
            anuncio: [],
            isLoading: true
        };
        const id = this.props.props.match.params.idAnuncio;
        const Url = `https://mercadodev-30cdc.firebaseio.com/anuncios/${id}.json`;
        console.log(Url);
        axios
        .get(Url)
        .then(data=>{
            this.setState({anuncio: data.data, isLoading: false})
        })
    }

    render(){
        const anuncio = this.state.anuncio;

        if(this.state.isLoading){
            return <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        }

        return(
            <div>
                <h1>{anuncio.nome}</h1>
                <p><img src={anuncio.foto} className="img-responsive" /></p>
            </div>
        )
    }
}

export default Anuncio;


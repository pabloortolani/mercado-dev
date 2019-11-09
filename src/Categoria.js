import React, {Component} from 'react';
import axios from 'axios';
import AnuncioHome from   './AnuncioHome';

class Categoria extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            anuncios: {},
            isLoading: false
        };

        this.loadAnuncios = this.loadAnuncios.bind(this);
        this.loadAnuncios(this.props.match.params.urlCategoria);
    }

    loadAnuncios(urlCategoria){
        //Carrega Dados
        this.setState({isLoading:true, anuncios:{}});
        const url = `https://mercadodev-30cdc.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22${urlCategoria}%22`;
        axios
        .get(url)
        .then(data=> {
            this.setState({anuncios:data.data, isLoading: false});
            this.categoria = urlCategoria;
        })
    }

    componentWillReceiveProps(newProps){
        //Se teve atualização nessa props
        if(newProps.match.params.urlCategoria){
            //Se a categoria alterada for diferente da atual
            if(this.categoria !== newProps.match.params.urlCategoria){
                //Chama load anuncios novamente
                this.loadAnuncios(newProps.match.params.urlCategoria);
            }
        }
    }

    render(){
        return (
            <div>
                <h1>
                    Categoria: {this.props.match.params.urlCategoria}
                </h1>
                {this.state.isLoading === true && 
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                }
                {Object.keys(this.state.anuncios).length === 0 && this.state.isLoading === false  &&
                    <p>Nenhum produto cadastrado.</p>
                }
                <div className="row">
                    {Object.keys(this.state.anuncios).map(key => {
                        const anuncio = this.state.anuncios[key];
                        return (<AnuncioHome key={key} id={key} anuncio={anuncio} />)
                    })}
                </div>
            </div>
        )
    }

}

export default Categoria;
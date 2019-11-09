import React, {Component} from 'react';

import AnuncioHome from './AnuncioHome';
import LinkCategoria from './LinkCategoria';
import HeaderHome from './HeaderHome';
import base from './base';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            anuncios: []
        };
        base.bindToState('anuncios',{
            context: this, // Contexto
            state: 'anuncios', //Nome do estado que é para guardar o resultado vindo do banco de dados
            queries: {
            limitToLast:3 //Limita a qtd de resultados
            }
        })
    }
    render(){
        let index = 0;
        return (
            <div>
                <HeaderHome />
                <div className="container">
                    <h3>Últimos Anúncios</h3>
                    <div className="row">
                    {Object.keys(this.state.anuncios) .map(key=>{
                        const anuncio = this.state.anuncios[key];
                        return <AnuncioHome key={key} anuncio={anuncio} id={key} />
                    })}
                    </div>
                    <h3>Categorias</h3>
                    <div className="row">
                    {this.props.categorias.map((cat, indice) => {
                        return [
                            <LinkCategoria categoria={cat} key={indice} />,
                            ++index%4 === 0 && <div className="w-100" key={'c'+indice}></div>
                        ]
                    })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
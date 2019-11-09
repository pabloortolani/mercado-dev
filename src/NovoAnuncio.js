import React, {Component} from  'react';
import HeaderInterno from  './HeaderInterno'
import base, {storage} from './base';
import {Redirect} from 'react-router-dom';

class NovoAnuncio extends Component{
    constructor(props){
        super(props);
        this.state = {
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        //Pega o arquivo do formulário
        const file = this.foto.files[0];
        //Pega o name e tamanho da foto
        const {name, size} = file;
        //Cria a referencia para enviar para o storage
        const ref = storage.ref(name);

        //Envia para o storage
        ref.put(file).then(img => {
            //console.log("IMG", img);
        })
        
        ref.getDownloadURL().then(img => {
            console.log("IMG", img)
            /* Caso a foto seja enviada com sucesso para o
            storage prossegue com o cadastro do anuncio */
            const novoAnuncio = {
                nome: this.nome.value,
                descricao: this.descricao.value,
                preco: this.preco.value,
                vendedor: this.vendedor.value,
                foto: img,
                telefone: this.telefone.value,
                categoria: this.categoria.value
            }

            //Salva o anuncio
            base.push('anuncios', {
                data: novoAnuncio
            }).then(() => {
                this.setState({success: true})
            });
        })
        e.preventDefault();
    }
    render(){
        if(this.state.success){
            return <Redirect to='/' />
        }
        return(
            <div>
                <HeaderInterno />
                <div className='container' style={{paddingTop: '120px'}}>
                    <h1>Novo Anuncio</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='foto'>Foto</label>
                            <input type='file' className='form-control' id='foto' placeholder='Foto' ref={((ref)=>this.foto=ref)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nome'>Nome</label>
                            <input type='text' className='form-control' id='nome' placeholder='Nome' ref={((ref)=>this.nome=ref)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='categoria'>Categorias</label>
                            <select ref={(ref)=>this.categoria=ref} >
                                {this.props.categorias.map(cat=> <option key={cat.url} value={cat.url}>{cat.categoria}</option>)}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='descricao'>Descrição</label>
                            <input type='text' className='form-control' id='descricao' placeholder='Descrição' ref={((ref)=>this.descricao=ref)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='preco'>Preço</label>
                            <input type='text' className='form-control' id='preco' placeholder='Preço' ref={((ref)=>this.preco=ref)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='telefone'>Telefone</label>
                            <input type='text' className='form-control' id='telefone' placeholder='Telefone' ref={((ref)=>this.telefone=ref)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='vendedor'>Vendedor</label>
                            <input type='text' className='form-control' id='vendedor' placeholder='Vendedor' ref={((ref)=>this.vendedor=ref)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Salvar Anúncio</button>
                    </form>
                </div>
            </div>
            
        )
    }
}

export default NovoAnuncio;


import { useState } from "react";
import { FiSearch } from "react-icons/fi"
import './style.css';
import api from "./services/api";
function App() {

  const [input, setInput] = useState('') ///input e o nome que eu escolhi setinput e a funcao utilizo usestate para um acao que e o resultado 123

  const [cep, setcep] = useState({}); // criou um objeto vazio para ser preenchido depois com os dados do json

  async function handlesearch() {
    //   01310930/json/

    if (input === "") {
      alert('preencher com algum CEP!');
      return;
    }
    /// o que vc quer fazer e  catch se caso der errado
    try {

      const response = await api.get(`${input}/json`)
      setcep(response.data);
      setInput('')

    }
    catch {
      alert('Ops Erro ao buscar')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title"> buscador de CEP</h1>

      <div className="containerInput">
        <input type='text' placeholder='Digite seu CEP' value={input}
          onChange={(e) => setInput(e.target.value)}>


        </input>
        <button className="buttonsearch" onClick={handlesearch}>
          <FiSearch size={20} color="#fff" />
        </button>
        
      </div>
      <h1>unico cep cadastrado: 01310930</h1>

      {Object.keys(cep).length > 0 && ( /// aqui ele vai contar quantos ceps eu tenho se for maior que 0 ele nao mostra a main
        <main className="main">

          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>localidade:{cep.localidade}</span>




        </main>
      )}



    </div>
  );
}

export default App;

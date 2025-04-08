import React, { useState } from "react";
import Card from "./ProdutoCard";

const ProdutoCard = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [info, setInfo] = useState('');

    // const [produto, setProduto] = useState([
    //     {id: 1, 
    //     name:'Produto1', 
    //     preco: 10, 
    //     info: "Lorem Ipsum is simply du setting industry",
    //     },

    //     {id: 2, 
    //     name:'Produto2', 
    //     preco: 20, 
    //     info: "Lormmy text of the printing and types industry",
    //     },

    //     {id: 3, 
    //     name:'Produto3', 
    //     preco: 30, 
    //     info: "Lormmy text of theing and industry",
    //     },
    // ]);

    const [card, setCard] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const handleSave = () => {
        if (nome.trim() === "" || preco.trim() === "" || info.trim() === "") {
            alert("Todos os campos precisam ser preeenchidos.");
            return;
        }

        if (editingId !== null) {
            setCard(
                card.map((cards) =>
                    cards.id === editingId? { ...nome, preco, info } : nome
                )
            );
            setEditingId(null);
        } else {
            setCard([ ...card, { id: Date.now(), nome, preco, info }]);
        }

        setNome("");
        setPreco("");
        setInfo("");
    };

    const handleEdit = (id) => {
        const cardToEdit = card.find((cards) => cards.id === id)
        setNome(cardToEdit.nome)
        setPreco(cardToEdit.preco)
        setInfo(cardToEdit.info)
        setEditingId(id)
    };

    const handleDelete = (id) => {
        setCard(card.filter((cards) => cards.id !== id));
    };

return(
    <>
    <h1>Produtos</h1>
    <input
    type="text"
    value={nome}
    onChange={(e) =>setNome(e.target.value)}
    placeholder = "Nome Produto">
    </input>

    <input
    type="number"
    value={preco}
    onChange={(e) =>setPreco(e.target.value)}
    placeholder = "Preço">
    </input>

    <input
    type="text"
    value={info}
    onChange={(e) =>setInfo(e.target.value)}
    placeholder = "Descrição">
    </input>
    
    <button onClick={handleSave}>
        {editingId !=null? "Salvar alterações": "Adicionar ao carrinho"}
    </button>
    <div>
        <h3>Lista de produtos</h3>
        <ul>
            {card.map((cards) => (
                <li key = {cards.id}>
                    <p>Nome: {cards.nome}</p>
                    <p>Preço: {cards.preco}</p>
                    <p>Info: {cards.info}</p>
                    <Card/>
                    <button onClick= {() => handleEdit(cards.id)}>Editar</button>
                    <button onClick= {() => handleDelete(cards.id)}>Excluir</button>
                </li>
            ))}
        </ul>
    </div>

    </>
)
};
export default ProdutoCard;
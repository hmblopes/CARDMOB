import React from "react";
import ProdutoCard from "./ProductList";

const Card = ({card}) => {
    return (
        <>
            {/* <h1>Nome: {card.nome} </h1>
            <p>Preço: {card.preco} </p>
            <p>info {card.info} </p> */}
            <button>Adicionar ao carrinho</button>
        </>
    );
};

export default Card;
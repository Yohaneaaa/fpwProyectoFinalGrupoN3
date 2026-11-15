import React from 'react';

const AnimalCard = ({ animal, onClick }) => {
    return (
        <div className="tarjeta-animal" onClick={onClick}>
            <span className="emoji">{animal.emoji}</span>
            <span className="nombre">{animal.nombre}</span>
        </div>
    );
};

export default AnimalCard;
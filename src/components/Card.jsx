import React, {useEffect, useState } from 'react'
import styled from 'styled-components'
import { FcSimCardChip } from "react-icons/fc";
import mastercard from "../assets/mastercard.png"
function Card() {

      const [cards, setCards] = useState([]);

      console.log(cards.length);

      useEffect(() => {
        const fetchCards = async () => {
          try {
            const token = localStorage.getItem("token");

            if (!token) {
              throw new Error("Token de autenticación no encontrado");
            }

            const response = await fetch("http://localhost:3000/api/cards", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              throw new Error(
                `Error al obtener tarjetas: ${response.statusText}`
              );
            }

            const data = await response.json();
            setCards(data.cards);
          } catch (error) {
            console.error(error.message);
          }
        };

        fetchCards();
      }, []);

    
    return (
      <Section>
        {cards.map((card) => (
          <div className="shopping">
            <div className="design">
              <FcSimCardChip />
            </div>

            <div className="number">
              <h6>{card.numero ?? ""}</h6>
            </div>
            <div className="image">
              <img src={mastercard} className="pic" />
            </div>
            <div className="name">
              <h6>DÉBITO</h6>
            </div>
            <div className="profile">
              <h6>{(card.nombre).toUpperCase() ?? ""}</h6>
              <span className="t1">Mastercard</span>
            </div>
          </div>
        ))}
      </Section>
    );
}

export default Card
const Section = styled.section`
.shopping {
    padding: 0.8rem 0.8rem 0.8rem 0.8rem;
    border-radius: 1rem;
    color: black;
    background-color: #22202B;
    align-items: center;
    gap: 0.5rem;
    transition: 0.5s ease-in-out;
    &:hover {
        background-color: blue;
        color: black;
        svg {
            color: black;
        }
    }
    .design{
        display: flex;
        svg{
            font-size: 2rem;
            color: white;
        }
    }
    .number {
        gap: 0.5rem;
        margin-top: 10px;
        h6{
            color: white;
            font-size: 1rem;
        }
    }
    .image{
        display: flex;
        height: 2.5rem;
        width: 2.5rem;
        margin-left: 12rem;
    }
    .name {
        display: flex;
        gap: 0.5rem;
    }
    h6{
        color: grey;
        font-size: 0.6rem;
    }
}
.profile{
    width: 100%;
    display: flex;
    align-items: left;
    gap: 5rem;
    justify-content: space-evenly;
    margin-top: 10px;
    align-items: center;
    span, h6{
        color: white;
    }
}
`;

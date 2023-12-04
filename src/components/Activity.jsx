import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { AiOutlineDollarCircle } from "react-icons/ai";


function Activity() {

      const [transactions, setTransactions] = useState([]);

      useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const token = localStorage.getItem("token");

            if (!token) {
              throw new Error("Token de autenticación no encontrado");
            }

            const response = await fetch(
              "http://localhost:3000/api/obtain-transaction",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(
                `Error al obtener tarjetas: ${response.statusText}`
              );
            }

            const data = await response.json();
            setTransactions(data.transactions);
          } catch (error) {
            console.error(error.message);
          }
        };

        fetchTransactions();
      }, []);
      console.log(transactions);

      
    return (
      <Section>
        <div className="title">
          <h4>Actividades recientes</h4>
          {transactions.length === 0 && <h6>No hay transacciones</h6>}
        </div>
        {transactions.map((transaction) => (
          <a style={{textDecoration: "none"}} href="/add-mov">
            <div className="analytic ">
              <div className="design">
                <div className="logo">
                  <AiOutlineDollarCircle />
                </div>
                <div className="content">
                  <h5>{transaction.nombre}</h5>
                  <h6 className="color">{transaction.estatus}</h6>
                </div>
              </div>
              <div className="money">
                <h5>
                  $
                  {parseFloat(transaction.saldoAPagar)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0.0}{" "}
                </h5>
              </div>
            </div>
          </a>
        ))}
      </Section>
    );
}

export default Activity
const Section = styled.section `
    display: grid;
    gap: 0.2rem;
    .title{
        margin-left: 15px;
        h4{
            font-weight:bold;
        }
        h6{
            color: grey;
        }
    }
    .analytic {
        padding: 0.3rem 0.8rem 0.3rem 1.2rem;
        
        color: black;
        justify-content: space-evenly;
        align-items: center;
        gap: 1rem;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #F5F5FD;
            color: black;
            svg {
                color: black;
            }
        }
        float: both;
        .design{
            display: flex;
            align-items: center;  
            gap:1rem;
            .logo{
                background-color: white;
                border-radius: 1rem;
                border: 1px solid white;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.5rem;
                svg{
                    font-size: 1.5rem;
                }

            }
            .color{
                color: grey
            }
        }
        .money{
            h5{
                float: right;
                margin-top: -30px;
            }
        }
        
        
        
    }
    
`;

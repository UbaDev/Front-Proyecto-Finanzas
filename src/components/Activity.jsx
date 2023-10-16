import React from 'react'
import styled from 'styled-components'
import { AiOutlineDollarCircle } from "react-icons/ai";


function Activity() {
    return (
        <Section>
            <div className='title'>
                <h4>Actividades recientes</h4>
                <h6>Fecha</h6>
            </div>
        <div className="analytic ">
            <div className="design">
                <div className="logo">
                        <AiOutlineDollarCircle />
                </div>
                <div className="content">
                    <h5>Cuenta de agua</h5>
                    <h5 className='color'>Pagada</h5>
                </div>
               
            </div>
            <div className="money">
                    <h5>$120.00</h5>
                </div>
          
        </div>
    </Section>
    )
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

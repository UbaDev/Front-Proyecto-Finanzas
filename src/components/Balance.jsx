import React, { useState, useEffect } from 'react'
import { BarChart, LineChart, Bar, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from "styled-components";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
function Balance() {

  
   const [data, setData] = useState([]);
   const [filter, setFilter] = useState("all"); 

   useEffect(() => {
     fetch("http://localhost:3000/api/grafica?filter=${filter}")
       .then((response) => response.json())
       .then((graficaData) => setData(graficaData))
       .catch((error) =>
         console.error("Error al obtener datos de grafica:", error)
       );
   }, [filter]);
   console.log(filter)

    const handleFilterChange = (newFilter) => {
      setFilter(newFilter);
    };

    return (
      <Section>
        <div className="sales">
          <div className="sales__details">
            <div>
              <h4>Estado de cuneta</h4>
            </div>
            <div>
              <h5>Todos los movimientos</h5>

            </div>
          </div>
          <div className="sales__graph">
            <ResponsiveContainer width="100%" height="250%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="pv" stackId="a" fill="#14121F" />
                <Line dataKey="name" stackId="a" fill="#E5E5F1" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>
    );
}

export default Balance

const Section = styled.section`
.sales{
    color: black;
    width: 100%;
    .sales__details {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
        div{
            display: flex;
            gap: 1rem;
            h5{
                color: gray;
            }
        }
    }
    .sales__graph{
        height: 10rem;
        width: 100%;
        .recharts-default-tooltip {
            background-color: black !important;
            border-color: black !important;
            color: white !important;
        }
    }
}

`;

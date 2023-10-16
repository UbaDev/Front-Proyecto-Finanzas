import React from 'react'
import { BarChart, LineChart, Bar, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from "styled-components";
function Balance() {
    return (
        <Section>
            <div className="sales">
                <div className="sales__details">
                    <div>
                        <h4>Estado de cuneta</h4>
                    </div>
                    <div>
                        <h5>Últimos 30 días</h5>
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
                        <Line dataKey="uv" stackId="a" fill="#E5E5F1" />
                     </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Section>
    )
}

export default Balance
const data = [
    {
      name: 'Página A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Página B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Página C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Página D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Página E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Página F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Página G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
{
    name: 'Página H',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Página I',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Página J',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Página K',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },



  ];
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

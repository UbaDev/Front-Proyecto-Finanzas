import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { BsCreditCard } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { BsBank } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";


function Analytic() {
      const [open2, setOpen2] = React.useState(false);
      const [newSaldo, setNewSaldo] = useState(0);


      const handleClickOpen2 = () => {
        setOpen2(true);
      };

      const handleClose2 = () => {

        setOpen2(false);
      };
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };
    
      const [cards, setCards] = useState([]);
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

const updateCardBalance = async (cardId, nuevoSaldo) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticación no encontrado");
    }

    const apiUrl = `http://localhost:3000/api/cards/${cardId}/update-balance`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(apiUrl, { nuevoSaldo }, { headers });

    console.log("Respuesta del servidor:", response.data);

    window.location.reload();

    return response.data;
  } catch (error) {
    console.error("Error en updateCardBalance:", error.message);
    throw error; // Puedes manejar el error de la manera que prefieras
  }
};


    return (
      <Section>
        {cards.map((card) => (
          <div className="analytic ">
            <Dialog open={open2} onClose={handleClose2}>
              <DialogTitle>Actualizar saldo</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Digita el nuevo saldo de la tarjeta
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nuevo saldo"
                  type="number"
                  fullWidth

                    onChange={(e) => setNewSaldo((e.target.value))}
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2}>Cancelar</Button>
                <Button onClick={() => {
                    updateCardBalance(card.id, newSaldo.toLocaleString("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }));
                    handleClose2();
                    handleClose()
                }}>Guardar</Button>
              </DialogActions>
            </Dialog>
            <div className="design">
              <div className="logo">
                <BsCreditCard />
              </div>
              <div className="action">
                <Button
                  style={{
                    backgroundColor: "trasparent",
                    right: 22,
                    color: "black",
                    hover: "none",
                  }}
                  id="basic-button"
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  disableTouchRipple
                  focusRipple={false}
                  hoverRipple={false}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AiOutlineMore />
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClickOpen2}>Actualizar saldo</MenuItem>
                </Menu>
              </div>
            </div>
            <div className="transfer">
              <h6>Mi saldo actual</h6>
            </div>
            <div className="money">
              <h5> 
               ${parseFloat(card.saldo).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0.00} 
              </h5>
            </div>
          </div>
        ))}


      </Section>
    );
}

export default Analytic
const Section = styled.section `
    display: flex;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    margin: 0 60px;
    .analytic {
        justify-content: space-between;
        padding: 1rem 2rem 1rem 2rem;
        border-radius: 1rem;
        color: black;
        background-color: white;
        justify-content: space-evenly;
        align-items: center;
        transition: 0.5s ease-in-out;
        width: 170px;
       
        .design{
            display: flex;
            align-items: center;
            
            .logo {
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
               
                svg {
                    font-size: 2rem;
                }
            }
            .action {
                margin-left: 80px;
               svg{
                font-size: 1.5rem;
               }
            }

        }
        .transfer {
            margin-top: 20px;
            color: grey
        }
        .money {
            margin-top: 20px;  
        }
    }
`;
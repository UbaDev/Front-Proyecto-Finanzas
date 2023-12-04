import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatarImage from "../assets/bear.png"
function Notification() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteToken = () => {
        localStorage.removeItem('token')
        window.location.href = '/';
    }

    const [displayName, setDisplayName] = useState("");

    useEffect(() => {

      const getUserData = async () => {
        try {
             const token = localStorage.getItem("token");

             if (!token) {
               throw new Error("Token de autenticación no encontrado");
             }


          const response = await fetch(
            "http://localhost:3000/api/user",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al obtener datos del usuario.");
          }

          // Parsear la respuesta JSON
          const data = await response.json();

          // Actualizar el estado con el displayName del usuario
          setDisplayName(data.displayName);
        } catch (error) {
          console.error("Error en getUserData:", error.message);
          // Manejar el error según sea necesario
        }
      };

      // Llamar a la función para obtener datos del usuario al cargar el componente
      getUserData();
    }, []);


    return (
        <Nav>
            <div className="notification">
                <div className="image">
                    <img src={avatarImage} />
                    <span style={{alignSelf: "center"}}>{displayName}</span>
                </div>

                

                <Button
                    
                    style={{ backgroundColor: "trasparent", right: 22, hover: "none" }}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <AiOutlineCaretDown />
                </Button>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={deleteToken}>Cerrar sesión</MenuItem>
                </Menu>

            </div>
        </Nav>
    )
}

export default Notification
const Nav = styled.nav`
display: flex;
justify-content: space-between;
justify-content: right;
align-items: center;
.notification{
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
    .font_icon{
        font-size: 1.5rem;
    }
    svg{
        color: grey;
    }
    .image {
        display: flex;
        gap: 1rem;
        img{
            height: 2.5rem;
            width: 2.5rem;
            border-radius: 3rem;
        }
    }
}
`;

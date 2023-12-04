import React, { useState } from 'react';
import signImage from "../assets/sign.png"
import logoApp from "../assets/logoApp.png"
import styled from 'styled-components'
import { BiSearch } from 'react-icons/bi'
import { BiMailSend } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const LoginForm = () => {
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo electrónico no válido').required('Correo electrónico es obligatorio'),
      password: Yup.string().required('Contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          setAlertType('success');
          setAlertMessage('Inicio de sesión exitoso:\n' + JSON.stringify(data, null, 2));

          window.location.href = '/';

        } else {
          const errorData = await response.json();
          setAlertType('error');
          setAlertMessage('Error en el inicio de sesión:\n' + JSON.stringify(errorData, null, 2));
        }
      } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
      }
    },
  });


  const containerStyle = {
    display: 'flex',
    height: '100vh',
  };

  const formStyle = {
    width: "50%",
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const imageContainerStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const imageStyle = {
    height: "100%",
    width:"80%"
  };
  const imageLogo = {
    height: 100,
    width:100,
    marginRight: 30
  };
  const header = {
    display: "flex",
    alignItems: "center",
    marginLeft: 40,
  }

  const titles = {
    marginTop: 50,
    marginLeft: 50,
  }
  const title = {
  }
  const subtitle = {
    marginTop: 20,
    fontWeight: "500", 
    color: "gray"
  }

  const cuenta = {
    color: "gray",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  }
  const link = {
    color: "black",
    fontSize: 14,
    marginTop: 20,
    textDecoration: "none",
    cursor: "pointer",
  }

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <div style={header}>
          <img
            src={logoApp}
            alt="Imagen"
            style={imageLogo}
          />
          <h2>Finanzas</h2>
        </div>

        <div style={titles}>
          <h1 style={title}>Bienvenido de nuevo</h1>
          <p style={subtitle}>Por favor ingresa tus credenciales</p>
        </div>

        <Form>

          <form onSubmit={formik.handleSubmit}>
            <div className="search">
              <BiMailSend style={{ width: 30, height: 30 }} />
              <input
                type="email"
                placeholder="Correo electrónico"
                style={{ fontSize: 16 }}
                {...formik.getFieldProps('email')}
              />
              
            </div>
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            )}
            <div className="search">
              <BiHide style={{ width: 30, height: 30 }} />
              <input
                type="password"
                placeholder="Contraseña"
                style={{ fontSize: 16 }}
                {...formik.getFieldProps('password')}
              />
              
            </div>
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            )}

            <button type="submit" className="buttonLogin">
              Iniciar sesión
            </button>

            <div className="bottom">
              <span style={cuenta}>¿Aún no tienes una cuenta? </span>
              <a style={link} href="/register">
                {' '}
                Registrarme
              </a>
            </div>
          </form>
        </Form>



      </div>
      <div style={imageContainerStyle}>
        <img
          src={signImage}
          alt="Imagen"
          style={imageStyle}
        />
      </div>

      <Stack sx={{ width: '100%', position: 'absolute', top: 0 }} spacing={2}>
        {alertType === 'success' && (
          <Alert severity="success" onClose={() => setAlertType(null)}>
            {alertMessage}
          </Alert>
        )}
        {alertType === 'error' && (
          <Alert severity="error" onClose={() => setAlertType(null)}>
            {alertMessage}
          </Alert>
        )}
      </Stack>
    </div>
  );

};


const Form = styled.nav`
.bottom {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-left: 70px;
  gap: 5px;
}
.buttonLogin{
  cursor: pointer;
  width: 100%;
  margin-left: 50px;
  margin-top: 30px;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background-color: #C7EE44;
  font-weight: bold;
}
    .search {
        background-color: white;
        margin-top: 30px;
        margin-left: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        gap: 1rem;
        padding: 1rem 8rem 1rem 1rem;
        border-radius: 8px;
         border: 1px solid grey;
        svg{
            color: grey;
        }
        input{
            background-color: transparent;
            border: none;
            width: 100%;
            color: grey;
            &:focus{
                outline: none;
            }
            &::placeholder {
                color: grey;
            }
        }
    }

`;

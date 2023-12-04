import React, {useState} from 'react';
import signImage from "../assets/sign.png"
import logoApp from "../assets/logoApp.png"
import styled from 'styled-components'
import { BiSearch } from 'react-icons/bi'
import { BiMailSend } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { useHistory } from 'react-router-dom';
import { BiRename } from 'react-icons/bi'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



export const RegisterForm = () => {
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const validationSchema = Yup.object({
        nombre: Yup.string().required('Nombre es obligatorio'),
        correo: Yup.string().email('Correo electrónico inválido').required('Correo es obligatorio'),
        contrasena: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .matches(/\d/, 'La contraseña debe contener al menos un número')
            .required('Contraseña es obligatoria'),
    });


    // Inicializar el formulario con useFormik
    const formik = useFormik({
        initialValues: {
            nombre: '',
            correo: '',
            contrasena: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Enviar los datos al servidor para el registro
            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        displayName: values.nombre,
                        email: values.correo,
                        password: values.contrasena,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setAlertType('success');
                    setAlertMessage('Registro exitoso:\n' + JSON.stringify(data, null, 2));
                    values.nombre = '';
                    values.correo = '';
                    values.contrasena = '';
                } else {
                    const errorData = await response.json();
                    setAlertType('error');
                    setAlertMessage('Error en el registro:\n' + JSON.stringify(errorData, null, 2));
                }
            } catch (error) {
                console.error('Error en la solicitud de registro:', error);
            }
        },
    });



    const containerStyle = {
        display: 'flex',
        height: '100vh',
    };

    const formStyle = {
        width: "50%",
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
        width: "80%"
    };
    const imageLogo = {
        height: 100,
        width: 100,
        marginRight: 30
    };
    const header = {
        display: "flex",
        alignItems: "center",
        marginLeft: 40,
        marginTop: 40,
    }

    const titles = {
        marginTop: 40,
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
                    <h1 style={title}>Bienvenido</h1>
                    <p style={subtitle}>Por favor ingresa tus datos para el registro</p>
                </div>

                <Form >
                    <form onSubmit={formik.handleSubmit}>
                        <div className="search">
                            <BiRename style={{ width: 30, height: 30 }} />
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                style={{ fontSize: 16 }}
                                {...formik.getFieldProps('nombre')}
                            />
                        </div>
                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div style={{ color: 'red' }}>{formik.errors.nombre}</div>
                        ) : null}

                        <div className="search">
                            <BiMailSend style={{ width: 30, height: 30 }} />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                style={{ fontSize: 16 }}
                                {...formik.getFieldProps('correo')}
                            />
                        </div>
                        {formik.touched.correo && formik.errors.correo ? (
                            <div style={{ color: 'red' }}>{formik.errors.correo}</div>
                        ) : null}

                        <div className="search">
                            <BiHide style={{ width: 30, height: 30 }} />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                style={{ fontSize: 16 }}
                                {...formik.getFieldProps('contrasena')}
                            />
                        </div>
                        {formik.touched.contrasena && formik.errors.contrasena ? (
                            <div style={{ color: 'red' }}>{formik.errors.contrasena}</div>
                        ) : null}

                        <button type="submit" className="buttonLogin">
                            Registrarme
                        </button>

                        <div className="bottom">
                            <span style={cuenta}>¿Ya tienes una cuenta? </span>
                            <a style={link} href="/login">
                                {' '}
                                Inicia sesión
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

                {alertType === 'success' && (
                    <Alert severity="success" onClose={() => setAlertType(null)}>
                        Ya puedes iniciar sesión
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
  width: 100%;
  margin-left: 50px;
  margin-top: 30px;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background-color: #C7EE44;
  font-weight: bold;
  cursor: pointer;
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

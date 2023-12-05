import React, { useState, useEffect } from "react";
import { BiPlusCircle } from "react-icons/bi";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";


export const FormAddCard = () => {
  const [cards, setCards] = useState([]);
  const [eliminar, setEliminar] = useState(false);
  const [agregar, setAgregar] = useState(false);
  

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
          throw new Error(`Error al obtener tarjetas: ${response.statusText}`);
        }else {

        }
        

        const data = await response.json();
        setCards(data.cards);

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCards();
  }, []);

  const containerStyle = {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
  };

  const formStyle = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };


  async function handleDeleteCard(cardId) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token de autenticación no encontrado");
      }
      const response = await fetch(
        `http://localhost:3000/api/cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al borrar la tarjeta: ${response.statusText}`);
      } else {
        setEliminar(true);
      }

      const data = await response.json();
      console.log(data.message);
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={containerStyle}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {eliminar && (
          <Alert severity="success">Tarjeta eliminada correctamente</Alert>
        )}

      </Stack>
      {cards.map((card) => (
        <div key={card.id}>
          <Card sx={{ minWidth: 375 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Tarjeta registrada
              </Typography>
              <Typography variant="h5" component="div">
                {card.nombre}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {card.numero.replace(/(\d{4})/g, '$1 ')}
              </Typography>

              <Typography sx={{ mb: 0 }} color="text.secondary">
                {card.fecha}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                style={{ color: "red" }}
                onClick={() => handleDeleteCard(card.id)}
                size="small"
              >
                Eliminar tarjeta
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}

      <div style={!cards.length ? formStyle : { display: "none" }}>
        {NestedModal()}
      </div>
    </div>
  );
};
const NestedModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Campo requerido"),
    numero: Yup.string()
      .length(16, "Debe tener 16 dígitos")
      .required("Campo requerido"),
    fecha: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/YY)")
      .required("Campo requerido"),
    numeroSeguridad: Yup.string()
      .length(3, "Debe tener 3 dígitos")
      .required("Campo requerido"),
    saldo: Yup.number()
      .min(0, "El saldo debe ser mayor o igual a 0")
      .required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      numero: "",
      fecha: "",
      numeroSeguridad: "",
      saldo: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token de autenticación no encontrado");
        }
        const response = await fetch("http://localhost:3000/api/uploadCard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        console.log(response);

        if (!response.ok) {
          const errorData = await response.json();
          setAlertType("error");
          setAlertMessage(
            "Error en el registro:\n" + JSON.stringify(errorData, null, 2)
          );
        } else {
          setAlertType("success");
           setAlertMessage(
             "Tarjeta registrada correctamente")
           

          formik.values.nombre = "";
          formik.values.numero = "";
          formik.values.fecha = "";
          formik.values.numeroSeguridad = "";
          formik.values.saldo = "";

        }
        handleClose();
        
         setTimeout(() => {
           window.location.reload();
         }, 1000);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    borderRadius: 5,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 10,
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        Registrar tarjeta
        <BiPlusCircle style={{ marginLeft: 5 }} />
      </Button>

      <Stack sx={{ width: "100%", position: "absolute", top: 0 }} spacing={2}>
        {alertType === "success" && (
          <Alert severity="success" onClose={() => setAlertType(null)}>
            {alertMessage}
          </Alert>
        )}
        {alertType === "error" && (
          <Alert severity="error" onClose={() => setAlertType(null)}>
            {alertMessage}
          </Alert>
        )}
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <form>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "32ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <h2>Registra tu tarjeta</h2>

              <TextField
                id="nombre"
                label="Nombre de tarjeta"
                variant="outlined"
                size="large"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                required
              />
              <TextField
                id="numero"
                label="Numero de la tarjeta"
                variant="outlined"
                name="numero"
                value={formik.values.numero}
                onChange={formik.handleChange}
                error={formik.touched.numero && Boolean(formik.errors.numero)}
                helperText={formik.touched.numero && formik.errors.numero}
                required
              />
              <TextField
                id="fecha"
                label="Vencimiento de la tarjeta"
                variant="outlined"
                name="fecha"
                value={formik.values.fecha}
                onChange={formik.handleChange}
                error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                helperText={formik.touched.fecha && formik.errors.fecha}
                required
              />
              <TextField
                id="numeroSeguridad"
                label="Digitos de seguridad"
                variant="outlined"
                type="number"
                name="numeroSeguridad"
                value={formik.values.numeroSeguridad}
                onChange={formik.handleChange}
                error={
                  formik.touched.numeroSeguridad &&
                  Boolean(formik.errors.numeroSeguridad)
                }
                helperText={
                  formik.touched.numeroSeguridad &&
                  formik.errors.numeroSeguridad
                }
                required
              />

              <TextField
                id="saldo"
                label="Saldo de la tarjeta"
                variant="outlined"
                type="number"
                name="saldo"
                value={formik.values.saldo}
                onChange={formik.handleChange}
                error={formik.touched.saldo && Boolean(formik.errors.saldo)}
                helperText={formik.touched.saldo && formik.errors.saldo}
                required
              />

              <div style={{ alignItems: "center", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => formik.handleSubmit()}
                  disabled={!formik.isValid}
                >
                  Registrar tarjeta
                </Button>
              </div>
            </Box>
          </form>

          <img
            src="https://www.yamahacuernavaca.com.mx/wp-content/uploads/2019/11/Visa-MasterCard.png"
            alt="Imagen"
            style={{
              width: "100%",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

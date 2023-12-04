import React, { useState, useEffect } from "react";
import { BiPlusCircle } from "react-icons/bi";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const FormAddMov = () => {
  const [transactions, setTransactions] = useState([]);
   const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPartialModal, setOpenPartialModal] = useState(false);
  const [partialAmount, setPartialAmount] = useState("");
   const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
   const [selectedCardId, setSelectedCardId] = useState(null);
   const [estatus, setEstatus] = useState("");
   const [activo, setActivo] = useState(false);

   console.log("Esta es la id", activo)


   const handleOpen = (cardId, estatus) => {
     setSelectedCardId(cardId);
      setEstatus(estatus);
     setOpen(true);
   };

  const handleClose = () => {
    setOpen(false);
  };

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
          } else {
          }

          const data = await response.json();
          setCards(data.cards);
        } catch (error) {
          console.error(error.message);
        }
      };

      fetchCards();
    }, []);


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
          throw new Error(`Error al obtener tarjetas: ${response.statusText}`);
        }

        const data = await response.json();
        const filtered = transactions.filter((transaction) =>
          transaction.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTransactions(filtered);
        setTransactions(data.transactions);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTransactions();
  }, [ ]);

   const handleDeleteTransaction = async (transactionId) => {
     try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token de autenticación no encontrado");
        }
       const response = await fetch(
         `http://localhost:3000/api/transactions/${transactionId}`,
         {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         }
       );

       if (response.ok) {
         const updatedTransactions = transactions.filter(
           (transaction) => transaction.id !== transactionId
         );
         setTransactions(updatedTransactions);
         console.log("Transacción eliminada con éxito");
         window.location.reload();
       } else {
         console.error("Error al eliminar la transacción");
       }
     } catch (error) {
       console.error("Error en handleDeleteTransaction:", error.message);
     }
   };



       const handlePayTransaction = async (cardId, transactionId) => {
         try {
           const token = localStorage.getItem("token");

           if (!token) {
             throw new Error("Token de autenticación no encontrado");
           }

           const response = await fetch(
             `http://localhost:3000/api/cards/${cardId}/transactions/${transactionId}/pay`,
             {
               method: "PUT",
               headers: {
                 "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`,
               },
             }
           );

           if (response.ok) {
             setActivo(true);
             console.log("Transacción pagada con éxito");
             window.location.href = "/";
             alert("Transacción pagada con éxito");
            
           } else {
            alert("Error al pagar la transaccion, no se tiene el saldo suficiente")
             console.error(
               "Error al pagar la transacción:",
               response.statusText
             );
           }
         } catch (error) {
           // Manejar errores generales
           console.error("Error en handlePayTransaction:", error.message);
         }
       };


  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };


  return (
    <div style={containerStyle}>
      <TextField
        id="outlined-search"
        label="Buscar movimiento"
        type="search"
        style={{ marginBottom: 30, width: "100%" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredTransactions.map((card) => (
        <div key={card.id}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 330 }}>
              <form>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "32ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {cards.map((cards) => (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handlePayTransaction(cards.id, selectedCardId)
                      }
                      disabled={estatus === "Pagado"}
                    >
                      Pagar movimiento
                    </Button>
                  ))}

                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDeleteTransaction(selectedCardId)}
                  >
                    Eliminar movimiento
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>

          <Card
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
            sx={{ minWidth: 900 }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {card.nombre}
              </Typography>

              <Typography sx={{ mb: 0 }} color="text.secondary">
                {card.fecha}
              </Typography>

              <Typography sx={{ mb: 0 }} color="text.secondary">
                {card.estatus}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                $
                {parseFloat(card.saldoAPagar)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0.0}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                style={{
                  color: "blue",
                  borderWidth: 1,
                  borderColor: "#22202B",
                }}
                onClick={() => handleOpen(card.id, card.estatus)}
                size="small"
                color="primary"
              >
                Acciones
              </Button>
            </CardActions>
          </Card>
          <div style={{ color: "transparent" }}>c</div>
        </div>
      ))}

      <div>{NestedModal()}</div>
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
    estatus: Yup.string().required("Campo requerido"),
    fecha: Yup.string()
      .matches(
        /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
        "Formato inválido (DD/MM/AAAA)"
      )
      .required("Campo requerido"),
    saldoAPagar: Yup.number()
      .min(0, "El saldoAPagar debe ser mayor o igual a 0")
      .required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      fecha: "",
      estatus: "",
      saldoAPagar: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token de autenticación no encontrado");
        }
        const response = await fetch("http://localhost:3000/api/transactions", {
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
          formik.values.nombre = "";
          formik.values.fecha = "";
          formik.values.estatus = "";
          formik.values.saldoAPagar = "";
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        handleClose();
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
        Registrar movimientos
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
              <h2>Registra un movimiento</h2>

              <TextField
                id="nombre"
                label="Nombre del movimiento"
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
                id="fecha"
                label="Fecha de vencimiento del movimiento"
                variant="outlined"
                name="fecha"
                value={formik.values.fecha}
                onChange={formik.handleChange}
                error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                helperText={formik.touched.fecha && formik.errors.fecha}
                required
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="estatus-label">Estatus</InputLabel>
                <Select
                  id="estatus"
                  label="Estatus"
                  labelId="estatus-label"
                  name="estatus"
                  value={formik.values.estatus}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.estatus && Boolean(formik.errors.estatus)
                  }
                  required
                >
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="saldoAPagar"
                label="Costo del movimiento"
                variant="outlined"
                type="number"
                name="saldoAPagar"
                value={formik.values.saldoAPagar}
                onChange={formik.handleChange}
                error={
                  formik.touched.saldoAPagar &&
                  Boolean(formik.errors.saldoAPagar)
                }
                helperText={
                  formik.touched.saldoAPagar && formik.errors.saldoAPagar
                }
                required
              />

              <div style={{ alignItems: "center", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={formik.handleSubmit}
                  disabled={!formik.isValid}
                >
                  Registrar movimiento
                </Button>
              </div>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

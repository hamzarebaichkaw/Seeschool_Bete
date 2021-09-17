import 'date-fns';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers";
import {
  Grid, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core"
import useStyles from "./styles"
// components
import Widget from "../../../components/Widget"
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import MUIDataTable from "mui-datatables";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import axios from 'axios';
import DateFnsUtils from "@date-io/date-fns"
import { useDropzone } from 'react-dropzone'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers"
import * as Icons from "@material-ui/icons"


const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_GRID":
      return {
        ...state,
        toggleGrid: true
      };
    case "CLOSE_GRID":
      return {
        ...state,
        toggleGrid: false
      };
  }
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '100px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#dfe6e9',
  borderStyle: 'dashed',
  backgroundColor: '#3a86ff',
  color: '#dfe6e9',
  outline: 'none',
  width: "95%",
  height: 200,
  transition: 'border .24s ease-in-out',
  cursor: 'pointer'
};

const activeStyle = {
  borderColor: '#0E0D47',
  backgroundColor: '#dfe6e9',
  color: '#0E0D47'
};

const acceptStyle = {
  borderColor: '#0E0D47'
};

const rejectStyle = {
  borderColor: '#ff1744'
};



export default function HomeworksProfs() {




  // var [file_name,setfile] = useState ()
  function Basic() {
    const onDrop = useCallback(acceptedFiles => {
      const files = acceptedFiles.map(file => (
      
        setfile_name (file)
      
      ));
    }, [])
    const {
      acceptedFiles,
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject
    } = useDropzone({onDrop});
  
    const files = acceptedFiles.map(file => (
      <li key={file.path} >
        Fichier : {file.path}
      </li>
    ));
  
    const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isDragActive,
      isDragReject,
      isDragAccept
    ]);
   
    
  
    return (
      <section className="container">
        <div {...getRootProps({ className: 'dropzone', style })}>
          <input {...getInputProps()  } 
                 />
          <Icons.CloudUpload style={{ width: 100, height: 100 }} />
          <p style={{ alignSelf: 'center', fontSize: 25 }}>Drag/Drop ou cliquer pour ajouter votre cours</p>
        </div>
        <div style={{ marginTop: 5 }}>
          <ul style={{ listStyleType: 'none' }}>
            {files}
          </ul>
        </div>
      </section>
    );
  }
  












  const classes = useStyles();
  const [Titre, setTitre] = useState("")
  const [date_naissance, setdate_naissance] = useState("");
  const [profClasses, SetProfClasses] = useState([])
  const [profClasse, SetProfClasse] = useState("")
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2007-12-31")
)
  // const [description, setDescription] = useState('')
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

  useEffect(() => {
    getProfClasses()
  }, [])

  const getProfClasses = async () => {
     const current_prof = localStorage.getItem('user_id')
    setLoadingClasses(true)
    await axios
       .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/${current_prof}`)
     // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/15`)
      .then(res => {
        SetProfClasses(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingClasses(false)
  }
  const [distit, setdistit] = useState(true)
  const [disdn, setdisdn] = useState(true)
  const [disdesc, setdisdesc] = useState(true)
  const [dispc, setdispc] = useState(true)
  function verif() {
    var test = true
    if (Nom === "") {
      setdistit(false)
      test = false

    } else { setdistit(true) }

    if (selectedDate.getTime() === NaN) {
      setdisdn(false)
      test = false

    } else { setdisdn(false) }

    if (profClasse === "") {
      setdispc(false)
      test = false

    } else { setdispc(true) }

    if (description === "") {
      setdisdesc(false)
      test = false

    } else { setdisdesc(true) }

    return test

  }

  const [Homework, SetHomework] = useState([])

  useEffect(() => {
    Homeworkkks()
  }, [])

  const Homeworkkks = async () => {
    // const current_prof = sessionStorage.getItem('user_id')
    setLoadingConges(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/HomeWorkByprof/1/${current_prof}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/HomeWorkByprof/1`)
      .then(res => {
        SetHomework(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingConges(false)
  }


  const [loadingConges, setLoadingConges] = useState(false)

  const [dateFin, setDateFin] = useState('')
  const [Nom, setNom] = useState('')
  const [description, setDescriptionn] = useState('')
  const [file_name, setfile_name] = useState('')

  const ajouterHomework = async () => {
    // setLoading(true)
    await axios
      .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/devoires`, {
        "Name": Nom,
        "Remaque": description,
        "date_fin": selectedDate,
        "class": "/public/api/classes/1",
        // "Semestre": "En Cours"
        "media": [
          "/public/api/media_objects/8"
      ]
      })
      .then(async res => {
        console.log(res.data)
        dispatch({ type: "CLOSE_GRID" })
        const formData = new FormData();
        formData.append("file", file_name);
        formData.append("class", res.data.id);
         await axios
           .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, formData,
           {
             "headers":
             {
               "Content-Type": "multipart/form-data",
             }
           }
         )
         .then(res => {
           console.log(res.data)
            dispatch({ type: "CLOSE_GRID" })
         })
         .catch(e => {
             console.log(e)
           })
      })
      .catch(e => {
        console.log(e)
      })
    // setLoading(false)
  }

  // const ajouterfile = async () => {
  //   const formData = new FormData();
  //   // setLoading(true)
  //   // await axios
  //   //   .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, {
  //   //     "file ": file_name,
  //   //     "class": "/public/api/classes/1",

  //   //   })
  //   await axios
  //   .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, formData,
  //   {
  //     "headers":
  //     {
  //       "Content-Type": "multipart/form-data",
  //     }
  //   }
  // )
  //     .then(res => {
     
  //       formData.append("file", file_name);
  //       formData.append("class", res.data.id);
  //       console.log(res.data)
  //       dispatch({ type: "CLOSE_GRID" })
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     })
  //   // setLoading(false)
  // }
  const handleDateChange = (date) => {
    setSelectedDate(date);
};

function spiltdat (dat) {

   console.log(dat)

 // var p = dat.date.split(' ')
  
  if (dat !== null) {
    var p = dat.date.split(' ')
   return (p[0])

  } else { return("-") }

 
}

  return (
    <div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Home Work</h1>
        <Button
          onClick={() => dispatch({ type: "OPEN_GRID" })}
          style={{
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: '#0984e3',
            color: "#fff",
            alignSelf: 'center'
          }}
        >
          Ajouter un Home Work
        </Button>
      </div>
      <br /> <br /> <br />
      <MUIDataTable
        title="Listes des Home Works"
        data={Homework}
        columns={[
          {
            name: 'nom', label: 'Nom',

          },
          {
            name: 'date_fin', label: 'Date',
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <>
                    {spiltdat(value)}
                  </>
                )
              }
            }
          },
          { name: 'semestre', label: 'Semestre' },

        ]}
        options={{
          filterType: "checkbox",
          textLabels: {
            body: {
              noMatch: loadingConges ?
                <CircularProgress /> :
                'Désolé, il n\'y a aucune donnée correspondante à afficher',
            },
          },
        }}
      />

      <br />
      <Grid item xs={12} item justify={'center'} container>

        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={state.toggleGrid}
          onClose={() => dispatch({ type: "CLOSE_GRID" })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Ajout d'un Home Work"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              component={"div"}
            >
              <Widget  >

                <h1>Ajouter un devoir</h1>

                <br /><br />

                {dispc ? <h6>Choisissez une classe</h6> : <h6 style={{ color: "red" }} >Choisissez une classe</h6>}

                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  style={{ width: 300, height: 20, marginBottom: 40 }}
                  required
                  onChange={e => {
                    SetProfClasse(e.target.value)
                  }}
                >
                  {
                    loadingClasses ?
                      <CircularProgress size={25} />
                      :
                      (
                        profClasses.map((m) =>
                          <MenuItem value={m.id} key={m.id}>
                            {m.Calsse}
                          </MenuItem>
                        )
                      )
                  }
                </Select>

                <br /><br />

                <TextField
                  id="outlined-basic"

                  label={distit ? "Titre" : <p style={{ color: "red" }}>Titre</p>}
                  name="Code_produit"
                  value={Nom}
                  onChange={e => setNom(e.target.value)}
                  variant="outlined"
                  style={{ marginBottom: 35, width: '600px' }}
                  type={'textera'}
                />

                <br /><br />

                {disdesc ? <p>Description</p> : <p style={{ color: "red" }} >Description</p>}
                <TextareaAutosize
                  onChange={e => setDescriptionn(e.target.value)}
                  style={{
                    width: '600px',
                    height: '70px',
                    padding: '5px'
                  }}
                  aria-label="minimum height"
                  rowsMin={7}
                  placeholder="Saisir votre texte..." />


                <br /><br />

                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
     <Grid container justifyContent="space-around">
        <KeyboardDatePicker
        style={{width : 600}}
           disableToolbar
           variant="inline"
           format="dd/MM/yyyy"
           margin="normal"
           id="date-picker-inline"
           label="Date final"
           value={selectedDate}
           onChange={handleDateChange}
           KeyboardButtonProps={{
              "aria-label": "change date"
           }}
         
        />
     </Grid>
  </MuiPickersUtilsProvider> */}

                <br /><br />

                <DialogContentText
                        id="alert-dialog-description"
                        component={"div"}
                      >
                        <Basic  />
                      </DialogContentText>

              </Widget>

              <div>


              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                if (verif()) {
                  ajouterHomework()
                  dispatch({ type: "CLOSE_GRID" })
                  console.log(file_name)
                }
              }}
              color="primary"
            >
              Envoyer
            </Button>
            <Button
              onClick={() => dispatch({ type: "CLOSE_GRID" })}
              color="danger"
            >
              Fermer
            </Button>

          </DialogActions>
        </Dialog>
      </Grid>

    </div>
  )
}
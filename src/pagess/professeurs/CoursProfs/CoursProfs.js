import React, { useState, useEffect, useMemo } from "react";
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Select, MenuItem, TextField, TextareaAutosize
} from "@material-ui/core";
import axios from "axios";
import GetAppIcon from '@material-ui/icons/GetApp';
import { useDropzone } from 'react-dropzone'
import * as Icons from "@material-ui/icons"
import MUIDataTable from "mui-datatables"

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

function Basic() {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone();

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
        <input {...getInputProps()} />
        <Icons.CloudUpload style={{ width: 100, height: 100 }} />
        <p style={{ alignSelf: 'center', fontSize: 30 }}>Drag/Drop ou cliquer pour ajouter votre cours</p>
      </div>
      <div style={{ marginTop: 5 }}>
        <ul style={{ listStyleType: 'none' }}>
          {files}
        </ul>
      </div>
    </section>
  );
}

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

export default function CoursProfs() {

  const [selectedClasse, setSelectedClasse] = useState('')
  const [profClasses, SetProfClasses] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [loadingMatieres, setLoadingMatieres] = useState(false)

  const [titreCours, setTitreCours] = useState('')
  const [descriptionCours, setDescriptionCours] = useState('')
  const [matiere, setMatiere] = useState('')
  const [listMatieres, setListMatieres] = useState([])

  const [loadingAdd, setLoadingAdd] = useState(false)
  const [listCours, setListCours] = useState([])
  const [showFormAdd, setShowFormAdd] = useState(false)
  const [loadingCours, setLoadingCours] = useState(false)

  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

  function showw() {
    dispatch({ type: "OPEN_GRID" })
  }

  useEffect(() => {
    getProfClasses()
    handleChange()
  }, [])

  const getProfClasses = async () => {
    // const current_prof = sessionStorage.getItem('user_id')
    setLoadingClasses(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/${current_prof}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/15`)
      .then(res => {
        SetProfClasses(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingClasses(false)
  }

  const getMatiereByClass = async () => {
    setLoadingMatieres(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/matiereByClasssbyProfs/1/1`)
      .then(res => {
        setListMatieres(res.data)
        setShowFormAdd(true)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingMatieres(false)
  }

  const handleChange = async () => {
    setLoadingCours(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByEnsignat/15`)
      .then(res => {
        setListCours(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingCours(false)
  };

  const addCours = async () => {
    setLoadingAdd(true)
    let date = new Date()
    await axios
      .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/courses`, {
        "Name": titreCours,
        "matiere": `/public/api/matieres/${matiere}`,
        "Date_creation": date,
        "ensignant": `/public/api/enseignants/1`
      })
      .then(async res => {
        console.log(res.data)
        dispatch({ type: "CLOSE_GRID" })
        // await axios
        //   .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, {
        //     "id_course" : res.data.id,
        //     "file": "file"
        //   })
        //   .then(res => {
        //     console.log(res.data)
        //     dispatch({ type: "CLOSE_GRID" })
        //   })
        //   .catch(e => {
        //     console.log(e)
        //   })
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingAdd(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des Cours </h1>
        <Button
          onClick={() => showw()}
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
          Ajouter un nouveau Cour
        </Button>
      </div>
      <div>
        <br />
        <div>
          {/* <div style={{ marginTop: 50, }}>
            <center><h4>Choisissez une classe</h4></center>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 30 }}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                style={{ width: 300, height: 20, marginBottom: 40 }}
                required
                onChange={e => {
                  handleChange(e.target.value)
                }}
              >
                {
                  loadingClasses ?
                    <CircularProgress size={40} />
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
            </div>

          </div> */}

          <Grid item xs={12} style={{ marginTop: 50 }}>
            <MUIDataTable
              title="Liste des cours"
              data={listCours}
              columns={[
                { name: "id", label: "ID" },
                // { name: "Name", label: "Titre" },
                { name: "Matiere", label: "Matière" },
                { name: "type", label: "Type" },
                {
                  name: "Created_At", label: "Date", options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          {
                            value === null ?
                              <p>-</p>
                              :
                              <p>{value}</p>
                          }
                        </>
                      )
                    }
                  }
                },
                {
                  name: "Liste_Fichiers", label: "Fichier", options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          <Button
                            variant={"contained"}
                            style={{ backgroundColor: '#536dfe' }}
                            href={value.Fichier}
                            target="_blank"
                          >
                            <GetAppIcon style={{ width: 30, height: 30, color: 'white' }} />
                          </Button>
                        </>
                      )
                    }
                  }
                },
                // {
                //   name: "Modifier",
                //   options: {
                //     customBodyRender: (value, tableMeta, updateValue) => {
                //       return (
                //         <Button
                //           variant={"contained"}
                //           className={classes.marginRight}
                //           onClick={
                //             () => {
                //               setUpdateClass(tableMeta.rowData["1"] + ' ' + tableMeta.rowData["2"] + ' ' + tableMeta.rowData["3"])
                //               showw()
                //             }
                //           }
                //         >
                //           <Icons.Update style={{ width: 30, height: 30 }} />
                //         </Button>
                //       )
                //     }
                //   }
                // }
              ]}
              options={{
                filterType: "checkbox",
                textLabels: {
                  body: {
                    noMatch: loadingCours ? <CircularProgress size={30} /> : 'Aucun Cour est importé'
                  }
                }
              }}
            />
          </Grid>
        </div>

      </div>

      <div>
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={state.toggleGrid}
          onClose={() => dispatch({ type: "CLOSE_GRID" })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Ajouter un nouveau cour: "}</DialogTitle>
          <center>
            <Grid item md={4} xs={12} lg={4}>
              <DialogTitle id="alert-dialog-title">{"Choisissez une classe: "}</DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  component={"div"}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                    value={selectedClasse}
                    onChange={(e) => {
                      setSelectedClasse(e.target.value)
                      getMatiereByClass(e.target.value)
                    }}
                  >
                    {profClasses.map((c) =>
                      <MenuItem value={c.id} key={c.id}>
                        {c.Calsse}
                      </MenuItem>
                    )}
                  </Select>
                </DialogContentText>
              </DialogContent>
            </Grid>
          </center>

          {
            loadingMatieres ?
              <center><CircularProgress size={25} /></center>
              :
              showFormAdd ?
                <Grid>
                  <center>
                    <Grid item md={4} xs={12} lg={4}>
                      <DialogTitle id="alert-dialog-title">{"Choisissez une matière: "}</DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          component={"div"}
                        >
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                            value={matiere}
                            onChange={(e) => {
                              setMatiere(e.target.value)
                            }}
                          >
                            {listMatieres.map((c) =>
                              <MenuItem value={c.id} key={c.id}>
                                {c.matiere}
                              </MenuItem>
                            )}
                          </Select>
                        </DialogContentText>
                      </DialogContent>
                    </Grid>
                  </center>

                  <center>
                    <Grid item md={4} xs={12} lg={4}>
                      <DialogTitle id="alert-dialog-title">{"Titre du cour"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          component={"div"}
                        >
                          <TextField placeholder="Titre"
                            value={titreCours}
                            onChange={(e) => {
                              setTitreCours(e.target.value)
                            }} />
                        </DialogContentText>
                      </DialogContent>
                    </Grid>
                  </center>

                  <center>
                    <Grid item md={4} xs={12} lg={4}>
                      <DialogTitle id="alert-dialog-title">{"Description du cour"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          component={"div"}
                        >
                          <TextareaAutosize
                            aria-label="textarea"
                            placeholder="Description"
                            style={{ width: 250, height: 50, paddingLeft: 5 }}
                            value={descriptionCours}
                            onChange={e => {
                              setDescriptionCours(e.target.value)
                            }}
                          />
                        </DialogContentText>
                      </DialogContent>
                    </Grid>
                  </center>

                  <center>
                    <DialogTitle id="alert-dialog-title">{"Ajouter un fichier: "}</DialogTitle>
                    <DialogContent>
                      <DialogContentText
                        id="alert-dialog-description"
                        component={"div"}
                      >
                        <Basic />
                      </DialogContentText>
                    </DialogContent>
                  </center>
                </Grid>
                : null
          }
          <DialogActions>
            {
              showFormAdd ?
                <Button
                  onClick={() => {
                    addCours()
                  }}
                  color="primary"
                >
                  Enregistrer
                </Button>
                : loadingAdd ?
                  <CircularProgress size={25} />
                  : null
            }
            <Button
              onClick={() => dispatch({ type: "CLOSE_GRID" })}
              color="danger"
            >
              Fermer
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    </div>
  )

}
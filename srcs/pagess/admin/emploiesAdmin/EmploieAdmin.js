import React, { useState, useMemo } from "react"
import useStyles from "./styles"
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"
// components
import MUIDataTable from "mui-datatables"
import axios from "axios"
import { useDropzone } from 'react-dropzone'
import * as Icons from "@material-ui/icons"
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers"
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
  backgroundColor: '#0E0D47',
  color: '#dfe6e9',
  outline: 'none',
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
    <li key={file.path}>
      {file.path} - {file.size} bytes
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
        <p style={{ alignSelf: 'center', fontSize: 30 }}>Drag/Drop ou cliquer pour sélectionner un Emploi du temps</p>
      </div>
      <br />
      <aside>
        <h4>Files</h4>
        <ul style={{ listStyle: 'none' }}>{files}</ul>
      </aside>
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


    case "OPEN_GRID1":
      return {
        ...state,
        toggleGrid1: true
      };
    case "CLOSE_GRID1":
      return {
        ...state,
        toggleGrid1: false
      };
  }
};

export default function Emploie() {
  const [isLoadingclass, setIsLoadingclass] = useState(true);
  const [isLoadingprof, setIsLoadingprof] = useState(true);

  const classes = useStyles();

  const [allProfs, setAllProfs] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState('')
  const [updateClass, setUpdateClass] = useState('')

  const [mats, setmats] = useState([]);

  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false,

    toggleModal1: false,
    toggleBody1: false,
    toggleSmall1: false,
    toggleGrid1: false,
    toggleLarge1: false,
    toggleInputModal1: false
  });

  const getProfs = async () => {
    const d = localStorage.getItem('user_id')

    setIsLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/allEmploisByProfs`)
      .then(res => {
        setAllProfs(res.data)
        setIsLoadingprof(false)
        // console.log(res.data.result)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
  };

  const getClasses = async () => {
    const d = localStorage.getItem('user_id')

    setIsLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/allEmploisByClasse`)
      .then(res => {
        setAllClasses(res.data)
        console.log(res.data)
        setIsLoadingclass(false)
        // console.log(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
  };

  function regs(id) {
    const d = localStorage.getItem('user_id')
    dispatch({ type: "OPEN_GRID" })
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NbrAbsence/${id}`)
      .then(res => {
        setmats(res.data)
      }, 2000)
  }

  function regs1(id) {
    const d = localStorage.getItem('user_id')
    dispatch({ type: "OPEN_GRID1" })
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NbrAbsence/${id}`)
      .then(res => {
        setmats(res.data)
      }, 2000)
  }

  const [hover, setHover] = useState(false)
  const toggleHover = () => {
    setHover(!hover)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ marginBottom: 30 }}>Gestion des Emplois</h1>
        {/* <Button variant="contained" href="/#/admin/addEmploi"
          style={hover ? {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#F6F7FF",
            color: "#0E0D47",
            alignSelf: 'center'
          } : {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#0E0D47",
            color: "#F6F7FF",
            alignSelf: 'center'
          }}
          onMouseEnter={toggleHover} onMouseLeave={toggleHover}
        >
          Ajouter un Emploi
          <AddCircleIcon />
        </Button> */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 30 }}>
        <Button
          style={selected === 'classe' ? {} : { backgroundColor: "#0E0D47" }}
          color="primary"
          variant="contained"
          style={selected === 'classe' ?
            { width: 300, height: 100, fontSize: 25, backgroundColor: "rgb(157, 2, 8)", color: "#0E0D47" }
            : { width: 300, height: 100, fontSize: 25, backgroundColor: "#0E0D47", color: "#0E0D47" }}
          onClick={() => {
            getClasses()
            setSelected('classe')
          }}
        >
          Classe
        </Button>

        <br />
        <br />
        <Button style={selected === 'Prof' ?
          { width: 300, height: 100, fontSize: 25, backgroundColor: "rgb(157, 2, 8)", color: "#0E0D47" } :
          { width: 300, height: 100, fontSize: 25, backgroundColor: "#0E0D47", color: "#0E0D47" }}
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={() => {
            getProfs()
            setSelected('Prof')
          }}
        >
          Professeur
        </Button>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {
            selected === 'classe' ?
              <MUIDataTable
                title="Liste des classes"
                data={allClasses}
                columns={[
                  { name: "id", label: "ID" },
                  { name: "Niveau", label: "Niveau" },
                  {
                    name: "Section", label: "Section", options: {
                      customBodyRender: (value, tableMeta, updateValue) => {
                        if (value == null || value == '0') {
                          return (
                            <p style={{ marginTop: 16 }}>-</p>
                          )
                        } else {
                          return (
                            <p style={{ marginTop: 16 }}>{value}</p>
                          )
                        }
                      }
                    }
                  },
                  { name: "Numéro", label: "Numéro" },
                  { name: "Type", label: "Type" },
                  {
                    name: "Lien_Emploi",
                    label: 'Emploi',
                    options: {
                      customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                          <Button
                            variant={"contained"}
                            style={{ backgroundColor: '#0E0D47' }}
                            onClick={
                              () => {
                                console.log(tableMeta.rowData[5])
                              }
                            }
                            href={tableMeta.rowData[5]}
                            target="_blank"
                          >
                            <Icons.GetApp style={{ width: 30, height: 30, color: 'white' }} />
                          </Button>
                        )
                      }
                    }
                  },
                  {
                    name: "Modifier",
                    options: {
                      customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                          <Button
                            variant={"contained"}
                            className={classes.marginRight}
                            onClick={
                              () => {
                                console.log(tableMeta.rowData)
                                if (tableMeta.rowData["2"] === "0")
                                  setUpdateClass(tableMeta.rowData["1"] + ' ' + tableMeta.rowData["3"])
                                else
                                  setUpdateClass(tableMeta.rowData["1"] + ' ' + tableMeta.rowData["2"] + ' ' + tableMeta.rowData["3"])

                                regs(tableMeta.rowData["0"])
                              }
                            }
                          >
                            <Icons.Update style={{ width: 30, height: 30 }} />
                          </Button>
                        )
                      }
                    }
                  }]}
                options={{
                  filterType: "checkbox",
                  textLabels: {
                    body: {
                      noMatch: isLoadingclass ?
                        <CircularProgress /> :

                        'Désolé, il n\'y a aucune donnée correspondante à afficher',
                    },

                  },
                }}
              />
              : selected === 'Prof' ?
                <MUIDataTable
                  title="Liste des professeurs"
                  data={allProfs}
                  columns={[
                    { name: "id", label: "ID" },
                    { name: "fullname", label: "Nom et Prénom" },
                    { name: "MatièreProf", label: "Matière" },
                    {
                      name: "Lien_Emploi",
                      label: 'Emploi',
                      options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <Button
                              variant={"contained"}
                              style={{ backgroundColor: '#0E0D47' }}
                              onClick={
                                () => {
                                  console.log(tableMeta.rowData[3])
                                }
                              }
                              href={tableMeta.rowData[3]}
                              target="_blank"
                            >
                              <Icons.GetApp style={{ width: 30, height: 30, color: 'white' }} />
                            </Button>
                          )
                        }
                      }
                    },
                    {
                      name: "Modifier",
                      options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <Button
                              variant={"contained"}
                              className={classes.marginRight}
                              onClick={
                                () => {
                                  console.log(tableMeta.rowData)
                                  setUpdateClass(tableMeta.rowData["1"])
                                  regs1(tableMeta.rowData["0"])
                                }
                              }
                            >
                              <Icons.Update style={{ width: 30, height: 30 }} />
                            </Button>
                          )
                        }
                      }
                    }]}
                  options={{
                    filterType: "checkbox",
                    textLabels: {
                      body: {
                        noMatch: isLoadingprof ?
                          <CircularProgress /> :

                          'Désolé, il n\'y a aucune donnée correspondante à afficher',
                      },

                    },
                  }}
                />
                :
                null
          }
        </Grid>
      </Grid>

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={state.toggleGrid}
        onClose={() => dispatch({ type: "CLOSE_GRID" })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Modifier Emploi: " + updateClass}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            component={"div"}
          >
            <Basic />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch({ type: "CLOSE_GRID" })}
            color="danger"
          >
            Fermer
          </Button>
          <Button onClick={() => {
            dispatch({ type: "CLOSE_GRID" })
          }}
            color="primary"
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={state.toggleGrid1}
        onClose={() => dispatch({ type: "CLOSE_GRID1" })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Modifier Emploi: " + updateClass}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            component={"div"}
          >
            <Basic />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            dispatch({ type: "CLOSE_GRID1" })
          }}
            color="primary"
          >
            Enregistrer
          </Button>
          <Button
            onClick={() => dispatch({ type: "CLOSE_GRID1" })}
            color="danger"
          >
            Fermer
          </Button>

        </DialogActions>
      </Dialog>
    </div >
  );
}
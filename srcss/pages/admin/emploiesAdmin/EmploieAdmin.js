import React, { useState, useEffect, useMemo } from "react"
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
  transition: 'border .24s ease-in-out'
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
  }
};

export default function Emploie() {
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
    toggleInputModal: false
  });

  useEffect(function () {
    getProfs()
    getClasses()
  }, [])

  const getProfs = async () => {
    const d = sessionStorage.getItem('user_id')

    setIsLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        setAllProfs(res.data.result)
        // console.log(res.data.result)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
  };

  const getClasses = async () => {
    const d = sessionStorage.getItem('user_id')

    setIsLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/api/classes`)
      .then(res => {
        setAllClasses(res.data)
        console.log(res.data)
        // console.log(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
  };

  const profTables = [
    ["Meral Elias", "Example Inc.", "Hartford"],
    ["Deep Pau", "Example Inc.", "Yonkers"],
    ["Sebastiana Hani", "Example Inc.", "Dallas"],
    ["Marciano Oihana", "Example Inc.", "Yonkers"],
    ["Brigid Ankur", "Example Inc.", "Dallas"],
    ["Anna Siranush", "Example Inc.", "Yonkers"],
    ["Avram Sylva", "Example Inc.", "Hartford"],
    ["Serafima Babatunde", "Example Inc.", "Tampa"],
    ["Gaston Festus", "Example Inc.", "Tampa"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford"],
    ["Christian Birgitte", "Example Inc.", "Tampa"],
    ["Joe James", "Example Inc.", "Yonkers"],
    ["John Walsh", "Example Inc.", "Hartford"],
    ["Bob Herm", "Example Inc.", "Tampa"],
    ["James Houston", "Example Inc.", "Dallas"],
  ];

  function regs(id) {
    const d = sessionStorage.getItem('user_id')
    dispatch({ type: "OPEN_GRID" })
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
        <h1 style={{ marginBottom: 30 }}>Emplois du temps</h1>
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
          style={selected === 'classe' ? { backgroundColor: "#0984e3", color: "#0E0D47" } : { backgroundColor: "#0E0D47" }}
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={() => {
            getClasses()
            setSelected('classe')
          }}
        >
          Classe
        </Button>

        <br />
        <br />
        <Button style={selected === 'Prof' ? { backgroundColor: "#0984e3", color: "#0E0D47" } : { backgroundColor: "#0E0D47" }}
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
                  { name: "sous_niveau", label: "Niveau" },
                  { name: "Section", label: "Section" },
                  { name: "Nom", label: "Numéro" },
                  { name: "Niveau", label: "Type" },
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
                  filterType: "checkbox"
                }}
              />
              : selected === 'Prof' ?
                <MUIDataTable
                  title="Liste des professeurs"
                  data={profTables}
                  columns={["Nom et Prénom", "Emploi", "Action"]}
                  options={{
                    filterType: "checkbox"
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
          <Button onClick={() => {
            dispatch({ type: "CLOSE_GRID" })
          }}
            color="primary"
          >
            Enregistrer
          </Button>
          <Button
            onClick={() => dispatch({ type: "CLOSE_GRID" })}
            color="danger"
          >
            Fermer
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
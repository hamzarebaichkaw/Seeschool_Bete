// import React, { useState, useEffect } from "react";
// import {
//   Grid, Table,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@material-ui/core";
// import Checkbox from '@material-ui/core/Checkbox';
// import { Select, MenuItem } from "@material-ui/core";
// import * as Icons from "@material-ui/icons"
// import useStyles from "./styles";
// import MUIDataTable from "mui-datatables";
// import { Link, Button, CircularProgress } from "../../../components/Wrappers/Wrappers";

// import axios from "axios";

// export default function NotesProfs() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [checked, setChecked] = React.useState(true);
//   // <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

//   const [profClasses, setProfClasses] = useState([])
//   const [notesEleves, setNotesEleves] = useState([])
//   const [loadingClasses, setLoadingClasses] = useState(false)
//   const [loadingEleves, setLoadingEleves] = useState(false)
//   const [showTable, setShowTable] = useState(false)


//   useEffect(() => {
//     getProfClasses()
//   }, [])

//   const getProfClasses = async () => {
//      const current_prof = localStorage.getItem('user_id')
//     setLoadingClasses(true)
//     await axios
//       // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/${current_prof}`)
//       .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/15`)
//       .then(res => {
//         setProfClasses(res.data)
//         console.log(res.data)
//       })
//       .catch(e => {
//         console.log(e)
//       })
//     setLoadingClasses(false)
//   }

//   const getEleves = async () => {
//     setLoadingEleves(true)
//     setShowTable(true)
//     await axios
//       // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NotekByCalsse/${id_classe}`)
//       .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NotekByCalsse/1/15`)
//       .then(res => {
//         setNotesEleves(res.data)
//         console.log(res.data)
//       })
//       .catch(e => {
//         console.log(e)
//       })
//     setLoadingEleves(false)
//   }

//   return (
//     <div>
//       <h1>Gestion des Notes</h1>
//       <br />
//       <h6>Choisissez une classe</h6>
//       <br />
//       <Select
//         labelId="demo-simple-select-outlined-label"
//         id="demo-simple-select-outlined"
//         style={{ width: 300, height: 20, marginBottom: 40 }}
//         required
//         onChange={e => {
//           getEleves()
//         }}
//       >
//         {
//           loadingClasses ?
//             <CircularProgress size={25} />
//             :
//             (
//               profClasses.map((m) =>
//                 <MenuItem value={m.Calsse} key={m.id}>
//                   {m.Calsse}
//                 </MenuItem>
//               )
//             )
//         }
//       </Select>
//       <br />
//       <br />

//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           {
//             !showTable ?
//               null
//               :
//               loadingEleves ?
//                 <CircularProgress size={30} />
//                 :
//                 (
//                   <MUIDataTable
//                     title="Liste des notes"
//                     data={notesEleves}
//                     columns={[
//                       { name: "id", label: "ID" },
//                       { name: "nom et prenom", label: "Nom et Prénom" },
//                       {
//                         name: "note", label: "Note Contrôle 1", options: {
//                           customBodyRender: (value, tableMeta, updateValue) => {
//                             if (value.length == 0) {
//                               return (
//                                 <p>-</p>
//                               )
//                             } else {
//                               return (
//                                 <>
//                                   <p>{value[0]["Controle 1"]}</p>
//                                 </>
//                               )
//                             }
//                           }
//                         }
//                       },
//                       {
//                         name: "note", label: "Note Contrôle 2", options: {
//                           customBodyRender: (value, tableMeta, updateValue) => {
//                             if (value.length == 0) {
//                               return (
//                                 <p>-</p>
//                               )
//                             } else {
//                               return (
//                                 <>
//                                   <p>{value[0]["Controle 2"]}</p>
//                                 </>
//                               )
//                             }
//                           }
//                         }
//                       },
//                       {
//                         name: "note", label: "Note Synthèse", options: {

//                           customBodyRender: (value, tableMeta, updateValue) => {
//                             if (value.length == 0) {
//                               return (
//                                 <p>-</p>
//                               )
//                             } else {
//                               return (
//                                 <>
//                                   <p>{value[0]["Synthese"]}</p>
//                                 </>
//                               )
//                             }
//                           }
//                         }
//                       },
//                       {
//                         name: "note", label: "Note Pratique", options: {

//                           customBodyRender: (value, tableMeta, updateValue) => {
//                             if (value.length == 0) {
//                               return (
//                                 <p>-</p>
//                               )
//                             } else {
//                               return (
//                                 <>
//                                   <p>{value[0]["Pratique"]}</p>
//                                 </>
//                               )
//                             }
//                           }
//                         }
//                       },
//                       {
//                         name: "Modifier", options: {
//                           customBodyRender: (value, tableMeta, updateValue) => {
//                             return (
//                               <Button>
//                                 <Icons.Update style={{ width: 30, height: 30 }} />
//                               </Button>
//                             )
//                           }
//                         }
//                       },
//                     ]}
//                     options={{
//                       filterType: "checkbox",
//                     }}
//                   />
//                 )
//           }
//         </Grid>
//       </Grid>

//       <br />
//       <div style={{ justifyContent: "flex-end", float: "right" }}>
//         {/* <Button style={{ backgroundColor: "#536dfe", width: '250px' }}
//           color="primary"
//           variant="contained"
//           onClick={() => {

//           }}
//         >
//           Upload
//         </Button> */}


//       </div>
      
//     </div>
//   )

// }

import React, { useState, useEffect } from "react";
import {
  Grid, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import { Select, MenuItem } from "@material-ui/core";
import * as Icons from "@material-ui/icons"
import useStyles from "./styles";
import MUIDataTable from "mui-datatables";
import { Link, Button, CircularProgress } from "../../../components/Wrappers/Wrappers";
import TextField from '@material-ui/core/TextField'

import axios from "axios";
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

export default function NotesProfs() {
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = React.useState(true);
  // <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [profClasses, setProfClasses] = useState([])
  const [notesEleves, setNotesEleves] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [loadingEleves, setLoadingEleves] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [altername, setAltername] = useState("")
  const [cont1, setCont1] = useState(null)
  const [cont2, setCont2] = useState(null)
  const [synth, setSynth] = useState(null)
  const [pra, setPra] = useState(null)


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
        setProfClasses(res.data)
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingClasses(false)
  }

  const getEleves = async () => {
    setLoadingEleves(true)
    setShowTable(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NotekByCalsse/${current_prof}/${id_class}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NotekByCalsse/1/15`)
      .then(res => {
        setNotesEleves(res.data)
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingEleves(false)
  }
  // async function popups(name, ra) {
  //   setAltername(name)

  //   if (notesEleves[ra].note[0]["Controle 1"] !== null) {

  //     setCont1(notesEleves[ra].note[0]["Controle 1"])
  //   }
  //   if (notesEleves[ra].note[0]["Controle 2"] !== null) {
  //     setCont2(notesEleves[ra].note[0]["Controle 2"])

  //   }
  //   if (notesEleves[ra].note[0]["Synthese"] !== null) {

  //     setSynth(notesEleves[ra].note[0]["Synthese"])

  //   }
  //   if (notesEleves[ra].note[0]["Pratique"] !== null) {
  //     setPra(notesEleves[ra].note[0]["Pratique"])
  //   }
  //   dispatch({ type: "OPEN_GRID" })

  // }

  const changeNoteclass = async () => {
    // setUpdateLoading(true)
    await axios
      .put(`http://www.pointofsaleseedigitalaency.xyz/public/api/bulletins/${id_bulletin}`, {
        "Controle1": Updatec1,
        "Controle2": Updatec2 ,
        "Pratique": UpdatePrat ,
        "synthese": UpdateSyn
      })
      .then(res => {
        console.log(res.data)
        
      })
      .catch(e => {
        console.log(e)
      })
    // setUpdateLoading(false)
  }

  // const [UpdatedID, setUpdatedID] = useState()
  const [id_bulletin, setid_bulletin] = useState("")
  const [Updatec1, setUpdatec1] = useState('')
  const [Updatec2, setUpdatec2] = useState('')
  const [UpdateSyn, setUpdateSyn] = useState('')
  const [UpdatePrat, setUpdatePrat] = useState('')


  // const changeNoteclass = async () => {

  //   await axios
  //     .put(`http://www.pointofsaleseedigitalaency.xyz/public/api/bulletins/${id_bulletin}`, {
  //       // "Remarque": "dzd",
  //       "Controle1": cont1,
  //       // "Controle2": "3",
  //       // "Pratique": "3",
  //       // "synthese": "2",
  //     })
  //     .then(res => {
  //       console.log(res.data)
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     })
  
  // }













  return (
    <div>
      <h1>Gestion des Notes</h1>
      <br />
      <h6>Choisissez une classe</h6>
      <br />
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        style={{ width: 300, height: 20, marginBottom: 40 }}
        required
        onChange={e => {
          getEleves()
        }}
      >
        {
          loadingClasses ?
            <CircularProgress size={25} />
            :
            (
              profClasses.map((m) =>
                <MenuItem value={m.Calsse} key={m.id}>
                  {m.Calsse}
                </MenuItem>
              )
            )
        }
      </Select>
      <br />
      <br />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          {
            !showTable ?
              null
              :
              loadingEleves ?
                <CircularProgress size={30} />
                :
                (
                  <MUIDataTable
                    title="Liste des notes"
                    data={notesEleves}
                    columns={[
                      { name: "id", label: "ID" },
                      { name: "nom et prenom", label: "Nom et Prénom" },
                      {
                        name: "note", label: "Note Contrôle 1", options: {
                          customBodyRender: (value, tableMeta, updateValue) => {
                            if (value.length == 0) {
                              return (
                                <p>-</p>
                              )
                            } else {
                              return (
                                <>
                                  <p>{value[0]["Controle 1"]}</p>
                                </>
                              )
                            }
                          }
                        }
                      },
                      {
                        name: "note", label: "Note Contrôle 2", options: {
                          customBodyRender: (value, tableMeta, updateValue) => {
                            if (value.length == 0) {
                              return (
                                <p>-</p>
                              )
                            } else {
                              return (
                                <>
                                  <p>{value[0]["Controle 2"]}</p>
                                </>
                              )
                            }
                          }
                        }
                      },
                      {
                        name: "note", label: "Note Synthèse", options: {

                          customBodyRender: (value, tableMeta, updateValue) => {
                            if (value.length == 0) {
                              return (
                                <p>-</p>
                              )
                            } else {
                              return (
                                <>
                                  <p>{value[0]["Synthese"]}</p>
                                </>
                              )
                            }
                          }
                        }
                      },
                      {
                        name: "note", label: "Note Pratique", options: {

                          customBodyRender: (value, tableMeta, updateValue) => {
                            if (value.length == 0) {
                              return (
                                <p>-</p>
                              )
                            } else {
                              return (
                                <>
                                  <p>{value[0]["Pratique"]}</p>
                                </>
                              )
                            }
                          }
                        }
                      },
                      // {
                      //   name: "Ajouter", options: {
                      //     customBodyRender: (value, tableMeta, updateValue) => {
                      //       return (
                      //         <Button onClick={() =>
                      //          { 
                      //           console.log(tableMeta.rowData)
                      //           // setid_bulletin(tableMeta.rowData[0])
                      //           // setUpdatec1(tableMeta.rowData[2])
                      //           // setUpdatec2(tableMeta.rowData[3])
                      //           // setUpdateSyn(tableMeta.rowData[4])
                      //           // setUpdatePrat(tableMeta.rowData[5])
                      //           // dispatch({ type: "OPEN_GRID" })
                      //         }
                      //           // popups(tableMeta.rowData[1], tableMeta.rowIndex)
                      //         } >
                      //           <Icons.Add style={{ width: 30, height: 30 }} />
                      //         </Button>
                      //       )
                      //     }
                      //   }
                      // },



                      {
                        name: "Modifier", options: {
                          customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                              <Button onClick={() =>
                               { 
                                console.log(tableMeta.rowData)
                                // setid_bulletin(tableMeta.rowData[0])
                                setUpdatec1(tableMeta.rowData[2])
                                setUpdatec2(tableMeta.rowData[3])
                                setUpdateSyn(tableMeta.rowData[4])
                                setUpdatePrat(tableMeta.rowData[5])
                                dispatch({ type: "OPEN_GRID" })
                              }
                                // popups(tableMeta.rowData[1], tableMeta.rowIndex)
                              } >
                                <Icons.Update style={{ width: 30, height: 30 }} />
                              </Button>
                            )
                          }
                        }
                      },
                    ]}
                    options={{
                      filterType: "checkbox",
                    }}
                  />
                )
          }
        </Grid>
      </Grid>

      <br />
      <div style={{ justifyContent: "flex-end", float: "right" }}>
        {/* <Button style={{ backgroundColor: "#536dfe", width: '250px' }}
          color="primary"
          variant="contained"
          onClick={() => {

          }}
        >
          Upload
        </Button> */}

      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={state.toggleGrid}
        onClose={() => dispatch({ type: "CLOSE_GRID" })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">{altername}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            component={"div"}
          >
            <Grid item xs={12} item justify={'center'} container>

            <TextField
              id="outlined-basic"
              label="Contrôle 1"
              // onChange={}
              name="fullName"
              value={Updatec1}
              onChange={e => setUpdatec1(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 35 }}
              helperText=""
            />
            &nbsp;&nbsp;&nbsp;
            <TextField
              id="outlined-basic"
              label="Contrôle 2"
              // onChange={}
              name="fullName"
              value={Updatec2}
              onChange={e => setUpdatec2(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 35 }}
              helperText=""
            />
            &nbsp;&nbsp;&nbsp;
            <TextField
              id="outlined-basic"
              label="Synth"
              // onChange={}
              name="fullName"
              value={UpdateSyn}
              onChange={e => setUpdateSyn(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 35 }}
              helperText=""
            />
            &nbsp;&nbsp;&nbsp;
            <TextField
              id="outlined-basic"
              label="Pratique"
              // onChange={}
              name="fullName"
              value={UpdatePrat}
              onChange={e => setUpdatePrat(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 35 }}
              helperText=""
            />

</Grid>

          </DialogContentText>

        </DialogContent>
        <DialogActions>
        <Button
        variant="contained"
        color="primary"
            onClick={() => dispatch({ type: "CLOSE_GRID" }),
            changeNoteclass()
          
          }
            style={{color:"white",  }}
          >
            Send
          </Button>
          <Button
            onClick={() => dispatch({ type: "CLOSE_GRID" })}
            color="primary"
          >
            Fermer
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )

}
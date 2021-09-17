import React, { useState, useEffect } from "react";
import { Grid, Select, MenuItem } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";

// components
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Inscription() {
  const classes = useStyles();

  const [action, setAction] = useState("Choisissez...");
  const [mat, setmat] = useState([])
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [CoursM, setCoursM] = useState([]);

  const [type, setType] = useState('')
  const [niveau, setNiveau] = useState('')
  const [section, setSection] = useState('0')
  const [capacity, setCapacity] = useState('')

  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
  ])

  const [niveaux, setNiveaux] = useState([
    { id: 1, niveau: '1ère année', type: 'Primaire' },
    { id: 2, niveau: '2ème année', type: 'Primaire' },
    { id: 3, niveau: '3ème année', type: 'Primaire' },
    { id: 4, niveau: '4ème année', type: 'Primaire' },
    { id: 5, niveau: '5ème année', type: 'Primaire' },
    { id: 6, niveau: '6ème année', type: 'Primaire' },
    { id: 7, niveau: '7ème année', type: 'Collège' },
    { id: 8, niveau: '8ème année', type: 'Collège' },
    { id: 9, niveau: '9ème année', type: 'Collège' },
    { id: 10, niveau: '1ère année', type: 'Secondaire' },
    { id: 11, niveau: '2ème année', type: 'Secondaire' },
    { id: 12, niveau: '3ème année', type: 'Secondaire' },
    { id: 13, niveau: '4ème année', type: 'Secondaire' }
  ])

  const [students, setStudents] = useState([])

  const [sections, setSections] = useState([
    { id: 1, section: 'Science Informatique' },
    { id: 2, section: 'Science Exprimentale' },
    { id: 2, section: 'Mathématiques' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])



  useEffect(function () {
    getStats()
  }, [])

  const getStats = async () => {
    const d = localStorage.getItem('user_id')

    setIsLoading(true)
    setListLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        setCoursM(res.data.result)
        setAction(res.data.result.matieress)
        // console.log(res.data.result)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
    setListLoading(false)
  };

  const getListEtud = async (num) => {
    //  console.log(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/ListEtudiantsclass/${type}/${niveau}/${section}/${num}`)
    // console.log(type + ' ' + niveau + ' ' + section + ' ' + num)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/ListEtudiantsclass/Secondaire/3eme/Maths/3maths`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/ListEtudiantsclass/${type}/${niveau}/${section}/${num}`)
      .then(res => {
        var arr = new Array()
        res.data.map(i => {
          arr.push({
            fullName: i.fullName,
            email: i.email,
            adresse: i.adresse,
            dateNaiss: i['date de naissance'].date,
            emailParent: i.parent,
            numTelParent: i.parent,
            numUrgenceParent: i.parent
          })
        })
        setStudents(arr)
        setShow(true)

      }, 2000)
      .catch((e) => {
        console.log(e)
      })

  }


  async function reg(id) {
    const d = localStorage.getItem('user_id')
    setIsLoading(true)
    setTableLoading(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Students`)
      .then(res => {
        setmat(res.data)
      }, 2000)
    setIsLoading(false)
    setShow(true)
    setTableLoading(false)
  }

  const handleChange = e => {
    reg(e.target.value)
  };

  const toggleHover = () => {
    setHover(!hover)
  }

  const [numeros, setNumeros] = useState([])
  const [numero, setNumero] = useState('')
  const getNumerosSection = async (niv, sec) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/${sec}`)
      .then(res => {
        setNumeros(res.data)
      }, 2000)
      .catch((e) => {

      })
  }


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Inscriptions</h1>
        <Button variant="contained" href="http://localhost:3000/#/admin/Register"
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
          Inscrire un élève
          <AddCircleIcon />
        </Button>
      </div>
      <div style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}  > {type === '' ? "Choississez un type" : show ? "Liste des Etudiants" : "Choisissez une classe"} </h2>

        <center>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
            {
              types.map((t) =>
                <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setType(t.type)
                    if (t.type === 'Primaire' || t.type === 'Collège')
                      setSection('0')
                  }}
                > {t.type}
                </Button>
              )
            }

          </div>
          {
            type === '' ?
              null :
              (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div>
                    <p style={{ fontSize: 20 }}>Niveau:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={niveau}
                      onChange={e => {
                        setNiveau(e.target.value)
                        getNumerosSection(e.target.value, section)
                        // console.log(numeros)
                      }}
                    >
                      {
                        niveaux.map((n) =>
                          n.type === type ?
                            <MenuItem value={n.niveau} key={n.id}>
                              {n.niveau}
                            </MenuItem> : null
                        )
                      }
                    </Select>
                  </div>

                  {
                    type === 'Primaire' || type === 'Collège' ?
                      null : (
                        <div>
                          <p style={{ fontSize: 20 }}>Section:</p>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ width: 250, height: 20, marginBottom: 80 }}
                            value={section}
                            onChange={async e => {
                              setSection(e.target.value)
                              getNumerosSection(niveau, e.target.value)
                              // getNumerosSection(e.target.value)
                            }}
                          >
                            {
                              sections.map((s) =>
                                <MenuItem value={s.section} key={s.id}>
                                  {s.section}
                                </MenuItem>
                              )
                            }
                          </Select>
                        </div>
                      )
                  }
                  <div>
                    <p style={{ fontSize: 20 }}>Numéro:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={numero}
                      onChange={e => {
                        setNumero(e.target.value)
                        getListEtud(e.target.value)

                      }}
                    >
                      {
                        numeros.map((n) =>
                          <MenuItem value={n["Numéro des classes"]} key={n.id}>
                            {
                              n['Numéro des classes']
                            }
                          </MenuItem>
                        )
                      }
                    </Select>
                  </div>
                </div>
              )
          }
        </center>

        <br />
        <br />
        <br />
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}  > {show ? "Liste des Etudiants" : null} </h2>
        {tableLoading ?
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <center><CircularProgress size={40} /></center>
            </Grid>
          </Grid>
          :
          show ?
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <MUIDataTable
                  title="Liste des étudiants"
                  data={students}
                  columns={[
                    { name: 'fullName', label: 'Nom et prénom' },
                    { name: 'email', label: 'Email' },
                    { name: 'adresse', label: 'Adresse' },
                    {
                      name: "dateNaiss",
                      label: 'Date de naissance',
                      options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <p>{tableMeta.rowData[3].slice(8, 10) + '-' + tableMeta.rowData[3].slice(5, 7) + '-' + tableMeta.rowData[3].slice(0, 4)}</p>
                          )
                        }
                      }
                    },
                    {
                      name: 'numTelParent', label: 'Téléphone Parent', options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <p>{value.length == 0 ? '-' : value[0].numTelParent}</p>
                          )
                        }
                      }
                    },
                    {
                      name: 'numUrgenceParent', label: 'Téléphone Parent (Urgence)', options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <p>{value.length == 0 ? '-' : value[0].numUrgenceParent}</p>
                          )
                        }
                      }
                    },
                    {
                      name: 'emailParent', label: 'Email Parent', options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <p>{value.length == 0 ? '-' : value[0].emailParent}</p>
                          )
                        }
                      }
                    }
                  ]}
                  options={{
                    filterType: "checkbox",
                    textLabels: {
                      body: {
                        noMatch: isLoading ?
                          <CircularProgress /> :
                          'Aucun élève dans cette classe',
                      },
                    },
                  }}
                />
              </Grid>

            </Grid>
            :
            null
        }
      </div>
    </div>
  );
}
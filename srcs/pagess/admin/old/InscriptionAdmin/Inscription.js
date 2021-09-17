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
  const [numeros, setNumeros] = useState([
    { id: 1, num: '1' },
    { id: 2, num: '2' },
    { id: 3, num: '3' }
  ])

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

  const [students, setStudents] = useState([
    { id: 2, fullName: 'Ahmed Ben Ahmed', Lieu: 'Tunis', Type: 'Primaire', DateNaiss: '19/11/2007', classe: '2ème année SI 1' },
    { id: 1, fullName: 'Khalil Ben Youssef', Lieu: 'Marsa', Type: 'Primaire', DateNaiss: '12/08/2003', classe: '1ère année 2' },
    { id: 3, fullName: 'Youssef Snoussi', Lieu: 'Mourouj', Type: 'Primaire', DateNaiss: '09/10/2003', classe: '3ème année SE 1' },
    { id: 4, fullName: 'Firas Ouertani', Lieu: 'Ariana', Type: 'Primaire', DateNaiss: '30/04/2004', classe: '4ème année Eco et Gestion 3' },
    { id: 5, fullName: 'Hamza Nafti', Lieu: 'Tunis', Type: 'Primaire', DateNaiss: '04/06/2004', classe: '5ème année Farachat' },
    { id: 6, fullName: 'Yasmine Mabrouk', Lieu: 'Boumhel', Type: 'Primaire', DateNaiss: '04/10/2004', classe: '6ème année Chajar' },
    { id: 7, fullName: 'Sarra Hannechi', Lieu: 'Megrine', Type: 'Collège', DateNaiss: '22/02/2005', classe: '7ème année 1' },
    { id: 8, fullName: 'Leith El Bahri', Lieu: 'Rades', Type: 'Collège', DateNaiss: '24/06/2005', classe: '8ème année 3' },
    { id: 9, fullName: 'Mourad El Kefi', Lieu: 'Zahra', Type: 'Collège', DateNaiss: '11/04/2006', classe: '9ème année 4' },
    { id: 10, fullName: 'Fatma Ben Abdallah', Lieu: 'Gammarth', Type: 'Secondaire', DateNaiss: '26/07/2006', classe: '1ère année 5' },
    { id: 11, fullName: 'Nermine Ben Aziza', Lieu: 'Tunis', Type: 'Secondaire', DateNaiss: '05/09/2006', classe: '2ème année 1' },
    { id: 12, fullName: 'Mouna Hamrouni', Lieu: 'Tunis', Type: 'Secondaire', DateNaiss: '18/09/2006', classe: '3ème année 1' },
    { id: 13, fullName: 'Louay Miled', Lieu: 'Tunis', Type: 'Secondaire', DateNaiss: '30/05/2007', classe: '4ème année 4' }
  ])

  const [sections, setSections] = useState([
    { id: 1, section: 'Science Informatique' },
    { id: 2, section: 'Science Exprimentale' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])

  const [numero, setNumero] = useState('')

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

  const getNumerosSection = async (sec) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niveau}/${sec}`)
      .then(res => {
        setNumeros(res.data)
      }, 2000)
      .catch((e) => {

      })
  }

  const getNumerosNiveau = async (niv) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/0`)
      .then(res => {
        console.log(res.data)
      }, 2000)
      .catch((e) => {

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
                  onClick={() => { setType(t.type) }}
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
                        if (type === "Primaire" || type === "Secondaire")
                          getNumerosNiveau(e.target.value)
                      }}
                    >
                      {
                        niveaux.map((n) =>
                          n.type === type ?
                            <MenuItem value={n.id} key={n.id}>
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
                            onChange={e => {
                              setSection(e.target.value)
                              // getNumerosSection(e.target.value)
                            }}
                          >
                            {
                              sections.map((s) =>
                                <MenuItem value={s.id} key={s.id}>
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
                        setShow(true)
                      }}
                    >
                      {
                        numeros.map((n) =>
                          <MenuItem value={n.num} key={n.id}>
                            {
                              n['num']
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
                    { name: 'Lieu', label: 'Lieu' },
                    { name: 'Type', label: 'Type d\'établissement' },
                    { name: 'DateNaiss', label: 'Date de naissance' },
                    // { name: 'classe', label: 'Classe' }
                  ]}
                  options={{
                    filterType: "checkbox",
                    textLabels: {
                      body: {
                        noMatch: isLoading ?
                          <CircularProgress /> :
                          'Désolé, il n\'y a aucune donnée correspondante à afficher',
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
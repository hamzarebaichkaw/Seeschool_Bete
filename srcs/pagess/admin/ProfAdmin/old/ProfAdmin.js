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
  const [sections, setSections] = useState([
    { id: 1, section: 'Science Informatique' },
    { id: 2, section: 'Science Exprimentale' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])

  const [numero, setNumero] = useState('')
  const [numeros, setNumeros] = useState([
    { id: 1, num: '1' },
    { id: 2, num: '2' },
    { id: 3, num: '3' }
  ])
  useEffect(function () {
    getStats()
  }, [])

  const getStats = async () => {
    const d = localStorage.getItem('user_id')

    setIsLoading(true)
    setListLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/AllProf`)
      .then(res => {
        setmat(res.data)
        
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
        setNumeros(res.data)
      }, 2000)
      .catch((e) => {

      })
  }


  function reg(niv,sec,num) {
   
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfMAdmin/BAC`)
      .then(res => {
        setmat(res.data)
        setIsLoading(false)
        console.log(res.data)
      }, 2000)
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
        <h1>Gestion Des Professeurs</h1>
        <Button variant="contained" href="http://localhost:3000/#/admin/Addprof"
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
          Inscrire un Professeur
          <AddCircleIcon />
        </Button>
        
      </div>
      <div style={{ marginTop: 50 }}>
        

        <br />
        <br />
        <br />
        
       
          
          
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <MUIDataTable
                  title="List Professeurs"
                  data={mat}
                  columns={[              
                  {name: "id", label: "ID"},
                  {name: "Nom et Prenom", label: "Nom et Prénom"},
                  {name: "email", label: "Matière"},
                  {name: "Telephone", label: "Telephone"},
                  {name: "matiere", label: "Matière"},
                  {name: "Description", label: "Description"}]}
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
      
      </div>
    </div>
  );
}
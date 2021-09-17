
import { Link, Button, Avatar, CircularProgress } from "../../../components/Wrappers/Wrappers";
import React, { useState, useEffect } from "react";
import {
  Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import axios from "axios";
import useStyles from "./styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import GetAppIcon from '@material-ui/icons/GetApp';

export default function EmploieProf() {

  const classes = useStyles();


  const [CoursM, seCoursM] = useState([]);
  const [emploie, setEmploie] = useState([]);
  const [fullName, setFullName] = useState('');
  const [matiereProf, setMatiereProf] = useState('');
  const [titreEmploie, setTitreEmploie] = useState('');
  const [lienEmploi, setLienEmploi] = useState('');
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getEmploi()
  }, []);

  async function getEmploi() {
    const d = localStorage.getItem('user_id')
    setLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/EmploisByProfs/15`)
      .then(res => {
        setEmploie(res.data[0].id)
        setFullName(res.data[0].fullname)
        setMatiereProf(res.data[0].MatièreProf)
        setTitreEmploie(res.data[0].titre_emploie)
        setLienEmploi(res.data[0].Lien_Emploi)
      }, 2000)
      .catch((e) => {
        console.log("ERROR: " + e)
      });
    setLoading(false)
  }

  return (
    <div>
      <h1>Emploi</h1>
      <div>
        <p style={{ textAlign: 'center', fontSize: '150%' }}>Emploie du temps: {loading ? <CircularProgress size={20} style={{ color: 'cyan' }} /> : titreEmploie}
          <br />
          Mr/Mrs. {loading ? <CircularProgress size={20} style={{ color: 'cyan' }} /> : fullName} | Matière: {loading ? <CircularProgress size={20} style={{ color: 'cyan' }} /> : matiereProf}
        </p>
        <div>

          <br /><br />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
              loading ?
                <CircularProgress size={30} style={{ color: 'cyan' }} />
                :
                (
                  <Button
                    href={emploie.photo}
                    target="_blank"
                    href={lienEmploi}
                    style={{
                      height: '500px',
                      borderRadius: 20,
                      width: '810px',
                      alignItems: 'center',
                      backgroundImage: 'url(https://media.discordapp.net/attachments/874871181092737066/878465496545107998/Untitled-1.png)',
                      border: 'solid'
                    }}
                  >
                    <center>
                      <div style={{ border: 'solid', borderRadius: 20, width: '110%', alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#4361ee' }}>
                        <GetAppIcon style={{ height: '50px', color: 'white', }} />
                        {/* <Form.File style={{}} id="exampleFormControlFile2" label="TELECHARGER"  /> */}
                        <h2 style={{ color: 'white', }}>Télécharger</h2>
                      </div>
                    </center>
                  </Button>
                )
            }
          </div>

        </div>

      </div>
    </div>
  )

}
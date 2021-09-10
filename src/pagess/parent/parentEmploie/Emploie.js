import React, { useState, useEffect } from "react"
import { Button, Grid } from "@material-ui/core"
import useStyles from "./styles"
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import axios from "axios"

export default function Emploi() {
  const classes = useStyles();
  const [emploie, setemploie] = useState([]);

  useEffect(() => {
    getEmploi()
  }, []);

  async function getEmploi() {
    // const d = localStorage.getItem('child_id')
    const d = localStorage.getItem('user_id')
    await axios
    //http://www.pointofsaleseedigitalaency.xyz/public/APIUser/EmploisByStudent/${d}
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/EmploisByStudent/${d}`)
      .then(res => {
        setemploie(res.data[0])
      }, 2000)
      .catch((e) => {
        console.log("ERROR: " + e)
      });
  }

  return (
    <div>
      <h1>Emploi</h1>
      <div>
        <p style={{ textAlign: 'center', fontSize: '150%' }}>Emploie du temps
          <br />
          Semaine n°2 (20mars-27mars 2021)
        </p>
        <div>

          <br /><br />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              href={emploie.photo}
              target="_blank"
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
                <div style={{ border: 'solid', borderRadius: 20, width: '30%', alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#4361ee' }}>
                  <CloudUploadIcon style={{ height: '50px', color: 'white', }} />
                  {/* <Form.File style={{}} id="exampleFormControlFile2" label="TELECHARGER"  /> */}
                  <h2 style={{ color: 'white', }}>Télécharger</h2>
                </div>
              </center>
            </Button>
          </div>

        </div>

      </div>
    </div>

  );
}
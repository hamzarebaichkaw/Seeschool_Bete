import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers"
import { Form } from 'react-bootstrap';
import axios from "axios";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function ExamenProf() {

  const [profClasses, SetProfClasses] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [selectedClass, setSelectedClass] = useState()

  useEffect(() => {
    getProfClasses()
  }, [])

  const getProfClasses = async () => {
    // const current_prof = sessionStorage.getItem('user_id')
    setLoadingClasses(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/${current_prof}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/15`)
      .then(res => {
        SetProfClasses(res.data)
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingClasses(false)
  }

  const handleChange = (id_classe) => {
    setSelectedClass(id_classe)
  };


  return (

    <div>
      <h1>Gestion des examens</h1>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {
          loadingClasses ?
            <CircularProgress size={40} />
            :
            (
              profClasses.map((m) =>
                <Button onClick={() => {
                  handleChange(m.id)
                }}
                  style={
                    m.id === selectedClass ?
                      { backgroundColor: "#00b894", color: 'white', borderRadius: '10px', letterSpacing: 5 }
                      :
                      { backgroundColor: "#3a86ff", color: 'white', borderRadius: '10px', letterSpacing: 5 }
                  }> {m.Calsse}
                </Button>
              )
            )
        }

      </div>

      <br />
      <br />

      <div>
        <Form.Control as="select">
          <option>Selectionner une option</option>
          <option>Selectionner une option</option>
          <option>Selectionner une option</option>
          <option>Selectionner une option</option>
          <option>Selectionner une option</option>
        </Form.Control>
        <br />
        <br />
        <TextareaAutosize style={{ width: '1220px', paddingLeft: 5 }} aria-label="minimum height" rowsMin={7} placeholder="Saisie Votre Texte ..." />
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"

          style={{ backgroundColor: "#3a86ff", width: '100%' }}
        >
          Save
        </Button>
      </div>
    </div>
  )


}
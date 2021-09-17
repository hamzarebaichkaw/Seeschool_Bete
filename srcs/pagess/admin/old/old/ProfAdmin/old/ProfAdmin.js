import React, { useState } from "react";
import { Button } from "../../../components/Wrappers/Wrappers";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { CircularProgress } from "../../../components/Wrappers";
export default function ProfAdmin() {
  const [showText, setShowText] = useState(false);
  const onClick = () => setShowText(true);
  const [isLoading, setIsLoading] = useState(true);
  const [ischecked, setIsChecked] = useState(false);

  const [mat, setmat] = useState([]);

  function reg(nv) {
    setIsChecked(true)
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfMAdmin/${nv}`)
      .then(res => {
        setmat(res.data)
        setIsLoading(false)
        console.log(res.data)
      }, 2000)
  }

  const Text = () =>
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
      <Button style={{ backgroundColor: "#0E0D47", width: '150px' }}
        color="primary"
        variant="contained"
        onClick={() => { reg("bac") }}
      > Bac
        {/* {m.matieress } */}
      </Button>
      <Button style={{ backgroundColor: "#0E0D47", width: '150px' }}
        color="primary"
        variant="contained"
        onClick={() => { reg("3eme") }}
      > 3éme
        {/* {m.matieress } */}
      </Button>
      <Button style={{ backgroundColor: "#0E0D47", width: '150px' }}
        color="primary"
        variant="contained"
      // onClick={()=>{reg(m.id)}} 
      > 2éme
        {/* {m.matieress } */}
      </Button>
      <Button style={{ backgroundColor: "#0E0D47", width: '150px' }}
        color="primary"
        variant="contained"
      // onClick={()=>{reg(m.id)}} 
      > 1éme
        {/* {m.matieress } */}
      </Button>
    </div>;

  return (
    <div >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Maîtres / Maîtrises</h1>
        <Button variant="contained" color="secondary" href="http://localhost:3000/#/admin/Addprof" style={{ borderRadius: '20px', letterSpacing: 5, backgroundColor: '#9D0208', height: '50px' }}>
          Ajouter un niveau  <AddCircleIcon />
        </Button>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button style={{ backgroundColor: "#0E0D47", width: '150px' }}
          color="primary"
          variant="contained"
          onClick={onClick}
        > Secondaire
          {/* {m.matieress } */}
        </Button>

        <Button style={{ backgroundColor: "#0E0D47", width: '150px' }}
          color="primary"
          variant="contained"
        //onClick={onClick}
        > Collège
          {/* {m.matieress } */}
        </Button>

        <Button style={{ backgroundColor: "#0E0D47", width: '150px' }}
          color="primary"
          variant="contained"
        //onClick={onClick}
        > Primaire
          {/* {m.matieress } */}
        </Button>
      </div>

      <br /> <br /> <br />
      {showText ? <Text /> : null}
      <br />
      <br />
      <br />
      <div>
      {ischecked ? 
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Listes des professeurs"
              data={mat}
              columns={[
              {name: "id", label: "ID"},
              {name: "Nom & Prenom", label: "Nom & Prénom"},
              {name: "Matiere", label: "Matière"},
              {name: "Nombre des  Séances", label: "Nombre des Séances"},
            ]}
              options={{
                filterType: "checkbox",
                textLabels: {
                  body: {
                      noMatch:  isLoading ?
                      <CircularProgress />:
                   
                          'Désolé, il n\'y a aucune donnée correspondante à afficher',
                  },
                  
              },
              }}
            />
          </Grid>
        </Grid>
          :<></> }
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Grid, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Card, CardDeck } from 'react-bootstrap';
import axios from "axios";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

import Button from '@material-ui/core/Button';





// data
import mock from "../../dashboard/mock";
import { Rotate90DegreesCcwRounded } from "@material-ui/icons";
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
export default function AddEvent() {
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });
  const [CoursM, seCoursM] = useState([]);

  useEffect(function () {
    details()
  }, [])
  const details = async () => {

    const d = localStorage.getItem('user_id')
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
       
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Events/1`)
      .then(res => {
        seCoursM(res.data)
       
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      })

  };
  async function popup(id) {
    dispatch({ type: "OPEN_GRID" })

  }
  
  const [hover, setHover] = useState(false)
  const toggleHover = () => {
    setHover(!hover)
  }

  return (

    <div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Listes des Événements</h1>
          <Button variant="contained" href="http://localhost:3000/#/admin/eventadd"
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
            Ajouter Un Événement
            <AddCircleIcon />
          </Button>

        </div>
      </div>
      <br />
      <br />
      <br />

      <CardDeck >


        {
          CoursM.map(

            (m) => (
              <Grid item lg={4}>
        <Card style={{marginBottom:20}}>
                <Card.Img style={{ width: 500, height: 350 }} variant="top" src={m.photo} />

                <Card.Body style={{}}>
                  {/* <center> */}
                  <Card.Title>{m.Nom}</Card.Title>
                  <Card.Text>
                    {m.Description}
                  </Card.Text>
                  {/* </center> */}
                  <button style={{ backgroundColor: '#0E0D47', color: "white", width: '100%', borderRadius: 35, }}

                    onClick={
                      () => popup(["0"])}
                  >

                    Details </button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 1 mins ago</small>
                </Card.Footer>
              </Card>
              </Grid>
            ))
        }





      </CardDeck>

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={state.toggleGrid}
        onClose={() => dispatch({ type: "CLOSE_GRID" })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            component={"div"}
          >
            {/* <MUIDataTable
            title="Gestion des Congés"
            data={ mats }
            columns={[    "nombre absence",
            "date_absence"
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
          /> */}


            <h2>Details ! </h2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch({ type: "CLOSE_GRID" })}
            color="primary"
          >
            Fermer
          </Button>

        </DialogActions>
      </Dialog>

    </div>






  );
}




import React , { useState, useEffect }from "react";
import { Grid, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import {Card, CardDeck} from 'react-bootstrap';
import axios from "axios";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";





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

export default function Events() {
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
 
    const d= sessionStorage.getItem('user_id')
  await  axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Events/1`)
      .then(res => {
        seCoursM(res.data)
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      })
    
  };
  async function  popup  ( id  ) {
    dispatch({ type: "OPEN_GRID" })
  
  }
  // function  reg  ( id ) {
  //   console.log( id)
  //  const d= sessionStorage.getItem('user_id')
  //  dispatch({ type: "OPEN_GRID" })
 
  //   axios
  //     // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
  //     .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Events/1`)
  //     .then(res => {

  //       seCoursM(res.data)
  //     // console.log( res.data)
  //     }, 2000)
  
      
  // } 


  return (
  
<div>
<CardDeck >
 

  { 
    CoursM.map(

      (m)=>( 
        <Card>
        <Card.Img  variant="top" src= {m.photo} />
        <Card.Body>
          <Card.Title>{m.Nom}</Card.Title>
          <Card.Text>
          {m.Description}
          </Card.Text>
          <button style={{backgroundColor:'blue', borderRadius:20,color:"whitesmoke"}}
          
          onClick={
            () => popup(["0"]) }
        >
          
          Details </button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
  
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
                        'Sorry, there is no matching data to display',
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


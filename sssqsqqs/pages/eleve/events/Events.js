import React , { useState, useEffect }from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import {Card, CardDeck} from 'react-bootstrap';
import axios from "axios";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import mock from "../../dashboard/mock";


export default function Events() {

  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    const d= sessionStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Events/1`)
      .then(res => {
        seCoursM(res.data)
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);




  return (
  

<CardDeck >
 

  { 
    CoursM.map(

      (m)=>( 
        <Card>
        <Card.Img variant="top" src= {m.photo} />
        <Card.Body>
          <Card.Title>{m.Nom}</Card.Title>
          <Card.Text>
          {m.Description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
  
      ))
}

 
  
 

</CardDeck>

  );
}


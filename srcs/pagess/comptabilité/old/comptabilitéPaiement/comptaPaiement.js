import React, { useState, useEffect } from 'react'
import {  Button  } from "../../../components/Wrappers/Wrappers";
import { Grid,  } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { CircularProgress } from "../../../components/Wrappers"
import PieChartIcon from '@material-ui/icons/PieChart';
import {Select,MenuItem} from '@material-ui/core'
import TocIcon from '@material-ui/icons/Toc';
 
import ReactApexChart from './DonutCharts'

export default function ComptaPaiement() {
  const [isLoading, setIsLoading] = useState(true);
  const [mat, setmat] =useState([]);
  async function  reg  (  ) {
   const d = localStorage.getItem('user_id')
   setIsLoading(true)
   await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/PaimentCompt`)
      .then(res => {
     setmat(res.data)
      }, 2000)
      setIsLoading(false)
  } 
  const [showcharge, setshowcharge] = useState(false);
  const [ShowEntree, setShowEntree] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const onClick = () => setShowText(true);
  const onClicktable = () => setShowTable(true);
  const [type, setType] = useState('')
  const [types, setTypes] = useState([
    { id: 1, type: 'Entrée' },
    { id: 2, type: 'Change' },
    
  ])
  const [entrees, setentree] = useState([
    { id: 1, type: 'Étudiant' },
    
    
  ])
  const [change, setchange] = useState([
    { id: 1, type: 'Étudiant' },
    { id: 2, type: 'Professeur' },
    { id: 3, type: 'Ouvriers' },
    { id: 4, type: 'Autre Change' },
    
    
  ])
  const [pay,setPay] = useState ([])
  const [showlist,setshowlist]= useState("none")


  const Entree  = () =>
  <div  >
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Etudiant
   </Button> 
   </div>;

  const Charge = () =>
  <div  >
<div style={{display:'flex', justifyContent:'space-evenly'}}>
    <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Etudiant
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Professeur
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Ouvriers
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Autre charge
   </Button> 
 </div>
   </div>;

  const Text = () =>
  <div  >
   <ReactApexChart />
   </div>;
const Table = () =>
<div  >
<Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion de paiement"
         data={  mat}
            columns={[ "id","Montant", "date de paiment","Status" ]}
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
 </div>;
    
    return(
    
    <div>
         <h1>Gestion de Paiement</h1>
         <br />
         <center>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
            {
              types.map((t) =>
                <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: '#0E0D47', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "rgb(157, 2, 8)", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => { setType(t.type)
                    if(t.type==="Entrée") {
                      
                      setPay(entrees)
                    setshowcharge(null)
                    setshowlist("block") 
                  // setShowEntree(!ShowEntree)
                }
                   else {
                    setPay(change)
                    setShowEntree(null) 
                    setshowlist("block") 
                 //   setshowcharge(!showcharge)
                   }
                   }}
                > {t.type}
                </Button>
              )
            }
    </div>
    </center>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div style={{display:showlist}}>
                   
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 850, height: 20, marginBottom: 80 }}
                      value={type}
                      onChange={e => {
                        
                        setType(e.target.value)
                        reg()
                       setShowTable(true) 
                        // if (type === "Primaire" || type === "Secondaire")
                        // getNumerosNiveau(e.target.value)
                      }}
                    >
                      {
                        pay.map((n) =>
                         
                            <MenuItem value={n.id} key={n.id}>
                              {n.type}
                            </MenuItem> 
                        )
                      }
                    </Select>
                  </div>
                </div>
         <br />   <br />
         {ShowEntree ? <Entree /> : null}
    {showcharge ? <Charge /> : null}

    {/* <div style={{display:'flex', justifyContent:'space-evenly'}}>
    <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Etudiant
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Professeur
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Ouvriers
   </Button> 
   <Button style={{backgroundColor: "grey",width:'150px'}}
     color="primary"
     variant="contained"
    //   onClick={()=>{reg("1")}} 
   > Autre charge
   </Button> 
 </div> */}

 <br />
    <br />
    
    {/* <Donut /> */}
    {showText ? 
    <div >
   <div style={{ justifyContent : "flex-end",float:"right" }}>
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
     onClick={()=>{{reg()};
             setShowTable(!showTable) 
             setShowText(null)
     }}
   >  <TocIcon/> Tableau 
   </Button> 
   
     
   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    
     onClick={()=>{
      setShowTable(null) 
      setShowText(!showText)}
    
    }
   > <PieChartIcon/> Chart
   </Button>
      </div>


     <Text />
     </div> : null}
    {showTable ?
    <>
      <div style={{ justifyContent : "flex-end",float:"right" }}>
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
     onClick={()=>{{reg()};
             setShowTable(!showTable) 
             setShowText(null)
     }}
   > <TocIcon/> Tableau 
   </Button> 
   
   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      
      
   <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
    
     onClick={()=>{
      setShowTable(null) 
      setShowText(!showText)}
    
    }
   > <PieChartIcon/> Chart
   </Button>
      </div>

    <Table /> 
    </>
    
    
    : null}
         <br />
         <br />
         <div>
         {/* <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion de paiement"
         data={  mat}
            columns={[ "id","Montant", "date de paiment","Status" ]}
            options={{
              filterType: "checkbox"
            }}
          />
        </Grid>
      </Grid> */}
         </div>
    </div>
     
    )
}
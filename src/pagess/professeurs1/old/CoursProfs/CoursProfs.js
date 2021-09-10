import React from 'react';
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import useStyles from "./styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


export default function CoursProfs(){
    const classes = useStyles();
    


return(
    <div>
        <h1>Gestion des cours</h1>
        <br />
        <br />
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <Button  
  style={{backgroundColor: "#3a86ff",borderRadius:'20px', letterSpacing:5,}}
  color="primary"
  variant="contained"
  className={classes.button}
  
>
Bac Maths
</Button>
<Button  
  style={{backgroundColor: "grey",borderRadius:'20px', letterSpacing:5,}}
  color="primary"
  variant="contained"
  className={classes.button}
  
>
3éme Maths
</Button>
<Button  
  style={{backgroundColor: "grey",borderRadius:'20px', letterSpacing:5,}}
  color="primary"
  variant="contained"
  className={classes.button}
  
>
3éme technique
</Button>
<Button  
  style={{backgroundColor: "grey",borderRadius:'20px', letterSpacing:5,}}
  color="primary"
  variant="contained"
  className={classes.button}
  
>
1ére
</Button>
        </div>
        <br />
        <br />
        <div style={{border:'Dashed' , color:'#3a86ff', height:'250px', display:'flex', justifyContent:'center'}}>
        <Button  
  style={{backgroundColor: "",borderRadius:'20px', letterSpacing:5,marginTop:'90px', height:'30px'}}
  color="primary"
  variant="contained"

  
>
<CloudUploadIcon />

Glissez - Deposez ici ou parcourez
</Button>

        </div>
        <br />
<Button
              color="primary"
              variant="contained"
             
              style={{backgroundColor: "#3a86ff",width:'100%'}}
            >
              Save
            </Button>
    </div>
)

}
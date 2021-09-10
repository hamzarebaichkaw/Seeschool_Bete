import React , { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import mock from '../../draggablegrid/mock';
import axios from "axios";
import StarsIcon from '@material-ui/icons/Stars';







export default function ChooseCHild() {






return(
<div>

<div>
    <br />    <br />
<div style={{textAlign:'center',  alignItems:'center', display:'flex', justifyContent:'center',}}>



<h2 style={{borderRadius:40, backgroundColor:'#ff8080', textAlign:'center', color:'white', alignItems:'center', display:'flex', justifyContent:'center',height:'75px', width:'550px'}} >  Choose Your Child </h2>


</div>

</div>

<br />    <br />

<div style={{display:'flex', justifyContent:'space-around'}}>
<a href="http://localhost:3000/#/parent/profile">
<img src="https://www.nordinfo.com/wp-content/uploads/2017/02/2015-11-12-04-08-40-Collecte.jpg" alt="Child pic" style={{borderRadius:150}} />
</a>
<a href="http://localhost:3000/#/parent/profile">
<img src="https://c8.alamy.com/compfr/pp9jtx/garcon-victime-d-intimidation-a-l-ecole-les-jeunes-eleves-se-moquer-d-un-jeune-garcon-a-l-ecole-secondaire-pp9jtx.jpg" alt="Child pic" style={{borderRadius:150, height:'350px', width:'300px'}} />
</a>
</div>



</div>




)


}
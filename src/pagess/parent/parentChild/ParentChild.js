// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import './parentFooter'
// import Footer from './parentFooter';
// import { Grid } from '@material-ui/core';

// export default function ChooseCHild() {

//     const [user, setUser] = useState({})
//     const [id_parent, setid_parent] = useState('')

//     const getUserById = async (id_parent , id_kid) => {
//         // console.log(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/${id_parent}`)
//         // const d = localStorage.getItem('user_id')
//         // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/${d}`)     
//       await  axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ParentsByKids/10`)

//      //   axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ParentsByKids/${d}/10/${id_parent}`)
//             .then((res) => setUser(res.data[0]))
//             // console.log(id_kid)
//             .catch((err) => console.log(err));
//     };

//     useEffect(() => { getUserById(); }, []);

//     // const getphotos = () => {
//     //     const d = localStorage.getItem('user_id')
//     //     // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByStudent/${d}`)    
//     //     axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByStudent/${d}`)
//     //         .then((res) => setphotos(res.data["0"]))

//     //         .catch((err) => console.log(err));

//     // };
//     // // console.log("photos",getMatiere())
//     // useEffect(() => { getphotos(); }, []);
// // style={{ backgroundColor: '#4361ee', }}

//     return (

//             <div >
// <Grid item xs={12}>
//                 <div>
//                     <br />    <br />
//                     <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center', }}>



//                         <h2 style={{ borderRadius: 40, backgroundColor: 'black', textAlign: 'center', color: 'white', alignItems: 'center', display: 'flex', justifyContent: 'center', height: '75px', width: '550px' }} >  Choose Your Child </h2>


//                     </div>

//                 </div>
//                 <br /><br /><br />
//                 {/* style={{ width: '100px', height: '20px', textAlign: 'center', backgroundColor: 'black', color: 'white', borderRadius: 25, alignItems: 'center' }} */}
//                 <div>
//                     <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//                         <ul>
//                         <li  >
//                             {user.fullName}
//                             </li>
//                             <br /> <br />
//                             <li  >
//                             {user.username}
//                         </li>
//                         <br /> <br />
//                             <li  >
//                             {user.email}
//                         </li>
//                         <br /> <br />
//                             <li  >
//                             {user.phone}
//                         </li>
//                         </ul>
//                         <a href="http://localhost:3000/#/parent/profile">
//                             {/* {user.map(post =>
//                         {post.photo.map(o => 
//           <img  src={o.photo_kid}alt="Child pic" style={{ borderRadius: 150 }} />
//          )})}    */}
//        {/* <img  src={user.photo} alt="Child pic" style={{ borderRadius: 150 }} /> */}
//                         </a>

//                     </div>
// {/* m.photo.map(g) => g.photo_kid
// m.photo.map(g) => [0] */}
//                 </div>
//                 <br /><br />
//                 {/* <Footer></Footer> */}
//                 </Grid>
//             </div>





//     )


// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));





export default function ChooseCHild() {
    const classes = useStyles();

    const [user, setUser] = useState([])
    const [id_parent, setid_parent] = useState('')

    const getUserById = async () => {
        console.log(user)
        // const d = localStorage.getItem('child_id')

        await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ParentsByKids/10`)

            //   axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ParentsByKids/10/${d}`)
            .then((res) => {
                setUser(res.data)
                console.log(res.data)
            })
            // console.log(id_kid)
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUserById()
    }, []);





    return (
        <div>
            <br /> <br />
            <h2 style={{display:'flex', justifyContent:'center'}} >Choisissez votre enfant</h2>
            <br /> <br />
            <div className={classes.root}>
                {
                    user.map((k) => {
                        return (
                            <a href="http://localhost:3000/#/parent/profile" onClick={localStorage.setItem('child_id', k.id)}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <a href="http://localhost:3000/#/parent/profile">
                                                <img src={k.photo[0].photo_kid} alt="Child Picture" style={{ borderRadius: 150 }} />
                                            </a>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                             
                                                <Typography gutterBottom variant="subtitle1">
                                                <div style={{textAlign:'center', fontSize:'60px'}}>
                                                    {k.fullName}
                                                    </div>
                                                </Typography>
                                               
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
}
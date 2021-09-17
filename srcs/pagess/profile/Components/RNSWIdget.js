import React , { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid , Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,} from "@material-ui/core";
import { Bookmark as BookmarkIcon } from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import rnsHero from "../../../images/profile/rnsHero.png";
import axios from "axios";
import PostAddIcon from '@material-ui/icons/PostAdd';
const styles = (theme) => ({
  header: {
    fontSize: 18,
    fontWeight: 500,
  },
  rnsImgWrap: {
    '& img': {
      maxWidth: '100%',
    },
  },
  author: {
    opacity: .8,
    fontSize: 12,
  },
  text: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  date: {
    opacity: .6,
    fontSize: 12,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconColor: {
    color: '#FFC35F',
    padding: 0,
  },
})
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

const RNSWidget = ({ classes }) => {
  const [CoursM, seCoursM] = useState([]);
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });
  useEffect(function () {
    details()
  }, [])
  const details = async () => {
 
    const d = localStorage.getItem('user_id')
  await  axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Events/${d}`)
      .then(res => {
        seCoursM(res.data[0])
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      })
    
  };
  async function  popup  ( id  ) {
    dispatch({ type: "OPEN_GRID" })
  
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
<div style={{display:'flex', justifyContent:'space-between'}} >
        <span className={classes.header}>Derniers Evenements</span>
        <Button variant="contained" color="primary" disableElevation href="http://localhost:3000/#/app/events">
  Plus d'Evenements <PostAddIcon />
</Button>
        </div>
      
     
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <div className={classes.rnsImgWrap}>
          <img src={CoursM.photo} alt="RNS" />
        </div>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <div>
          <span className={classes.author}>{CoursM.Nom}</span>
          <p className={classes.text} >{CoursM.Description}</p>
          <div className={classes.flexContainer}>
            <span className={classes.date}>11 Sep 2020 | 5 min read</span>
            <IconButton classes={{ root: classes.iconColor }} aria-label="bookmark">
              <BookmarkIcon/>
            </IconButton>
           
          </div>
          
        </div>
      </Grid>
      <br />
            <button style={{backgroundColor:'#4361ee',color:"white", width:'100%', borderRadius:35,}}
            color="primary"
          onClick={
            () => popup(["0"]) }
        >
          
          Details </button>
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
    </Grid>
  )
}

export default withStyles(styles)(RNSWidget);
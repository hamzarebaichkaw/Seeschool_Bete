import React, { useState, useEffect } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FolderBlue from '../Icons/FolderBlue';
import FolderBlueDark from '../Icons/FolderBlueDark';
import FolderRed from '../Icons/FolderRed';
import FolderRedDark from '../Icons/FolderRedDark';
import FolderGreen from '../Icons/FolderGreen';
import FolderGreenDark from '../Icons/FolderGreenDark';
import FolderYellow from '../Icons/FolderYellow';
import FolderYellowDark from '../Icons/FolderYellowDark';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import axios from "axios";
import FolderIcon from '@material-ui/icons/Folder';
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import { Link, Button, Avatar } from "../../../components/Wrappers/Wrappers";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Grid,

  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

} from "@material-ui/core";
import MUIDataTable from "mui-datatables";



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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AntTabs = withStyles((theme) => ({
  root: {
    borderBottom: `1px solid rgba(185, 185, 185, 0.3)`,
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontSize: '14px',
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(0),
    color: theme.palette.text.primary,
    fontFamily: [
      'Roboto',
      'sans-serif'
    ].join(','),
    '&:hover': {
      color: theme.palette.text.primary,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.text.primary,
    },
    '&:focus': {
      color: theme.palette.text.primary,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    '& .react-swipeable-view-container': {
      transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important'
    },
    paddingBottom: 0,
  },
  codeComponent: {
    flexGrow: 1,
    borderRadius: '10px',
    backgroundColor: 'red',
    border: '3px solid black',
    // '&::-webkit-scrollbar': {
    //   width: '6px'
    // },
    '&:: -webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 7px rgba(0,0,0,.3)',
      borderRadius: '10px',
      backgroundColor: '#F5F5F5'
    },
    '&:: -webkit-scrollbar': {
      width: '5px',
      backgroundColor: '#F5F5F5',
      borderRadius: '10px'
    },
    '&:: -webkit-scrollbar-thumb': {
      width: '4px',
      height: '5px',
      borderRadius: '10px',
      '-webkit-box-shadow': 'inset 0 0 7px rgba(0,0,0,.3)',
      backgroundColor: 'white'
    }
  },
  padding: {
    padding: theme.spacing(3),
    paddingBottom: 0,
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  folderWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
  }
})

function CustomizedTabs({ classes }) {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState(0);
  const [index, setIndex] = React.useState(0);

  const handleChange = (event, index) => {
    setIndex(index)
  }

  const handleChangeIndex = (index) => {
    setIndex(index)
  }

  // eslint-disable-next-line no-unused-vars
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const theme = useTheme();





  const [isLoading, setIsLoading] = useState(true);
  const [CoursM, seCoursM] = useState([]);



  useEffect(function () {
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .then(res => {
        seCoursM(res.data.result)
        // console.log(res.data.result)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  const [mat, setmat] = useState([]);
  function reg(id, typ) {
    dispatch({ type: "OPEN_GRID" })
    setIsLoading(true)
    console.log(id)
    const d = localStorage.getItem('user_id')
    var inter = []
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .then(res => {
        res.data.map((e) => {
          if (e.type === typ) {
            inter.push(e)
          }
          setIsLoading(false)
        })

        setmat(inter)
        console.log(inter)
        // console.log( res.data)
      }, 2000)


  }
  const [mati, setMati] = useState("")
  const [type, setType] = useState('')
  const [types, setTypes] = useState([
    { id: 1, type: 'Cours' },
    { id: 2, type: 'Exercices' },

  ])

  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });



  return (
    <div class={classes.root}>
      <AntTabs
        value={index}
        onChange={handleChange}
      >
        <AntTab value={0} label="Matiere" />
        <AntTab value={1} label="Exercice" />
        {/* <AntTab value={2} label="Social" /> */}
      </AntTabs>
      <SwipeableViews
        index={index}
        style={{ padding: '24px 0 0 ' }}
        onChangeIndex={handleChangeIndex}
      >



        {/*     
           {

CoursM.map(

  (m)=>( 

    
       <span >

       <TabPanel  >
           <div style={{display:'flex', justifyContent:'space-between'}}>
              {/* <FolderBlueDark title="UI/UX" label="Mati??re" value={m.matieress }     onClick={()=>{reg(m.id)}}  />  */}
        {/* <FolderBlue  title="UI/UX" label="Matiere" value=   {m.matieress }  onClick={()=>{reg(m.id)}} />
               </div>
           </TabPanel>
           
       </span>
     
        
        //  onClick={()=>{reg(m.id)}}  
    
          
      
         
 

       )

       ) } */}

        <TabPanel>

          <span className={classes.folderWrapper}>
            {


              CoursM.map(

                (m) => (


                  theme.palette.type === "dark",
                  <IconButton
                    onClick={
                      () => reg([m.id])}
                    onChange={e => {
                      setMati(e.target.value)
                      reg(e.target.value, type)
                    }}

                  >

                    <FolderBlue value={m.id} key={m.id} title="Matiere" label="" value={m.matieress} onClick={() => { reg(m.id) }} />

                  </IconButton>

                )

              )}


            {/* <div>
            {theme.palette.type === "dark" 
              ? <FolderRedDark title="Design" label="files" value={154} /> 
              : <FolderRed title="Design" label="files" value={154} />
            }
          </div>
          <div>
            {theme.palette.type === "dark" 
              ? <FolderGreenDark title="Mobile" label="files" value={98} /> 
              : <FolderGreen title="Mobile" label="files" value={98} />
            }
          </div>
          <div>
            {theme.palette.type === "dark" 
              ? <FolderYellowDark title="Illustration" label="files" value={154} /> 
              : <FolderYellow title="Illustration" label="files" value={154} />
            }
          </div> */


              <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={state.toggleGrid}
                onClose={() => dispatch({ type: "CLOSE_GRID" })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Absence"}</DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    component={"div"}
                  >
                    <MUIDataTable
                      title="Gestion des cours"
                      data={mat}
                      columns={["Matiere",
                        "type", "Fichier", "date_fin",
                      ]}
                      options={{
                        filterType: "checkbox",

                        textLabels: {
                          body: {
                            noMatch: isLoading ?
                              <CircularProgress /> :
                              'Sorry, there is no matching data to display',
                          },
                        },
                      }}
                    />
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

            }
          </span>
        </TabPanel>
        <TabPanel>
          <span className={classes.folderWrapper}>
            <div>
              {theme.palette.type === "dark"
                ? <FolderBlueDark title="UI/UX" label="files" value={178} />
                : <FolderBlue title="UI/UX" label="files" value={178} />
              }
            </div>
            <div>
              {theme.palette.type === "dark"
                ? <FolderRedDark title="Design" label="files" value={154} />
                : <FolderRed title="Design" label="files" value={154} />
              }
            </div>
            <div>
              {theme.palette.type === "dark"
                ? <FolderGreenDark title="Mobile" label="files" value={98} />
                : <FolderGreen title="Mobile" label="files" value={98} />
              }
            </div>
            <div>
              {theme.palette.type === "dark"
                ? <FolderYellowDark title="Illustration" label="files" value={154} />
                : <FolderYellow title="Illustration" label="files" value={154} />
              }
            </div>
          </span>
        </TabPanel>
        {/* <TabPanel>
          <span className={classes.folderWrapper}>
          <div>
            {theme.palette.type === "dark" 
              ? <FolderBlueDark title="UI/UX" label="files" value={178} /> 
              : <FolderBlue title="UI/UX" label="files" value={178} />
            }
          </div>
          <div>
            {theme.palette.type === "dark" 
              ? <FolderRedDark title="Design" label="files" value={154} /> 
              : <FolderRed title="Design" label="files" value={154} />
            }
          </div>
          <div>
            {theme.palette.type === "dark" 
              ? <FolderGreenDark title="Mobile" label="files" value={98} /> 
              : <FolderGreen title="Mobile" label="files" value={98} />
            }
          </div>
          <div>
            {theme.palette.type === "dark" 
              ? <FolderYellowDark title="Illustration" label="files" value={154} /> 
              : <FolderYellow title="Illustration" label="files" value={154} />
            }
          </div>
          </span>
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}

export default withStyles(styles)(CustomizedTabs);

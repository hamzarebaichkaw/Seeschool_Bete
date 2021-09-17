import React, { useState, useEffect } from 'react';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import ToDoItem from './ToDoItem';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
        <Box style={{ background: index % 2 === 0 && '#E1EFFF' }} p={0}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AntTabs = withStyles((theme) => ({
  root: {
    borderBottom: `1px solid rgba(185, 185, 185, 0.3)`,
    margin: '0 24px',
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
    marginRight: theme.spacing(4),
    color: theme.palette.text.primary,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    '&:hover': {
      color: theme.palette.text.primary,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.text.primary,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const styles = (theme) => ({
  root: {
    maxHeight: 575,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    overflow: 'auto',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      width: '3px',
    },
    '&::-webkit-scrollbar-track': {
      width: '3px',
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#D8D8D8',
      borderRadius: 5,
      outline: '1px solid #D8D8D8',
    },
    flexGrow: 1,
    '& .react-swipeable-view-container': {
      transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important'
    },
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  folderWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
})

function AddTodo({ classes }) {

  const [index, setIndex] = React.useState(0);

  const [homeworks, setHomeWorks] = useState([]);
  const [homeworksadd, setHomeWorksadd] = useState([]);
  useEffect(function () {
    axios
      .get('http://www.pointofsaleseedigitalaency.xyz/public/APIUser/HomeWork/1')
      .then(res => {
        setHomeWorks(res.data)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
console.log(homeworks);
  const handleChange = (event, index) => {
    setIndex(index)
  }

  const handleChangeIndex = (index) => {
    setIndex(index)
  }

  const Todos = [
    { color: '#FFC35F', time: '10.20', title: 'Call conference with a New' },
    { color: '#536DFE', time: '10.30', title: 'Presentation Demo Ecological' },
    { color: '#3CD4A0', time: '10.50', title: 'Call with PR Manager' },
    { color: '#FFC35F', time: '11.10', title: 'Interview with a new UI/UX' },
    { color: '#FF5C93', time: '11.30', title: 'Call conference with a New' },
    { color: '#536DFE', time: '12.00', title: 'Presentation Demo Ecological' },
    { color: '#FFC35F', time: '12.40', title: 'Sales Presentation' },
    { color: '#3CD4A0', time: '13.20', title: 'Call conference in New-York' },
    { color: '#FFC35F', time: '15.20', title: 'Development of the new Widget' },
    { color: '#536DFE', time: '16.00', title: 'Code review and refactoring' },
    { color: '#FFC35F', time: '10.20', title: 'Call conference with a New' },
    { color: '#536DFE', time: '10.30', title: 'Presentation Demo Ecological' },
    { color: '#3CD4A0', time: '10.50', title: 'Call with PR Manager' },
    { color: '#FFC35F', time: '11.10', title: 'Interview with a new UI/UX' },
    { color: '#FF5C93', time: '11.30', title: 'Call conference with a New' },
    { color: '#536DFE', time: '12.00', title: 'Presentation Demo Ecological' },
    { color: '#FFC35F', time: '12.40', title: 'Sales Presentation' },
    { color: '#3CD4A0', time: '13.20', title: 'Call conference in New-York' },
    { color: '#FFC35F', time: '15.20', title: 'Development of the new Widget' },
    { color: '#536DFE', time: '16.00', title: 'Code review and refactoring' },
  ]

  var [idtask, setidtask] = useState("");

  var [Name, setName] = useState("");
  // var [Description, setDescription] = useState("");
  // var [Create_At, setCreate_At] = useState("");
  
  




  function Addtasks(Name,

      ){

        axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/devoires', 
            
            {
                "Name": Name,
      
                // "Description": Description,
                // "Create_At": Create_At,              
               
            })
            .then( 

              res => {
                  console.log(res.data)
                  
                
                   setidtask(res.data.id)
                
                }

            )

      }


  return (
    <div className={classes.root}>
      <AntTabs
        value={index}
        onChange={handleChange}
      >
        <AntTab value={0} label="Today" />
        <AntTab value={1} label="This week" />
        <AntTab value={2} label="This month" />
      </AntTabs>
<br />


      <SwipeableViews
        index={index}
        style={{ padding: 0 }}
        onChangeIndex={handleChangeIndex}
      >
             

{/* 
<TextField id="outlined-basic" label="Outlined" variant="outlined"   value={homeworksadd} style={{width:'100%'}}
 onChange={e => setHomeWorksadd(e.target.value)}     /> 

<TextField id="outlined-basic" label="Outlined" variant="outlined"   value={homeworksadd} style={{width:'100%'}}
 onChange={e => setHomeWorksadd(e.target.value)} /> 
 
<TextField id="outlined-basic" label="Outlined" variant="outlined"   value={homeworksadd} style={{width:'100%'}}
 onChange={e => setHomeWorksadd(e.target.value)} /> 
 */}



        <TabPanel style={{ padding: 0 }}>
           
<TextField id="outlined-basic" label="ADD your tasks" variant="outlined"   style={{width:'100%'}}
 onChange={e => setName(e.target.value)}  /> 
 <button style={{height:'55px'}}       onClick={() => {
                                                 Addtasks(Name)
                                               
                                                }}>   <AddCircleOutlineIcon/> </button>
 <br /> <br />
 <TextField id="outlined-basic" label="ADD your tasks" variant="outlined"   style={{width:'100%'}}
 onChange={e => setName(e.target.value)}  /> 
 <button style={{height:'55px'}}    onClick={() => {
                                                 Addtasks(Name)
                                               
                                                }}>    <AddCircleOutlineIcon/> </button>
         {/* {homeworks.map((item, index) => ( */} <br /> <br />
          <TextField id="outlined-basic" label="ADD your tasks" variant="outlined"   style={{width:'100%'}}
 onChange={e => setName(e.target.value)}  /> 
 <button style={{height:'55px'}}    onClick={() => {
                                                 Addtasks(Name)
                                               
                                                }}>    <AddCircleOutlineIcon/> </button>
 <br /> <br />
          <TextField id="outlined-basic" label="ADD your tasks" variant="outlined"   style={{width:'100%'}}
 onChange={e => setName(e.target.value)}  /> 
 <button style={{height:'55px'}}   onClick={() => {
                                                 Addtasks(Name)
                                               
                                                }}>   <AddCircleOutlineIcon/> </button>
            {/* <ToDoItem key={index} title={item.nom} color={item.color} time={item.time} /> */}
          {/* ))}  */}
        </TabPanel>
        <TabPanel>
          {homeworks.map((item, index) => (
            <ToDoItem key={index} color={item.color} time={item.time} title={item.semestre} />
          ))}
        </TabPanel>
        <TabPanel>
          {homeworks.map((item, index) => (
            <ToDoItem key={index} color={item.color} time={item.time} title={item.type} />
          ))}
        </TabPanel> 
        
      </SwipeableViews>
    </div>
  );
}

export default withStyles(styles)(AddTodo);
import React from "react";
import  {
  Grid,
  Box,
  IconButton,
  Divider,
  Collapse,
  CardContent,
  TextField as Input
}from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import AccountCircle from '@material-ui/icons/AccountCircle';

// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import { Navigation as NavigationIcon } from "@material-ui/icons";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from "react-google-maps";
import {
  Favorite as LikeIcon,
  Chat as CommentsIcon,
  ChatBubble as ChatIcon,
  FreeBreakfast as BreakfastIcon
} from "@material-ui/icons";
import img1 from "../../../images/a2.jpg";
import img2 from "../../../images/a4.jpg";
import img3 from "../../../images/profile.jpg";
import img4 from "../../../images/a6.jpg";
import img5 from "../../../images/a1.jpg";
import mountains from "../../../images/mountains.jpeg";
import ShareIcon from '@material-ui/icons/Share';
//components
import { Typography, Avatar, Link, Button } from "../../../components/Wrappers";
import { Annotation, Timestep, Circle } from "../../../components/Timeline";
// data
import mock from "../../dashboard/mock";
import EditIcon from '@material-ui/icons/Edit';
import  ChatWidget  from '../../../components/ChatWidget/ChatWidget'
import FavoriteIcon from '@material-ui/icons/Favorite';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { divide } from "lodash";
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import CommentIcon from '@material-ui/icons/Comment';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import DetailsIcon from '@material-ui/icons/Details';

import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

import ImageIcon from '@material-ui/icons/Image';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlaceIcon from '@material-ui/icons/Place';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 500,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    width: 150,
    height: 150,
  },
  img: {
    margin: 'auto',
    display: 'flex',
    alignItems:'center',
    marginLeft:'150px',
    maxWidth: '200%',
    maxHeight: '200%',
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  },
}));


export default function Blogs() {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
  <div>
     <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}><Widget className={classes.adjustHeight} title="Chat">
              <ChatWidget />
            </Widget></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={17}
          defaultValue="What's on your Mind ?"
          variant="outlined"
          
        />
        
       <br /> <br />
       <div style={{display:'flex', justifyContent:'space-around'}}>
       <ImageIcon style={{color:'blue'}} />
       <MusicNoteIcon  style={{color:'#faa307'}}  />
       <VideoLibraryIcon style={{color:'#caffbf'}} />
       <PlaceIcon style={{color:'#ede0d4'}} />
       <MoreHorizIcon style={{color:'#264653'}} />
       <AddCircleIcon  style={{color:'blue', }} />
       </div>
</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}><div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={9}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="http://thoughtcatalog.com/wp-content/uploads/2014/07/shutterstock_141894295.jpg?w=786" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                 Hamza Rebai
                </Typography>
                <Typography variant="body2" gutterBottom>
                 4Math2
                </Typography>
                <Typography variant="body2" color="textSecondary">
                What a good time whith freinds
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer', display:'flex', justifyContent:'space-between' }}>
              <FavoriteBorderIcon  style={{color:'#e63946'}} />
              <ShareIcon style={{color:'blue'}} />
              <CommentIcon style={{color:'#ede0d4'}} />
              <AnnouncementIcon style={{color:'#8d99ae'}}  />
              <DeleteIcon style={{color:'#e63946'}}/>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"> 
               {/* <EditIcon/>   */} (Cool)
               </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div></Paper>
        </Grid>
     
      </Grid>
      <br /> <br />
      <div>
    <Box width={"100%"}>
                <Widget disableWidgetMenu inheritHeight>
                  <Box display={"flex"} flexDirection="column">
                    <Box display="flex">
                      <Avatar src={img1} style={{ marginRight: 8 }} />
                      <Typography block>
                        <Box fontWeight={"fontWeightBold"}>
                          <Link color="warning">Jessica Smith</Link> @jess
                        </Box>
                        <Box fontSize={".875rem"}>
                          February 22, 2014 at 01:59 PM
                        </Box>
                        <Box my={1}>
                          <Typography variant={"subtitle2"}>
                            Check out this awesome photo I made in Italy last
                            summer. Seems it was lost somewhere deep inside my
                            brand new HDD 40TB. Thanks god I found it!
                          </Typography>
                        </Box>
                      </Typography>
                    </Box>
                    <Box height={400} width={"100%"} mx={"-24px"} mt={2}>
                      <img
                        src={mountains}
                        alt="mountains"
                        style={{ height: "100%", width: "calc(100% + 48px)" }}
                      />
                    </Box>
                    <Box display="flex" ml={"-12px"} mt={1}>
                      <IconButton aria-label="like">
                        <LikeIcon />
                      </IconButton>
                      <IconButton aria-label="comments">
                        <CommentsIcon />
                      </IconButton>
                      <Box ml={"auto"} display={"flex"}>
                        <Avatar src={img1} />
                        <Avatar src={img2} style={{ marginLeft: 8 }} />
                        <Avatar src={img3} style={{ marginLeft: 8 }} />
                      </Box>
                    </Box>
                    <Divider className={classes.divider} />
                    <Box display="flex" my={2}>
                      <Avatar src={img5} style={{ marginRight: 8 }} />
                      <Typography block>
                        <Box
                          fontWeight={"fontWeightBold"}
                          display="flex"
                          alignItems="center"
                          fontSize={".77rem"}
                        >
                          <Link to="#" color="warning">
                            Ignacio Abad
                          </Link>{" "}
                          <Box
                            fontSize={".7rem"}
                            fontWeight="fontWeightRegular"
                            ml={1}
                          >
                            6 mins ago
                          </Box>
                        </Box>
                        <Box fontSize={".8rem"}>
                          Hey, have you heard anything about that?
                        </Box>
                      </Typography>
                    </Box>
                    <Divider className={classes.divider} />
                    <Box display="flex" mt={3}>
                      <Avatar color="warning" style={{ marginRight: 8 }}>
                        P
                      </Avatar>
                      <Input
                        placeholder="Write your comment..."
                        style={{ flexGrow: 1 }}
                      />
                        
                    </Box>
                   
                  </Box>
                  
                </Widget>
                <br />
                <br />
                <div style={{textAlign:'center'}}>
                <DetailsIcon />
                </div>
              </Box>
              
              </div>
      {/* <Grid container spacing={5}>
        {/* <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid> */}
          {/* <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid> */}
        {/* <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid> 
      </Grid> */}
    </div>
    {/* <div style={{backgroundColor:' '}}>

<div style={{display:'flex', justifyContent:'space-evenly'}}>

<div>
<Widget className={classes.adjustHeight} title="Chat">
              <ChatWidget />
            </Widget>
</div>


<div>


<TextField 
        className={classes.margin}
        id="input-with-icon-textfield"
        style={{width:'400px', height:'50px'}}
        label="TextField"
        InputProps={{
          startAdornment: (
    
            <InputAdornment position="start">
              <AccountCircle />
              
            </InputAdornment>
          
             
            
          ),
        }}
        
      />
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
      <IconButton> <PanoramaIcon/></IconButton>
      <IconButton> <PanoramaIcon/></IconButton>
      <IconButton> <PanoramaIcon/></IconButton>
      <IconButton> <PanoramaIcon/></IconButton>
      <IconButton> <PanoramaIcon/></IconButton>
      </div>
</div>
<div>


<Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://thumbs.dreamstime.com/b/portrait-des-b%C3%A2timents-scolaires-de-friends-standing-outside-d-%C3%A9tudiant-masculin-lyc%C3%A9e-134207241.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>


</div>


</div> */}



{/* <div>
    <Box width={"45%"}>
                <Widget disableWidgetMenu inheritHeight>
                  <Box display={"flex"} flexDirection="column">
                    <Box display="flex">
                      <Avatar src={img1} style={{ marginRight: 8 }} />
                      <Typography block>
                        <Box fontWeight={"fontWeightBold"}>
                          <Link color="warning">Jessica Smith</Link> @jess
                        </Box>
                        <Box fontSize={".875rem"}>
                          February 22, 2014 at 01:59 PM
                        </Box>
                        <Box my={1}>
                          <Typography variant={"subtitle2"}>
                            Check out this awesome photo I made in Italy last
                            summer. Seems it was lost somewhere deep inside my
                            brand new HDD 40TB. Thanks god I found it!
                          </Typography>
                        </Box>
                      </Typography>
                    </Box>
                    <Box height={400} width={"100%"} mx={"-24px"} mt={2}>
                      <img
                        src={mountains}
                        alt="mountains"
                        style={{ height: "100%", width: "calc(100% + 48px)" }}
                      />
                    </Box>
                    <Box display="flex" ml={"-12px"} mt={1}>
                      <IconButton aria-label="like">
                        <LikeIcon />
                      </IconButton>
                      <IconButton aria-label="comments">
                        <CommentsIcon />
                      </IconButton>
                      <Box ml={"auto"} display={"flex"}>
                        <Avatar src={img1} />
                        <Avatar src={img2} style={{ marginLeft: 8 }} />
                        <Avatar src={img3} style={{ marginLeft: 8 }} />
                      </Box>
                    </Box>
                    <Divider className={classes.divider} />
                    <Box display="flex" my={2}>
                      <Avatar src={img5} style={{ marginRight: 8 }} />
                      <Typography block>
                        <Box
                          fontWeight={"fontWeightBold"}
                          display="flex"
                          alignItems="center"
                          fontSize={".77rem"}
                        >
                          <Link to="#" color="warning">
                            Ignacio Abad
                          </Link>{" "}
                          <Box
                            fontSize={".7rem"}
                            fontWeight="fontWeightRegular"
                            ml={1}
                          >
                            6 mins ago
                          </Box>
                        </Box>
                        <Box fontSize={".8rem"}>
                          Hey, have you heard anything about that?
                        </Box>
                      </Typography>
                    </Box>
                    <Divider className={classes.divider} />
                    <Box display="flex" mt={3}>
                      <Avatar color="warning" style={{ marginRight: 8 }}>
                        P
                      </Avatar>
                      <Input
                        placeholder="Write your comment..."
                        style={{ flexGrow: 1 }}
                      />
                    </Box>
                  </Box>
                </Widget>
              </Box>
              
              </div> */}


    {/* </div> */}
  </div>
  );
}

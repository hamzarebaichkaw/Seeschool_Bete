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
 
import useStyles from "./styles";
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

//components
import { Typography, Avatar, Link, Button } from "../../../components/Wrappers";
import { Annotation, Timestep, Circle } from "../../../components/Timeline";
// data
import mock from "../../dashboard/mock";


export default function Blogs() {
  const classes = useStyles();
  return (
  <div>
    <h1>Blogs</h1>
    <div style={{backgroundColor:' '}}>

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
              



    </div>
  </div>
  );
}

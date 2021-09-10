import React from "react";
import {
  TextField as Input,
  Box
} from "@material-ui/core";

// components
import { Button, Typography } from "../Wrappers";

export default function ChatWidget() {
  return (
    <div>
      <div style={{paddingLeft: "8px"}}>
        <Box pb={1}>
          <Typography weight={"bold"}>Jane Hew</Typography>
          <Typography>Hey! How it's going?</Typography>
        </Box>
        <Box pb={1}>
          <Typography weight={"bold"}>Axel Pittman</Typography>
          <Typography>I'll definitely buy this template</Typography>
        </Box>
        <Box>
          <Typography weight={"bold"}>Sophia Fernandez</Typography>
          <Typography>What's the font-family?</Typography>
        </Box>
      </div>

      <Box display={"flex"} alignItems={"center"} px={3} py={1}>
        <Input
          id="message-input"
          margin="normal"
          placeholder={"Type a message"}
          style={{ flexGrow: 1 }}
        />
        <Button
          variant={"contained"}
          color={"primary"}
          style={{ marginLeft: 8 }}
        >
          Send
        </Button>
      </Box>
    </div>

  );
}

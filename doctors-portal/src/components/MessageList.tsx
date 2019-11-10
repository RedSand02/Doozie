import React from "react";
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme
} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import Message, { IMessage } from "./Message";
import { Typography } from "@material-ui/core";

export interface IMessageList {
  messages: IMessage[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "auto",
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    }
  })
);

export default function MessageList(props: IMessageList) {
  const theme = useTheme();
  const classes = useStyles(theme);

  if(props.messages.length < 1) {
    return(
      <Typography variant="subtitle1" gutterBottom>
        {"There are no messages to display"}
      </Typography>
    );
  }

  /* eslint-disable no-unused-expressions */
  return (
    <List className={classes.root}>
      {props.messages.map(message => {
        return (
          <div>
            <Message {...message} />
            <Divider variant="inset" component="li" />
          </div>
        )
      })}
    </List>
  );
}

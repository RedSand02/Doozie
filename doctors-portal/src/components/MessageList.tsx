import React from "react";
import { createStyles, Theme, makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { IProps } from "../scripts/common/base";

import Message from './Message';

export interface IMessageList extends IProps {

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

  return (
    <List className={classes.root}>
      <Message />
      <Divider variant="inset" component="li" />
      <Message />
      <Divider variant="inset" component="li" />
      <Message />
    </List>
  );
}

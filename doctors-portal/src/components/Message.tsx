import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { IProps } from "../scripts/common/base";
import { useTheme, makeStyles, createStyles } from "@material-ui/styles";
import { Theme, Typography } from "@material-ui/core";

export interface IMessage extends IProps {
  name: string;
  text: string;
  timestamp: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

const getInitials = function(string) {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const stringToHslColor = (str: string, s: number = 65, l: number = 60) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
};

export default function Message(props: IMessage) {
  const initials = getInitials(props.name);

  const useStyles = makeStyles((theme: Theme) => {
    const avatarBgColor = stringToHslColor(props.name);
    return createStyles({
      inline: {
        display: "inline"
      },
      avatarClass: {
        backgroundColor: avatarBgColor
      }
    });
  });

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.avatarClass}>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={
          <React.Fragment>
            {new Date(props.timestamp).toDateString()}
            <br />
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {props.text}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

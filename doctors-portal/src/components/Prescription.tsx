import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { IProps } from "../scripts/common/base";
import { useTheme, makeStyles, createStyles } from "@material-ui/styles";
import { Theme, Typography } from "@material-ui/core";

export interface IPrescription extends IProps {
    name: string;
    text: string;
    avatarSrc?: string;
    avatarAlt?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: 'inline',
    },
  }),
);

export default function Prescription(/*props: IPrescription*/) {
    const theme = useTheme();
    const classes = useStyles(theme);
  return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>SR</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Sandeep Reddy"
          secondary={
            <React.Fragment>
              {"24-01-2019"}
              <br/>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {"Whatsup guys, how are you doing :)"}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
  );
}

import React from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IDashboardCardDetails from '../dataDefinitions/dashboardCardDetails';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            width: 300,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

export default function Cards(props) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={10}>
                    {props.cards.map(card => (  
                        <Grid key={card.name} item>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
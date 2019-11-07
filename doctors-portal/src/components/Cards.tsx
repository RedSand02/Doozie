import React from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IDashboardCardDetails from '../dataDefinitions/dashboardCardDetails';
import { IProps } from '../scripts/common/base';

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

export interface ICards extends IProps {
    cards: IDashboardCardDetails[]
}

export default function Cards(props: ICards) {
    const theme = useTheme();
    const classes = useStyles(theme);

    const goToPage = (uri: string) => {
        if (uri !== ''){
            props.history.push(uri);
        }
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={10}>
                    {props.cards.map((card: IDashboardCardDetails) => (  
                        <Grid key={card.name} item>
                            <Card className={classes.card} onClick={() => goToPage(card.uri)}>
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
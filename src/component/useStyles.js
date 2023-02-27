import { makeStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function ButtonComponent() {
    const classes = useStyles();   // 생성
    return (
        <div >
            <Button variant="contained" color="primary" className={classes.margin}>
            </Button>
            <Button variant="contained" color="secondary" className={classes.margin}>
            </Button>

        </div>

    );
}

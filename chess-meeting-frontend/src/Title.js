import Typography from '@material-ui/core/Typography';

export default function Title(props) {
    return (
        <Typography style={props.style} component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );

}
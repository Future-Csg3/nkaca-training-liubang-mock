import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const HomeRoute: React.FC = () => {
    return (
        <>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={10} sx={{ marginTop: "15px" }}>

                    <Grid key="study" item>
                        <Button variant="contained" size="large" href='/study'>Study</Button>
                    </Grid>
                    <Grid key="admin" item>
                        <Button variant="contained" size="large" href='/admin'>Admin</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default HomeRoute;
import { Typography, Box, Grid } from "@mui/material";
import UserMenu from "../../Components/UserMenu";
import FolderList from "../../Components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";
export default function HomePage() {
  const data = useLoaderData();
  console.log(["HomePage"], data);
  return (
    <>
      <Typography variant='h4'>Note App</Typography>
      <Box display='flex' justifyContent='right' mb='1rem'>
        <UserMenu />
      </Box>
      <Grid
        container
        boxShadow='rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
        height='50vh'
      >
        <Grid xs={3} item>
          <FolderList folders={data.folders} />
        </Grid>
        <Grid xs={9} item>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

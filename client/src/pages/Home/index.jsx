import { Typography, Box, Grid } from "@mui/material";
import { Outlet, useLoaderData } from "react-router-dom";

import UserMenu from "../../components/UserMenu";
import FolderList from "../../components/FolderList";

export default function HomePage() {
  const data = useLoaderData();
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
        flexWrap='wrap'
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

import { Grid, Typography, Box, Card, CardContent, List } from "@mui/material";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
function NoteList() {
  const { noteId } = useParams();
  const data = useLoaderData()?.folder || [];
  console.log(
    ["NoteList"],
    data.notes.find(({ id }) => id === noteId)
  );
  return (
    <Grid height='100%' container>
      <Grid
        xs={4}
        width='100%'
        p='0.5rem'
        maxWidth='360px'
        bgcolor='#F0EBE3'
        item
      >
        <List
          subheader={
            <Box>
              <Typography fontWeight='bold' variant='h6' color='initial'>
                Notes
              </Typography>
            </Box>
          }
        >
          {data.notes.map(({ id, content }) => (
            <Link key={id} to={`note/${id}`}>
              <Card
                sx={{
                  mb: "0.5rem",
                  bgcolor: noteId === id ? "rgb(255 211 140)" : null,
                }}
              >
                <CardContent
                  sx={{
                    "&:last-child": {
                      pb: "0.5rem",
                    },
                    padding: "0.5rem",
                  }}
                >
                  <Typography textAlign='left' variant='p' color='initial'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 10) || "Empty!"}`,
                      }}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </List>
      </Grid>
      <Grid xs={8} item>
        <Outlet context={data.notes.find(({ id }) => id === noteId)} />
      </Grid>
    </Grid>
  );
}

export default NoteList;

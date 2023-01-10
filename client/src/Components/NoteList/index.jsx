import { Grid, Typography, Box, Card, CardContent, List } from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
function NoteList() {
  const { noteId } = useParams();
  const [activeId, setActiveId] = useState(noteId);
  console.log(["NoteList"], noteId);

  const folder = {
    notes: [
      {
        id: "1",
        content:
          "  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate laboriosam quo soluta nesciunt, porro consequatur nihil mollitia optio architecto dicta.</p>",
      },
    ],
  };
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
          {folder.notes.map(({ id, content }) => (
            <Link key={id} to={`note/${id}`} onClick={() => setActiveId(id)}>
              <Card
                sx={{ mb: "0.5rem", bgcolor: activeId === id ? "red" : null }}
              >
                <CardContent
                  sx={{
                    "&:last-child": {
                      pb: "0.5rem",
                    },
                    padding: "0.5rem",
                  }}
                >
                  <Typography variant='p' color='initial'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 25) || "Empty!"}...`,
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
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default NoteList;

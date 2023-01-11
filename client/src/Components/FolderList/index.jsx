import { Card, List, CardContent, Typography, Box } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function FolderList({ folders }) {
  const { folderId } = useParams();
  const [activeId, setActiveId] = useState(folderId);

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        padding: "0.5rem",
        textAlign: "left",
        overflow: "overlay",
        backgroundColor: "#7D9D9C",
      }}
      subheader={
        <Box>
          <Typography fontWeight='500' color='white'>
            Folders
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => (
        <Link key={id} to={`folders/${id}`} onClick={() => setActiveId(id)}>
          <Card
            sx={{
              mb: "0.5rem",
              bgcolor: activeId === id ? "rgb(255 211 140)" : null,
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
              <Typography variant='p' color='initial'>
                {name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </List>
  );
}

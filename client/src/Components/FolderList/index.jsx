import {
  Card,
  List,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import NewFolder from "../NewFolder";
import { DeleteOutline } from "@mui/icons-material";
import { removeFolder } from "../../utils/folderUtils";

export default function FolderList({ folders }) {
  const { folderId } = useParams();
  const [activeId, setActiveId] = useState(folderId);
  const handleDeleteFolder = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveId(null);
    const data = await removeFolder(id);
    console.log(data);
  };
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
        <Box
          display='flex'
          justifyContent='space-between'
          gap='0.5rem'
          alignItems='center'
        >
          <Typography fontWeight='500' color='white'>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {(folders || []).map(({ id, name }) => (
        <Link
          to={`folders/${id}`}
          onClick={() => {
            setActiveId(id);
          }}
          key={id}
        >
          <Card
            sx={{
              mb: "0.5rem",
              bgcolor: activeId === id ? "rgb(255 211 140)" : null,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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

            <CardContent
              sx={{
                "&:last-child": {
                  pb: "0.5rem",
                },
                padding: "0.5rem",
              }}
            >
              <IconButton
                onClick={(e) => handleDeleteFolder(e, id)}
                size='small'
              >
                <DeleteOutline />
              </IconButton>
            </CardContent>
          </Card>
        </Link>
      ))}
    </List>
  );
}

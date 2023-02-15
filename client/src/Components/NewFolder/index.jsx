import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { CreateNewFolderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import requestAddNewFolder from "./request";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function NewFolder() {
  const matches = useMediaQuery("(max-width:600px)");
  const [newFolderName, setNewFolderName] = useState("");
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const popupName = searchParams.get("popup");
  const navigate = useNavigate();
  const styleTextField = useMemo(() => {
    return matches ? "250px" : "400px";
  }, [matches]);

  const handleOpenPopup = () => {
    setSearchParams({ popup: "add-folder" });
  };
  const handleChangeNewFolderName = (e) => {
    setNewFolderName(e.target.value);
  };
  const handleClose = () => {
    // setOpen(false);
    setNewFolderName("");
    navigate(-1);
  };
  const handleSaveFolder = async () => {
    handleClose();
    const addFolder = await requestAddNewFolder(newFolderName);
    console.log(addFolder);
  };

  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [popupName]);

  return (
    <div>
      <Tooltip title='Add Folder' onClick={handleOpenPopup}>
        <IconButton size='small'>
          <CreateNewFolderOutlined
            sx={{
              color: "white",
            }}
          />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Folder Name'
            fullWidth
            size='small'
            variant='standard'
            sx={{ width: styleTextField }}
            autoComplete='off'
            value={newFolderName}
            onChange={handleChangeNewFolderName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveFolder}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

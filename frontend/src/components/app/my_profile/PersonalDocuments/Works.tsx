import {
  Paper,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  TextField,
  Icon,
  Divider,
  IconButton
} from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Table } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Works() {
  const [showBox, setShowBox] = useState<any>(false);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event:any) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Grid item xs={10}>
          <Paper elevation={3} sx={{ padding: "20px", textAlign: "initial" }}>
            <Grid
              container
              spacing={2}
              display="flex"
              justifyContent="space-evenly"
            >
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  textTransform="uppercase"
                  color="#936c6c"
                  fontWeight="bold"
                >
                  WORK
                </Typography>
                <Divider
                  variant="fullWidth"
                  sx={{ backgroundColor: "#424242" }}
                />
              </Grid>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#686C61", fontWeight: "bold" }}>
                      NAME
                    </TableCell>
                    <TableCell sx={{ color: "#686C61", fontWeight: "bold" }}>
                      UPLOADED BY
                    </TableCell>
                    <TableCell sx={{ color: "#686C61", fontWeight: "bold" }}>
                      UPLOADED ON
                    </TableCell>
                    <TableCell sx={{ color: "#686C61", fontWeight: "bold" }}>
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Box>
                <React.Fragment>
                  <Button
                    onClick={handleClickOpen}
                    sx={{
                      marginRight: "155vh",
                      marginTop: "10px",
                      color: "blue",
                    }}
                  >
                    <AddCircleOutlineIcon fontSize="large" /> Add
                  </Button>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      Add Work Document
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      <TextField
                        sx={{ width: "100%", marginTop: "40px" }}
                        id="standard-multiline-static"
                        multiline
                        rows={1}
                        placeholder="Enter Document Title"
                        variant="standard"
                      />
                      <TextField
                        sx={{ width: "100%", marginTop: "25px" }}
                        id="standard-multiline-static"
                        multiline
                        rows={1}
                        placeholder="Enter Document Description"
                        variant="standard"
                      />

                      <Box margin={3} marginLeft={-1}>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="raised-button-file"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                          <Button variant="contained" component="span">
                            Select File
                          </Button>
                        </label>
                        {selectedFile && (
                          <label>
                            <Typography variant="body1">
                              Selected File: {selectedFile.name}
                            </Typography>
                            <Typography variant="body1">
                              Selected Size: {selectedFile.size}
                            </Typography>
                          </label>
                        )}
                      </Box>
                      <Divider
                        variant="fullWidth"
                        sx={{ backgroundColor: "#424242", margin: "10px" }}
                      />
                      <Box
                        margin={2}
                        sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
                        marginLeft={15}
                      >
                        <Button onClick={handleClose} startIcon={<CloseIcon />}>
                          Close
                        </Button>
                        <Button
                          sx={{
                            bgcolor: "blue",
                            color: "white",
                            width: "80px",
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </DialogContent>
                  </BootstrapDialog>
                </React.Fragment>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Works;

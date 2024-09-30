import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Switch,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dayjs } from "dayjs";

// interface
interface Props {
  setValueForComponent: (value: number) => void;
  setFormDataForNext: (value: any) => void;
  setIsMandatoryInfoComplete: (complete: boolean) => void; // New prop for setting completion status
}

const Mandatory_info: React.FC<Props> = ({
  setValueForComponent,
  setFormDataForNext,
  setIsMandatoryInfoComplete,
}) => {
  // form for mandatory info
  const [formData, setFormData] = useState({
    hasPF: false,
    selectedDate: null as Dayjs | null,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, hasPF: e.target.checked }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prevData) => ({ ...prevData, selectedDate: date }));
  };

  const handleNext = () => {
    if (
      (formData.firstName && formData.lastName && formData.email) ||
      formData.phoneNumber
    ) {
      setValueForComponent(1);
      setFormDataForNext(formData);
      setIsMandatoryInfoComplete(true); // Update the completion status
    } else {
      // Optionally handle the case where some required fields are missing
      console.log("Please fill all required fields");
    }
  };

  return (
    <Box sx={{ p: 4, width: "750px" }}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          textAlign: "initial",
          boxShadow: "0px 3px 6px #00000029",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "9ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Pre-Onboarding
                </Typography>
                <Switch
                  checked={formData.hasPF}
                  onChange={handleSwitchChange}
                />
              </Box>
            </Grid>
          </Grid>

          <Divider />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                id="first-name"
                name="firstName"
                label="First Name"
                variant="standard"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="middle-name"
                name="middleName"
                label="Middle Name"
                variant="standard"
                fullWidth
                value={formData.middleName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="last-name"
                name="lastName"
                label="Last Name"
                variant="standard"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="email"
                name="email"
                label="Official Email ID"
                variant="standard"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="phone"
                name="phoneNumber"
                label="Phone Number"
                variant="standard"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>

            {formData.hasPF && (
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Choose Date"
                    value={formData.selectedDate}
                    onChange={handleDateChange}
                    slots={{
                      textField: (params) => (
                        <TextField {...params} size="small" />
                      ),
                    }}
                    slotProps={{
                      textField: {
                        sx: {
                          "& .MuiInputBase-root": {
                            height: "50px",
                            fontSize: "0.875rem",
                          },
                          "& .MuiFormLabel-root": {
                            fontSize: "0.875rem",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            )}
          </Grid>

          <Stack direction="row-reverse" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0093ff",
                color: "white",
                fontFamily: "Segoe UI",
                "&:hover": {
                  transition: "transform 0.3s ease",
                  bgcolor: "#0070d8",
                },
              }}
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
            >
              Next
            </Button>

            <Button sx={{ fontFamily: "Segoe UI" }} startIcon={<CloseIcon />}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Mandatory_info;

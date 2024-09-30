const {
  OnBoardUser,
  setPassword,
  getEmployeeDetails,
  getEmployeeDetailsById,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/emplyee");
const upload = require("../middlewares/fileUpload");

const User = require("../models/userModel");

const router = require("express").Router();

router.post("/createEmployee", OnBoardUser);
router.post("/setpassword", setPassword);
router.get("/getEmployeeDetails", getEmployeeDetails);
router.get("/getEmployeeDetailsById/:id", getEmployeeDetailsById);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/updateEmployee/:id", deleteEmployee);

router.post("/upload-profile", upload.single("avatar"), async (req, res) => {
  const { _id } = req.user; // Ensure req.user contains the authenticated user ID

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get the file name of the uploaded file
    const filename = req.file.filename; // Correctly get the uploaded file's name
    const localhost = process.env.BACK_END_BASE_URL; // Fallback to localhost:3000 if the environment variable is not set

    // Construct the full URL to access the uploaded profile photo
    const profilePhotoLink = `${localhost}/public/profilePhoto${filename}`;

    console.log(profilePhotoLink);

    // Update the user document with the new avatar URL
    const updatedEmployee = await User.findByIdAndUpdate(
      _id,
      { $set: { avatar: profilePhotoLink } }, // Save the profile photo link in the avatar field
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Return success response with the profile photo URL
    res.status(200).json({
      message: "Profile photo uploaded successfully",
      profilePhotoLink, // Send the profile photo URL as a response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading profile photo", error });
  }
});

module.exports = router;

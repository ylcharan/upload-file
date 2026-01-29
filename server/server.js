import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import multer from "multer";
import cloudinary from "./cloudinary.js";

const app = express();
app.use(cors());

const storage = multer.memoryStorage();

const upload = multer({ storage });

app.post("/upload", upload.single("uploaded_file"), async (req, res) => {
  try {
    console.log(cloudinary.uploader);
    console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const cloudRes = await cloudinary.uploader.upload(file, {
      folder: "upload",
    });

    res.json({
      message: "uploaded successfully",
      url: cloudRes.secure_url,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "upload failed" });
  }
});

app.listen(5001, () => {
  console.log(`Server is running on http://localhost:5001`);
});

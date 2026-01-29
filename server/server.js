import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import multer from "multer";
import cloudinary from "./cloudinary.js";
import connectDB from "./db.js";
import Image from "./model/image.model.js";

const app = express();
app.use(cors());

connectDB();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("uploaded_file"), async (req, res) => {
  try {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const cloudRes = await cloudinary.uploader.upload(file, {
      folder: "upload",
    });

    const image = await Image.create({
      publicId: cloudRes.public_id,
      url: cloudRes.url,
    });

    res.json({
      message: "uploaded successfully",
      image,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "upload failed" });
  }
});

app.get("/images", async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.send(images);
});

app.listen(5001, () => {
  console.log(`Server is running on http://localhost:5001`);
});

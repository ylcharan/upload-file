import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  // const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    if (!file) return alert("select a file");

    const formData = new FormData();
    formData.append("uploaded_file", file);
    console.log(file);
    await axios.post("http://localhost:5001/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    fetchImages();
  };

  const fetchImages = async () => {
    const images = await axios.get("http://localhost:5001/images");
    setImages(images.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <div className="home">
      <input
        type="file"
        name="uploaded_file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleSubmit}>upload</button>
      <div>
        {images && images.map((e) => <img key={e.publicId} url={e.url} />)}
      </div>
    </div>
  );
}

export default App;

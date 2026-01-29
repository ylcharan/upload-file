import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const handleSubmit = async () => {
    if (!file) return alert("select a file");

    const formData = new FormData();
    formData.append("uploaded_file", file);
    console.log(file);
    const res = await axios.post("http://localhost:5001/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(res.message);

    setUrl(res.data.url);
  };
  return (
    <div className="home">
      <input
        type="file"
        name="uploaded_file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleSubmit}>upload</button>

      {url && <img src={url} width={200} alt="uploaded" />}
    </div>
  );
}

export default App;

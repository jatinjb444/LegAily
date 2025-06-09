import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("summarize"); // "summarize" or "translate"

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("action", action);

    try {
      const response = await axios.post("http://localhost:8000/process/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <select onChange={handleActionChange} value={action}>
        <option value="summarize">Summarize</option>
        <option value="translate">Translate</option>
      </select>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>
    </div>
  );
};

export default FileUpload;

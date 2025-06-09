import React, { useState, useEffect } from "react";
import "../styles/LawyerView.css"; // create and link this CSS file

export default function LawyerView() {
  const [userRole, setUserRole] = useState(null);
  const [cid, setCid] = useState("");
  const [showFile, setShowFile] = useState(false);

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const handleViewFile = () => {
    if (cid.trim() === "") {
      alert("Please enter a CID");
      return;
    }
    setShowFile(true);
  };

  if (userRole !== "lawyer") {
    return (
      <div className="lawyer-container">
        <h1 className="unauthorized-text">Not Authorized - Lawyers only</h1>
      </div>
    );
  }

  return (
    <div className="lawyer-container">
  <div className="lawyer-card">
    <h2 className="lawyer-title">Lawyer Dashboard</h2>

    {/* Move profile & role here, above description */}
    <div className="profile-role-section">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Lawyer Profile"
        className="profile-pic"
      />
      <p className="role-text">Role - Lawyer</p>
    </div>

    <p className="lawyer-description">
      Welcome to the Lawyer Dashboard. Here you can view files stored on
      IPFS using their CIDs. Enter the CID of the file you want to view
      below and click "View File".
    </p>

    <div style={{ flexGrow: 1 }} />

    <div className="cid-input-wrapper">
      <input
        type="text"
        placeholder="Enter IPFS CID"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        className="cid-input"
      />
      <button onClick={handleViewFile} className="view-file-button">
        View File
      </button>
    </div>

    {showFile && (
      <div className="file-viewer">
        <p className="file-info">
          Viewing File :{" "}
          <a
            href={`https://gateway.pinata.cloud/ipfs/${cid}`}
            target="_blank"
            rel="noreferrer"
            className="file-link"
          >
          HERE
          </a>
        </p>

        <iframe
          src={`https://gateway.pinata.cloud/ipfs/${cid}`}
          width="100%"
          height="600px"
          title="IPFS File"
          frameBorder="0"
          className="file-iframe"
        />
      </div>
    )}
  </div>
</div>

  );
}

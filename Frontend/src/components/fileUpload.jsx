import React from 'react';
import { useState } from 'react';
import '../styles/FileUpload.css';

function FileUpload({ onFilesSelected }) {

  const [files, setFiles] = useState([]);
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    onFilesSelected(selectedFiles);
  };

  return (
    <div className="container">
      <input
        type="file"
        accept="image/*"
        id="file-input"
        multiple
        onChange={handleFileChange}
      />
      <label className='file_label' htmlFor="file-input">
        <i className="fa-solid fa-arrow-up-from-bracket"></i>
        &nbsp; Choose Files To Upload
      </label>
      <div id="num-of-files">{files.length} Files Selected</div>
      <ul id="files-list">
        {files.map((file, index) => {
          const fileSizeKB = (file.size / 1024).toFixed(1);
          const fileSize = fileSizeKB >= 1024 
            ? `${(fileSizeKB / 1024).toFixed(1)} MB` 
            : `${fileSizeKB} KB`;
          return (
            <li key={index}>
              <p>{file.name}</p>
              <p>{fileSize}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FileUpload;

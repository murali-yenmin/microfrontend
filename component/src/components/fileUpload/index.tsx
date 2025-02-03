import React, { useState } from "react";
import '../../assets/scss/app.scss';
interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  allowedFileTypes?: string[]; // Allow custom file types (e.g., ['image/png', 'image/jpeg'])
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  label,
  allowedFileTypes,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create the 'accept' string dynamically
  const acceptedTypes = allowedFileTypes
    ? allowedFileTypes.join(",")
    : "image/*";

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      // Check if the file type is valid
      if (allowedFileTypes && !allowedFileTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please select an image file.");
        setFile(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      console.log("selected file: ", selectedFile);
      setError(null); // Reset error if file is valid
      setFile(selectedFile);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="file"
        name={name}
        accept={acceptedTypes} // Dynamically set the accepted file types
        onChange={handleChange}
      />

      {/* Display error message if file type is invalid */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {file && (
        <div>
          {/* Icon for file preview */}
          <div onClick={toggleModal} style={{ cursor: "pointer" }}>
            <img
              src={URL.createObjectURL(file)}
              alt="file preview"
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
            />
            <p>{file.name}</p>
          </div>

          {/* Modal to show file */}
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={toggleModal}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              >
                <h2>File Preview</h2>
                <img
                  src={URL.createObjectURL(file)}
                  alt="file preview"
                  style={{ width: "400px", height: "auto" }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Space } from "antd";
import { dataCargarArchivos } from "../data";

const CargarArchivos = ({ onCloseModal, onFileUpload }) => {
  const [fileList, setFileList] = useState(dataCargarArchivos.map(() => []));
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    // Check if all five files are selected before proceeding with the upload
    if (fileList.some((files) => files.length === 0)) {
      message.error("Please select all five files before uploading.");
      return;
    }

    // Your upload logic here
    // For example, you can use the fileList state to get the selected files and send them to the server.
    console.log("Uploading files:", fileList);

    // Set uploading state to true during the upload process
    setUploading(true);

    // Simulate an asynchronous upload process (replace this with your actual upload logic)
    setTimeout(() => {
      onFileUpload(fileList);
      // Reset the fileList and set uploading state to false after the upload is completed
      setFileList(dataCargarArchivos.map(() => []));
      setUploading(false);

      // Display a success message
      message.success("Upload successful");
      onCloseModal();
    }, 2000);
  };

  const checkFile = (file) => {
    const isPdfOrImage =
      (file.type === "application/pdf" ||
        file.type === "image/png" ||
        file.type === "image/jpeg") &&
      file.size / 1024 / 1024 < 10; // Check if the file size is less than 10 MB

    if (!isPdfOrImage) {
      message.error(
        "You can only upload PDF, PNG, or JPG files (less than 10MB)!"
      );
    }
    return isPdfOrImage;
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    // You can customize the request logic here if needed
    // For simplicity, we're just resolving the promise immediately
    return new Promise((resolve, reject) => {
      resolve();
    }).then(
      () => onSuccess(),
      () => onError()
    );
  };

  return (
    <>
      <p>
        Agregamos el contrato firmado por el propietario, lo escaneamos y lo
        colocamos como nombre del archivo:
        "Contrato_de_propietario_SPACEOS_Nombre_Apellido", donde el nombre y
        apellido se refiere al agente inmobiliario. <br /> <br /> El archivo
        debe verse de manera clara y nítida, de lo contrario se rechazará.
      </p>
      <span>
        Archivo debe ser en formato pdf, png o jpg y debe pesar menos de 10MB.
      </span>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size="large"
      >
        {dataCargarArchivos.map((data, index) => (
          <div key={index}>
            <h3>{data.title}</h3>
            <Upload
              key={index}
              customRequest={customRequest}
              beforeUpload={checkFile}
              fileList={fileList[index]}
              listType="picture"
              maxCount={1}
              accept=".pdf, .png, .jpg, .jpeg"
              onChange={({ fileList: newFileList }) => {
                // Update the fileList state for the corresponding index
                setFileList((prevFileList) => {
                  const newFileListWithIndex = [...prevFileList];
                  newFileListWithIndex[index] = newFileList;
                  return newFileListWithIndex;
                });
              }}
            >
              <Button icon={<UploadOutlined />}>{data.button}</Button>
            </Upload>
          </div>
        ))}

        {/* <Upload
          listType="picture"
          accept=".pdf, .png, .jpg, .jpeg"
        >
          <Button icon={<UploadOutlined />}>Agregar otro</Button>
        </Upload> */}
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.some((files) => files.length === 0)}
          loading={uploading}
          style={{
            marginTop: 16,
          }}
        >
          {uploading ? "Subiendo" : "Subir documentos"}
        </Button>
      </Space>
    </>
  );
};

export default CargarArchivos;

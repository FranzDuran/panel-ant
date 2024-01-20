import React, { useState } from "react";
import { Modal, Button, Radio, Input } from "antd";
import CargarArchivos from "./CargarArchivos";

const ModalCerrasteContrato = ({
  isModalOpen,
  data,
  handleOk,
  handleCancel,
  onFinish,
}) => {
  const [radioValue, setRadioValue] = useState("Si");
  const [nextStep, setNextStep] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleButtonClick = () => {
    // Handle logic for button click based on radioValue
    if (radioValue === "Si") {
      setNextStep(true);
    } else {
      // Handle logic for "Siguiente"
      setNextStep(true);
    }
  };

  const handleBackButtonClick = () => {
    setNextStep(false);
  };

  const handleFinishButtonClick = () => {
    const newData = {
      previousData: data,
      additionalInfo: additionalInfo,
      radioValue: radioValue,
    };
    onFinish(newData);
    setNextStep(false);
    setRadioValue("Si");
    handleCancel();
  };

  const handleNextButtonClick = () => {
    setNextStep(false);
    setLastStep(true);
  };

  const handleFileUpload = (fileList) => {
    // Aquí puedes realizar acciones con la información del archivo, por ejemplo, enviarla al servidor
    console.log("Archivos cargados en el componente padre:", fileList);
    const newData = {
      previousData: data,
      additionalInfo: fileList,
      radioValue: radioValue,
    };
    onFinish(newData);
  };

  return (
    <>
      <Modal
        title={
          nextStep && radioValue === "No"
            ? "Ingresar observación"
            : nextStep && radioValue === "Si"
            ? "Cargar contrato y documentos del propietario de SPACEOS"
            : lastStep
            ? "Agrega los documentos de propietario de SPACEOS"
            : "¿Cerraste el contrato con el propietario?"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          lastStep
            ? null
            : [
                nextStep && radioValue === "No" && (
                  <Button key="back" onClick={handleBackButtonClick}>
                    Atras
                  </Button>
                ),
                <Button
                  key="submit"
                  type="primary"
                  onClick={
                    nextStep && radioValue === "No"
                      ? handleFinishButtonClick
                      : nextStep && radioValue === "Si"
                      ? handleNextButtonClick
                      : handleButtonClick
                  }
                >
                  {!nextStep && radioValue === "Si"
                    ? "Continuar"
                    : !nextStep && radioValue === "No"
                    ? "Siguiente"
                    : nextStep && radioValue === "Si"
                    ? "Subir documentos"
                    : "Finalizar"}
                </Button>,
              ]
        }
      >
        {nextStep && radioValue === "No" ? (
          <>
            <Input
              placeholder="Ingrese el motivo..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </>
        ) : nextStep && radioValue === "Si" ? (
          <>
            <p>
              Es necesario que subas el contrato de intermediación firmado así
              como los documentos como DNI de propietarios, la hoja resumen
              (HR), el predio urbano (PU) y la partida electrónica en formato
              PDF.
            </p>
          </>
        ) : lastStep && radioValue === "Si" ? (
          <>
            <CargarArchivos
              onCloseModal={handleCancel}
              onFileUpload={handleFileUpload}
            />
          </>
        ) : (
          <Radio.Group onChange={handleRadioChange} value={radioValue}>
            <Radio value="Si">Si</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        )}
      </Modal>
    </>
  );
};
export default ModalCerrasteContrato;

import React, { useState } from "react";
import { Modal, Select, Button, Radio, Input } from "antd";
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

  console.log(radioValue)
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleButtonClick = () => {
    console.log("1")
    // Handle logic for button click based on radioValue
    if (radioValue === "Si") {
      console.log("1.1")
      setNextStep(true);
      // Handle logic for "Completar"
      //handleCancel();
    } else {
      // Handle logic for "Siguiente"
      console.log("1.2")
      setNextStep(true);
    }
  };

  const handleBackButtonClick = () => {
    setNextStep(false);
  };

  const handleFinishButtonClick = () => {
    console.log("2")
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
    console.log("3")
    setNextStep(false)
    setLastStep(true);
  };
  const handleUploadButtonClick = () => {};

  return (
    <>
      <Modal
        title={
          nextStep
            ? "Ingresar observación"
            : "¿Cerraste el contrato con el propietario?"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={ lastStep ? null : [
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
        ]}
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
            <CargarArchivos/>
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

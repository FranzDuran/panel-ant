"use client";
import React, { useState } from "react";
import { Modal, Select, Button, Radio, Input } from "antd";

const { Option } = Select;

const ModalReprogramarVisita = ({
  isModalOpen,
  handleOk,
  handleCancel,
  data,
  onComplete,
}) => {
  const [radioValue, setRadioValue] = useState("Si");
  const [nextStep, setNextStep] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleButtonClick = () => {
    // Handle logic for button click based on radioValue
    if (radioValue === "No") {
      // Handle logic for "Completar"
      onComplete(data, "Finalizado");
      handleCancel();
    } else {
      // Handle logic for "Siguiente"
      setNextStep(true);
    }
  };
  const handleBackButtonClick = () => {
    setNextStep(false);
  };

  const handleAgendarButtonClick = () => {
    // Handle logic for "Completar" in the new step
    const newData = {
      // Construct the data for the new step
      previousData: data,
      //additionalInfo: additionalInfo,
      //radioValue: radioValue,
    };
    onComplete(newData, "Pendiente de realizar visita");
    setNextStep(false);
    setRadioValue("Si");
    setAdditionalInfo("");
    // Optionally, close the modal
    handleCancel();
  };

  return (
    <Modal
      title={
        nextStep
          ? "PROGRAME UNA HORA PARA LA VISITA DEL AGENTE INMOBILIARIO AL PROPIETARIO"
          : "¿Deseas reprogramar visita con el propietario?"
      }
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        nextStep && (
          <Button key="back" onClick={handleBackButtonClick}>
            Anterior
          </Button>
        ),
        <Button
          key="submit"
          type="primary"
          onClick={nextStep ? handleAgendarButtonClick : handleButtonClick}
        >
          {!nextStep && radioValue === "Si"
            ? "Continuar"
            : "Finalizar"}
        </Button>,
      ]}
    >
      {nextStep ? (
        <>
        <h1>CALENDARIO</h1>
          {/* <Input
            placeholder="Ingrese información adicional"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          /> */}
        </>
      ) : (
        <Radio.Group onChange={handleRadioChange} value={radioValue}>
          <Radio value="Si">Si</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      )}
    </Modal>
  );
};

export default ModalReprogramarVisita;

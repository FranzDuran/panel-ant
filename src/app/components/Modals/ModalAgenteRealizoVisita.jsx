"use client";
import React, { useState } from "react";
import { Modal, Select, Button, Radio, Input } from "antd";


const { Option } = Select;

const ModalAgenteRealizoVisita = ({
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
    if (radioValue === "Si") {
      // Handle logic for "Completar"
      onComplete(data);
      handleCancel()
    } else {
      // Handle logic for "Siguiente"
      setNextStep(true);
    }
  };
  const handleBackButtonClick = () => {
    setNextStep(false);
  };

  const handleCompleteButtonClick = () => {
    // Handle logic for "Completar" in the new step
    const newData = {
      // Construct the data for the new step
      previousData: data,
      additionalInfo: additionalInfo,
      radioValue:radioValue,
    };
    onComplete(newData);
    setNextStep(false);
    setRadioValue("Si")
    setAdditionalInfo("")
    // Optionally, close the modal
    handleCancel()
  };

  return (
    <Modal
      title={nextStep ? "Nuevo Paso" : "¿Agente realizó visita?"}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        nextStep && (
          <Button key="back" onClick={handleBackButtonClick}>
            Atras
          </Button>
        ),
        <Button
          key="submit"
          type="primary"
          onClick={nextStep ? handleCompleteButtonClick : handleButtonClick}
        >
          {!nextStep && radioValue === "Si" ? "Completar" : !nextStep && radioValue === "No"? "Siguiente" : "Completar"}
        </Button>,
      ]}
    >
      {nextStep ? (
        <>
          <Radio.Group onChange={handleRadioChange} value={radioValue}>
            <Radio value="Propietario no contestó">Propietario no contestó</Radio>
            <Radio value="Propietario rechazó visita">Propietario rechazó visita</Radio>
            <Radio value="Agente no tuvo tiempo">Agente no tuvo tiempo</Radio>
          </Radio.Group>
          <Input
            placeholder="Ingrese información adicional"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
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

export default ModalAgenteRealizoVisita;

"use client";
import React, { useState } from "react";
import { Modal, Select, Button, Radio } from "antd";

const { Option } = Select;

const ReprogramarVisitaModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  data,
  onComplete,
}) => {
  const [radioValue, setRadioValue] = useState("Si");

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleButtonClick = () => {
      const newData = {
        previousData: data,
        radioValue: radioValue,
      };
      onComplete(newData);
      handleCancel();
  };

  return (
    <Modal
      title="¿Deseas reprogramar visita con el propietario?"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleButtonClick}>
          {radioValue === "Si" ? "Continuar" : "Finalizar"}
        </Button>,
      ]}
    >
      <Radio.Group onChange={handleRadioChange} value={radioValue}>
        <Radio value="Si">Si</Radio>
        <Radio value="No">No</Radio>
      </Radio.Group>
    </Modal>
  );
};

export default ReprogramarVisitaModal;

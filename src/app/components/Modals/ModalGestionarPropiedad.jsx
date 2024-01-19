"use client";
import React, { useState } from "react";
import { Button, Modal, Select, Radio } from "antd";
import { modGestProp } from "../data";

const { Option } = Select;

const ModalGestionarPropiedad = ({
  isModalOpen,
  data,
  handleOk,
  handleCancel,
  onUpdateState,
}) => {
  if (!isModalOpen || !data) {
    // Return null or some loading state when data is not available
    return null;
  }

  let updatedRadioValue = "";

  // Modify radioValue based on certain conditions
  if (data.modalidad === "Alquiler flex") {
    updatedRadioValue = "alquilerFlex";
  } else if (data.modalidad === "Alquiler tradicional") {
    updatedRadioValue = "alquilerTradicional";
  } else if (data.modalidad === "Compra") {
    updatedRadioValue = "compra";
  }

  const [selectedOption, setSelectedOption] = useState(null);
  const [radioValue, setRadioValue] = useState(updatedRadioValue);

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
    setSelectedOption(value);
  };

  const handleUpdateState = () => {
    console.log("Updating state with selected option:", selectedOption);
    onUpdateState(selectedOption)
    setRadioValue(null);
    handleCancel();
  };

  return (
    <>
      <Modal
        title="Gestionar Propiedad"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="update" type="primary" onClick={handleUpdateState}>
            Actualizar estado
          </Button>,
        ]}
      >
        <Radio.Group onChange={handleRadioChange} value={radioValue}>
          <Radio value="alquilerTradicional">Alquiler tradicional</Radio>
          <Radio value="compra">Compra</Radio>
          <Radio value="alquilerFlex">Alquiler flex</Radio>
        </Radio.Group>

        <Select
          placeholder="Selecciona una opción"
          style={{ width: "100%" }}
          onChange={handleSelectChange}
          value={selectedOption}
          disabled={!radioValue}
        >
          {radioValue &&
            modGestProp[radioValue] &&
            modGestProp[radioValue].map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
        </Select>
      </Modal>
    </>
  );
};
export default ModalGestionarPropiedad;

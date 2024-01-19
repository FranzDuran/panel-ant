"use client";
import React, { useState } from "react";
import { Button, Modal, Radio } from "antd";

const ModalAgenteCalifica = ({
  isModalOpen,
  setAgentes,
  agentes,
  data,
  handleOk,
  handleCancel,
}) => {

  const [radioValue, setRadioValue] = useState(null);
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleFinalizarClick = () => {
    // Update the estado property based on the value of qualifiesForSpaceos
    const updatedData = agentes.map((agente) => {
      if (agente.key === data.key) {
        return {
          ...agente,
          estado: radioValue === "Si" ? "Aprobado" : "Rechazado",
        };
      }
      return agente;
    });
    setRadioValue(null);
    // Update the table data and close the modal
    setAgentes(updatedData);
    handleCancel();
  };

  return (
    <>
      <Modal
        title="Calificación para SPACEOS"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="Finalizar" type="primary" onClick={handleFinalizarClick}>
            Finalizar
          </Button>,
        ]}
      >
        <div>
          <p>¿Agente califica para SPACEOS?</p>
          <Radio.Group onChange={handleRadioChange} value={radioValue}>
          <Radio value="Si">Si</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
        </div>
      </Modal>
    </>
  );
};
export default ModalAgenteCalifica;

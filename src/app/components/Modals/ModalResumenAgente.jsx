import React from "react";
import { Modal, Button } from "antd";

const ModalResumenAgente = ({ isModalOpen, data, handleOk, handleCancel }) => {
  if (!isModalOpen || !data) {
    return null;
  }
 

  const {
    nombre,
    apellido,
    correo_electronico,
    telefono,
  } = data.resumen;

  return (
    <>
      <Modal
        title="Resumen de datos del Agente"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="Aceptar" type="primary" onClick={handleOk}>
            Aceptar
          </Button>,
        ]}
      >
        <p>{`Nombres: ${nombre || "--"}`}</p>
        <p>{`Apellidos: ${apellido || "--"}`}</p>
        <p>{`Telefono: ${telefono || "--"}`}</p>
        <p>{`Correo electrónico: ${correo_electronico || "--"}`}</p>
      </Modal>
    </>
  );
};
export default ModalResumenAgente;

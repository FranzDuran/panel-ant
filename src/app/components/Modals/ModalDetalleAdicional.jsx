import React, { useState } from "react";
import { Button, Modal } from "antd";

const ModalDetalleAdicional = ({ isModalOpen, data, handleOk, handleCancel }) => {
  return (
    <>
      <Modal
        title="Detalle Adicional"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{data}</p>
      </Modal>
    </>
  );
};
export default ModalDetalleAdicional;

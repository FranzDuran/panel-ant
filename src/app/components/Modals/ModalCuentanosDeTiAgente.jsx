import React from "react";
import { Modal } from "antd";

const ModalCuentanosDeTiAgente = ({ isModalOpen, data, handleOk, handleCancel }) => {
  return (
    <>
      <Modal
        title="Cuéntanos un poco de ti"
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
export default ModalCuentanosDeTiAgente;

"use client";
import React, { useState } from "react";
import { EditOutlined, ProfileOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Progress } from "antd";
import ModalDetalleAdicional from "./Modals/ModalDetalleAdicional";
import ModalGestionarPropiedad from "./Modals/ModalGestionarPropiedad";
import ModalResumen from "./Modals/ModalResumen";
import { dataClientes, dataPropietarios } from "./data";
import ModalResumenCliente from "./Modals/ModalResumenCliente";
//import styles from "./styles.module.css";

const PotencialesClientes = () => {
  const columns = [
    {
      title: "N°",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Ver resumen",
      dataIndex: "resumen",
      key: "resumen",
      render: (_, record) => (
        <ProfileOutlined
          style={{ color: "blue", fontSize: "16px" }}
          onClick={() => showModal(record, "resumen")}
        />
      ),
    },
    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      render: (estado) => {
        let tagColor;
        switch (estado) {
          case "Pendiente":
            tagColor = "green";
            break;
          default:
            tagColor = "#87d068";
            break;
        }
        return <Tag color={tagColor}>{estado}</Tag>;
      },
    },
    {
      title: "Gestionar propiedad",
      dataIndex: "gestionar_propiedad",
      key: "gestionar_propiedad",
      render: (_, record) => (
        <EditOutlined
          style={{ color: "blue", fontSize: "16px" }}
          onClick={() => showModal(record, "gestionar_propiedad")}
        />
      ),
    },
    {
      title: "Modalidad",
      dataIndex: "modalidad",
      key: "modalidad",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Hora de inicio",
      dataIndex: "hora_de_inicio",
      key: "hora_de_inicio",
    },
    {
      title: "Hora de fin",
      dataIndex: "hora_de_fin",
      key: "hora_de_fin",
    },
    {
      title: "Primer nombre",
      dataIndex: "primer_nombre",
      key: "primer_nombre",
    },
    {
      title: "Primer apellido",
      dataIndex: "primer_apellido",
      key: "primer_apellido",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "¿Estás actualmente trabajando con un agente de bienes raíces?",
      dataIndex: "trabaja_con_agente",
      key: "trabaja_con_agente",
    },
    {
      title: "Detalle adicional",
      dataIndex: "detalle_adicional",
      key: "detalle_adicional",
      render: (_, record) => (
        <ProfileOutlined
          style={{ color: "blue", fontSize: "16px", cursor: "pointer" }}
          onClick={() =>
            showModal(record.detalle_adicional, "detalle_adicional")
          }
        />
      ),
    },
  ];

  const [data, setData] = useState(
    dataClientes.map((cliente, index) => ({
      key: index + 1,
      resumen: {
        ubicacion: cliente.ubicacion || "--",
        direccion: cliente.direccion || "--",
        distrito: cliente.distrito || "--",
        provincia: cliente.provincia || "--",
        departamento: cliente.departamento || "--",
        codigo_postal: cliente.codigo_postal || "--",
        referencia: cliente.referencia || "--",
        modalidad: cliente.modalidad || "--",
        categoria_de_propiedades: cliente.categoria_de_propiedades || "--",
        tipo_de_propiedad: cliente.tipo_de_propiedad || "--",
        propiedades: cliente.propiedades || "--",
        fecha: cliente.fecha || "--",
        hora_de_inicio: cliente.hora_de_inicio || "--",
        hora_de_fin: cliente.hora_de_fin || "--",
        primer_nombre: cliente.primer_nombre || "--",
        primer_apellido: cliente.primer_apellido || "--",
        telefono: cliente.telefono || "--",
        trabaja_con_agente: cliente.trabaja_con_agente || "--",
        detalle_adicional: cliente.detalle_adicional || "--",
      },
      estado: cliente.estado || "Pendiente",
      gestionar_propiedad: "--",
      modalidad: cliente.modalidad || "--",
      fecha: cliente.fecha || "--",
      hora_de_inicio: cliente.hora_de_inicio || "--",
      hora_de_fin: cliente.hora_de_fin || "--",
      primer_nombre: cliente.primer_nombre || "--",
      primer_apellido: cliente.primer_apellido || "--",
      telefono: cliente.telefono || "--",
      trabaja_con_agente: cliente.trabaja_con_agente || "--",
      detalle_adicional: cliente.detalle_adicional || "--",
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const showModal = (data, actionType) => {
    setModalData({ data, actionType });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateState = (updateState) => {
    //console.log(updateState);
    setData((prevData) => {
      return prevData.map((item) => {
        // Assuming selectedAgent.key corresponds to the key in data state
        if (item.key === modalData.data.key) {
          // Append "nombre" and "apellido" to the existing "agente" value
          const update = `${updateState}`;

          // Return a new object with updated "agente" property
          return {
            ...item,
            estado: update,
          };
        }
        return item;
      });
    });
  };

  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ x: true }} />
      <ModalResumenCliente
        isModalOpen={isModalOpen && modalData.actionType === "resumen"}
        data={modalData.data}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <ModalGestionarPropiedad
        isModalOpen={
          isModalOpen && modalData.actionType === "gestionar_propiedad"
        }
        data={modalData.data}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onUpdateState={handleUpdateState}
      />
      <ModalDetalleAdicional
        isModalOpen={
          isModalOpen && modalData.actionType === "detalle_adicional"
        }
        data={modalData.data}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};
export default PotencialesClientes;

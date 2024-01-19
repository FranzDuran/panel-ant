"use client";
import React, { useState } from "react";
import {
  ProfileOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Table, Select, Button, Tag } from "antd";
import ModalResumenAgente from "./Modals/ModalResumenAgente";
import ModalCuentanosDeTiAgente from "./Modals/ModalCuentanosDeTiAgente";
import { dataAgentes } from "./data";
import ModalAgenteCalifica from "./Modals/ModalAgenteCalifica";

const SolicitudesAgentes = () => {
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
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 120 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys(value ? [value] : [])}
            onSelect={confirm}
          >
            {/* List of possible values for Estado */}
            <Option value="Todos">Todos</Option>
            <Option value="Rechazado">Rechazados</Option>
            <Option value="Pendiente">Pendientes</Option>
            <Option value="Aprobado">Aprobados</Option>
            {/* Add more options as needed */}
          </Select>
          {/* <Button
            type="primary"
            onClick={confirm}
            icon={<SearchOutlined />}
            size="small"
            style={{ marginRight: 8 }}
          /> */}
        </div>
      ),
      onFilter: (value, record) => {
        if (value === "Todos") {
          return true; // Show all records when "Todos" is selected
        }
        return record.estado.includes(value);
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      render: (text) => {
        let tagColor;
        switch (text) {
          case "Pendiente":
            tagColor = "green";
            break;
          case "Aprobado":
            tagColor = "#87d068";
            break;
          case "Rechazado":
            tagColor = "#D00000";
            break;
          default:
            tagColor = "default";
            break;
        }
        return <Tag color={tagColor}>{text}</Tag>;
      },
    },
    {
      title: "¿Agente califica para SPACEOS?",
      dataIndex: "agente_califica",
      key: "agente_califica",
      render: (_, record) => (
        <ExclamationCircleOutlined
          style={{ color: "blue", fontSize: "16px" }}
          onClick={() => showModal(record, "agente_califica")}
        />
      ),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Correo electrónico",
      dataIndex: "correo_electronico",
      key: "correo_electronico",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "fetelefonocha",
    },
    {
      title: "¿Cómo conociste nuestra web?",
      dataIndex: "como_conociste_web",
      key: "como_conociste_web",
    },
    {
      title: "¿Qué experiencia inmobiliaria tienes?",
      dataIndex: "experiencia_inmobiliaria",
      key: "experiencia_inmobiliaria",
    },
    {
      title: "¿Trabajas agente externo?",
      dataIndex: "agente_externo",
      key: "agente_externo",
    },
    {
      title: "Departamento a postular",
      dataIndex: "departamento",
      key: "departamento",
    },

    {
      title: "Provincia a postular",
      dataIndex: "provincia",
      key: "provincia",
    },
    {
      title: "Distrito a postular",
      dataIndex: "distrito",
      key: "distrito",
    },
    {
      title: "Cuéntanos un poco de ti",
      dataIndex: "cuentanos",
      key: "cuentanos",
      render: (_, record) => (
        <ProfileOutlined
          style={{ color: "blue", fontSize: "16px", cursor: "pointer" }}
          onClick={() => showModal(record.cuentanos, "cuentanos")}
        />
      ),
    },
  ];

  const [agentes, setAgentes] = useState(
    dataAgentes.map((agente) => ({
      key: agente.id,
      resumen: {
        nombre: agente.nombre,
        apellido: agente.apellido,
        correo_electronico: agente.correo_electronico,
        telefono: agente.telefono,
      },
      estado: agente.estado,
      agente_califica: agente.agente_califica,
      nombre: agente.nombre,
      apellido: agente.apellido,
      correo_electronico: agente.correo_electronico,
      telefono: agente.telefono,
      como_conociste_web: agente.como_conociste_web,
      experiencia_inmobiliaria: agente.experiencia_inmobiliaria,
      agente_externo: agente.agente_externo,
      departamento: agente.departamento,
      provincia: agente.provincia,
      distrito: agente.distrito,
      cuentanos: agente.cuentanos,
    }))
  );

  //******* ESTADO Y FUNCION PARA ABRIR MODAL  **************************/
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

  return (
    <>
      <Table columns={columns} dataSource={agentes} scroll={{ x: true }} />
      <ModalResumenAgente
        isModalOpen={isModalOpen && modalData.actionType === "resumen"}
        data={modalData.data}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <ModalCuentanosDeTiAgente
        isModalOpen={isModalOpen && modalData.actionType === "cuentanos"}
        data={modalData.data}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <ModalAgenteCalifica
        isModalOpen={isModalOpen && modalData.actionType === "agente_califica"}
        data={modalData.data}
        agentes={agentes}
        setAgentes={setAgentes}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};
export default SolicitudesAgentes;

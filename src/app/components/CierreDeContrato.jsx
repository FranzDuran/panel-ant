"use client";
import React, { useState } from "react";
import { ProfileOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import { dataPropietarios } from "./data";
import ModalCerrasteContrato from "./Modals/ModalCerrasteContrato";
import ModalResumen from "./Modals/ModalResumen";

const CierreDeContrato = () => {
  const columns = [
    {
      title: "N°",
      dataIndex: "key",
      key: "number",
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "number",
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
    },
    {
      title: "Cierre de contrato",
      dataIndex: "cierre_de_contrato",
      key: "cierre_de_contrato",
      render: (_, record) => (
        <CloudUploadOutlined
          style={{ color: "blue", fontSize: "16px" }}
          onClick={() => showModal(record, "cierre_de_contrato")}
        />
      ),
    },
    {
      title: "Agente",
      dataIndex: "agente",
      key: "agente",
    },
    {
      title: "Fecha de visita propietario",
      dataIndex: "fecha_de_visita_propietario",
      key: "fecha_de_visita_propietario",
    },
    {
      title: "Hora de inicio visita",
      dataIndex: "hora_de_inicio_visita",
      key: "hora_de_inicio_visita",
    },
    {
      title: "Hora de fin visita",
      dataIndex: "hora_de_fin_visita",
      key: "hora_de_fin_visita",
    },
    {
      title: "#Propiedades",
      dataIndex: "propiedades",
      key: "propiedades",
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
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "¿Trabajas agente externo?",
      dataIndex: "trabajas_agente_externo",
      key: "trabajas_agente_externo",
    },
    {
      title: "Detalle adicional",
      dataIndex: "detalle_adicional",
      key: "detalle_adicional",
    },
    {
      title: "Modalidad de propiedad",
      dataIndex: "modalidad_de_propiedad",
      key: "modalidad_de_propiedad",
    },
    {
      title: "Categoría de propiedad",
      dataIndex: "categoria_de_propiedad",
      key: "categoria_de_propiedad",
    },
    {
      title: "Tipo de propiedad",
      dataIndex: "tipo_de_propiedad",
      key: "tipo_de_propiedad",
    },
    {
      title: "Código de propiedad",
      dataIndex: "codigo_de_propiedad",
      key: "codigo_de_propiedad",
    },
    {
      title: "Observación para verificador",
      dataIndex: "observacion_para_verificador",
      key: "observacion_para_verificador",
    },
  ];

  const [data, setData] = useState(
    dataPropietarios
      .filter(
        (propietario) => propietario.estado === "Pendiente de cerrar contrato"
      )
      .map((propietario, index) => ({
        key: index + 1,
        rol: "AGENTE INMOBILIARIO",
        resumen: {
          ubicacion: propietario.ubicacion,
          direccion: propietario.direccion,
          distrito: propietario.distrito,
          provincia: propietario.provincia,
          departamento: propietario.departamento,
          codigo_postal: propietario.codigo_postal,
          referencia: propietario.referencia,
          modalidad_de_propiedad: propietario.modalidad_de_propiedad,
          categoria_de_propiedades: propietario.categoria_de_propiedades,
          tipo_de_propiedad: propietario.tipo_de_propiedad,
          propiedades: propietario.propiedades,
          fecha: propietario.fecha,
          hora_de_inicio: propietario.hora_de_inicio,
          hora_de_fin: propietario.hora_de_fin,
          primer_nombre: propietario.primer_nombre,
          primer_apellido: propietario.primer_apellido,
          telefono: propietario.telefono,
          trabaja_con_agente: propietario.trabaja_con_agente,
          detalle_adicional: propietario.detalle_adicional,
        },
        estado: propietario.estado,
        cierre_de_contrato: propietario.cierre_de_contrato,
        agente: propietario.agente,
        fecha_de_visita_propietario: propietario.fecha_de_visita_propietario,
        hora_de_inicio_visita: propietario.hora_de_inicio,
        hora_de_fin_visita: propietario.hora_de_fin,
        propiedades: propietario.categoria_de_propiedades,
        nombre: propietario.primer_nombre,
        apellido: propietario.primer_apellido,
        telefono: propietario.telefono,
        direccion: propietario.direccion,
        trabajas_agente_externo: propietario.trabaja_con_agente,
        detalle_adicional: propietario.detalle_adicional,
        modalidad_de_propiedad: propietario.modalidad_de_propiedad,
        categoria_de_propiedad: propietario.categoria_de_propiedades,
        tipo_de_propiedad: propietario.tipo_de_propiedad,
        codigo_de_propiedad: propietario.codigo_de_propiedad,
        observacion_para_verificador: propietario.observacion_para_verificador,
      }))
  );

  //*********************************************/
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

  const handleFinish = (newData) => {
    console.log(newData);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ x: true }} />
      <ModalResumen
        isModalOpen={isModalOpen && modalData.actionType === "resumen"}
        data={modalData.data}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <ModalCerrasteContrato
        isModalOpen={
          isModalOpen && modalData.actionType === "cierre_de_contrato"
        }
        data={modalData.data}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onFinish={handleFinish}
      />
    </>
  );
};
export default CierreDeContrato;

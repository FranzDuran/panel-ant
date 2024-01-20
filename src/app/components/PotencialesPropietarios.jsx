"use client";
import React, { useState } from "react";
import {
  UserOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import { dataPropietarios } from "./data";
import ModalResumen from "./Modals/ModalResumen";
import ModalReprogramarVisita from "./Modals/ModalReprogramarVisita";
import ReprogramarVisitaModal from "./Modals/ReprogramarVisitaModal";

const PotencialesPropietarios = () => {
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
      title: "¿Deseas reprogramar visita con el propietario?",
      dataIndex: "deseas_reprogramar_visita",
      key: "deseas_reprogramar_visita",
      render: (_, record) => (
        <QuestionCircleOutlined
          style={{ color: "blue", fontSize: "16px" }}
          onClick={() => showModal(record, "deseas_reprogramar_visita")}
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
        (propietario) => propietario.estado === "Pendiente de acuerdo con el propietario"
      )
      .map((propietario, index) => ({
        key: index + 1,
        rol: "SUPERVISOR",
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
        agente_realizo_visita: "",
        agente: propietario.agente,
        fecha_de_visita_propietario: propietario.fecha,
        hora_de_inicio_visita: propietario.hora_de_inicio_visita,
        hora_de_fin_visita: propietario.hora_de_fin_visita,
        propiedades: propietario.propiedades,
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

   /*************************************************/
  const onComplete = (newData) => {
    //console.log(newData);
    setData((prevData) => {
      return prevData.map((item) => {
        // Assuming selectedAgent.key corresponds to the key in data state
        if (item.key === modalData.data.key) {
          // Append "nombre" and "apellido" to the existing "agente" value

          if (newData.radioValue === "Si") {
            return {
              ...item,

              estado: "Pendiente de reprogramar visita",
            };
          }
          // Return a new object with updated "agente" property
          return {
            ...item,

            estado: "Finalizado",
          };
        }
        return item;
      });
    });
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
      <ReprogramarVisitaModal
        isModalOpen={
          isModalOpen && modalData.actionType === "deseas_reprogramar_visita"
        }
        data={modalData.data}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onComplete={onComplete}
      />
    </>
  );
};
export default PotencialesPropietarios;

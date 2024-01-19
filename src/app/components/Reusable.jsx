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


const Reusable = () => {
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
      render: () => (
        <ProfileOutlined style={{ color: "blue", fontSize: "16px" }} />
      ),
    },
    {
      title: "Estado",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    //*****************************/
    {
      title: "Enlace de publicación",
      dataIndex: "enlace_de_publicacion",
      key: "enlace_de_publicacion",
    },
    {
      title: "¿Verificación completada?",
      dataIndex: "verificacion_completada",
      key: "verificacion_completada",
      render: () => (
        <ExclamationCircleOutlined
          style={{ color: "blue", fontSize: "16px" }}
        />
      ),
    },
    {
      title: "Precios de propiedad",
      key: "precios_de_propiedad",
      dataIndex: "precios_de_propiedad",
      render: (_, { precios_de_propiedad }) => (
        <>
          {precios_de_propiedad &&
            precios_de_propiedad.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
        </>
      ),
    },
    //------------------------------
    {
      title: "¿Deseas reprogramar visita con el propietario?",
      dataIndex: "deseas_reprogramar_visita",
      key: "deseas_reprogramar_visita",
      render: () => (
        <QuestionCircleOutlined style={{ color: "blue", fontSize: "16px" }} />
      ),
    },
    //*******************/
    {
      title: "¿Agente realizó visita?",
      dataIndex: "agente_realizo_visita",
      key: "agente_realizo_visita",
      render: () => (
        <QuestionCircleOutlined style={{ color: "blue", fontSize: "16px" }} />
      ),
    },
    {
      title: "Cierre de contrato",
      dataIndex: "cierre_de_contrato",
      key: "cierre_de_contrato",
      render: () => (
        <CloudUploadOutlined style={{ color: "blue", fontSize: "16px" }} />
      ),
    },
    {
      title: "Verificador",
      key: "verificador",
      dataIndex: "verificador",
      render: (_, { verificador }) => (
        <>
          {verificador &&
            verificador.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
        </>
      ),
    },
    {
      title: "Nombre verificadoro",
      dataIndex: "nombre_verificador",
      key: "nombre_verificador",
    },
    //------------------------------
    {
      title: "Asignar agente",
      dataIndex: "asignar_agente",
      key: "asignar_agente",
      render: (_,record) => (
        <UserOutlined
          style={{ color: "blue", fontSize: "16px" }}
          onClick={() => showModal(record)}
        />
      ),
    },
    {
      title: "Agente",
      dataIndex: "agente",
      key: "agente",
    },
    /*********************************/
    {
      title: "Cargar contrato",
      dataIndex: "cargar_contrato",
      key: "cargar_contrato",
      render: () => (
        <CloudUploadOutlined style={{ color: "blue", fontSize: "16px" }} />
      ),
    },
    //--------------------------------
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
    {
      title: "Motivo de no visita Verificador",
      dataIndex: "motivo_de_no_visita_verificador",
      key: "motivo_de_no_visita_verificador",
    },
    {
      title: "Motivo de no visita Agente",
      dataIndex: "motivo_de_no_visita_gente",
      key: "motivo_de_no_visita_gente",
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
  ];

  const data = [
    {
      key: "1",
      rol: "SUPERVISOR",
      resumen: "archivo",
      tags: ["Pendiente"],
      deseas_reprogramar_visita: "icon",
      cierre_de_contrato: "icon",
      asignar_agente: "icon",
      agente: "-",
      propiedades: "1",
      nombre: "Emilio",
      apellido: "Herrera",
      telefono: "+51 9992 225 807",
      direccion: "Av. Miraflores #520",
      trabajas_agente_externo: "-",
      detalle_adicional: "Quisiera que el agente...",
      modalidad_de_propiedad: "-",
      categoria_de_propiedad: "-",
      tipo_de_propiedad: "-",
      codigo_de_propiedad: "1000118800001",
      observacion_para_verificador: "Quisiera que me puedas...",
      motivo_de_no_visita_gente: "Por defecto",
      fecha_de_visita_propietario: "Lunes 27 de Noviembre",
      hora_de_inicio_visita: "12:00 pm",
      hora_de_fin_visita: "2:00 pm",
    },
    {
      key: "2",
      rol: "AGENTE INMOBILIARIO",
      resumen: "archivo",
      tags: ["Pendiente"],
      enlace_de_publicacion: "https/www.casaspaceos",
      verificacion_completada: "icon",
      precios_de_propiedad: ["Por definir precio"],
      agente_realizo_visita: "icon",
      cierre_de_contrato: "icon",
      verificador: ["Programar verificador"],
      nombre_verificador: "-",
      agente: "Emilio Rodríguez",
      //asignar_agente: "*",
      fecha_de_visita_propietario: "Lunes 27 de Noviembre",
      hora_de_inicio_visita: "12:00 pm",
      hora_de_fin_visita: "2:00 pm",
      cargar_contrato: "icon",
      propiedades: "1",
      nombre: "Emilio",
      apellido: "Herrera",
      telefono: "+51 9992 225 807",
      direccion: "Av. Miraflores #520",
      trabajas_agente_externo: "-",
      detalle_adicional: "Quisiera que el agente...",
      modalidad_de_propiedad: "-",
      categoria_de_propiedad: "-",
      tipo_de_propiedad: "-",
      codigo_de_propiedad: "1000118800001",
      observacion_para_verificador: "Quisiera que me puedas...",
      motivo_de_no_visita_verificador: "-",
    },
  ];


  
  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ x: true }} />
      
    </>
  );
};
export default Reusable;

"use client";
import React, { useState } from "react";
import { ProfileOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Input, Button } from "antd";
import { dataPropietarios } from "./data";
import ModalCerrasteContrato from "./Modals/ModalCerrasteContrato";
import ModalResumen from "./Modals/ModalResumen";

const PreciosDePropiedad = () => {
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
      title: "Precios de propiedad",
      key: "precios_de_propiedad",
      dataIndex: "precios_de_propiedad",
      render: (precios_de_propiedad) => (
        <span>
          {precios_de_propiedad &&
          Object.keys(precios_de_propiedad).length > 0 ? (
            // Render a green Tag with "Precio definido" text
            <Tag color="green" onClick={handleTagClick}>
              Precio definido
            </Tag>
          ) : (
            // Render a light blue Tag with "Programar verificador" text
            <Tag color="blue" onClick={handleTagClick}>
              Por definir precio
            </Tag>
          )}
        </span>
      ),
    },
    {
      title: "Modalidad de propiedad",
      dataIndex: "modalidad_de_propiedad",
      key: "modalidad_de_propiedad",
    },
    /* {
      title: "Verificador",
      key: "verificador",
      dataIndex: "verificador",
    }, */
    {
      title: "Agente",
      dataIndex: "agente",
      key: "agente",
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
        (propietario) => propietario.estado === "Pendiente precio de propiedad"
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
          hora_de_inicio: propietario.hora_de_inicio_visita,
          hora_de_fin: propietario.hora_de_fin_visita,
          primer_nombre: propietario.primer_nombre,
          primer_apellido: propietario.primer_apellido,
          telefono: propietario.telefono,
          trabaja_con_agente: propietario.trabaja_con_agente,
          detalle_adicional: propietario.detalle_adicional,
        },
        estado: propietario.estado,
        precios_de_propiedad: propietario.precios_de_propiedad,
        modalidad_de_propiedad: propietario.modalidad_de_propiedad,
        verificador: propietario.verificador,
        agente: propietario.agente,
        propiedades: propietario.categoria_de_propiedades,
        nombre: propietario.primer_nombre,
        apellido: propietario.primer_apellido,
        telefono: propietario.telefono,
        direccion: propietario.direccion,
        trabajas_agente_externo: propietario.trabaja_con_agente,
        detalle_adicional: propietario.detalle_adicional,
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

  //---------------------------------------
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [precioInput, setPrecioInput] = useState(0);

  const handleTagClick = () => {
    console.log("1");
    setIsTableVisible(false);
  };

  const handleInputChange = (e) => {
    setPrecioInput(Number(e.target.value));
  };

  const handleIncrease = () => {
    setPrecioInput((prevPrecio) => prevPrecio + 1);
  };

  const handleDecrease = () => {
    setPrecioInput((prevPrecio) => Math.max(0, prevPrecio - 1));
  };

  const handleSave = () => {
    // Implement logic to save the entered price
    console.log("Saving price:", precioInput);

    // Show the table again
    setIsTableVisible(true);
  };

  return (
    <>
      {!isTableVisible ? (
        <div>
          <h2>¿Cuáles son los costos de la propiedad?</h2>
          <Input
            type="number"
            value={precioInput}
            onChange={handleInputChange}
            addonBefore="-"
            addonAfter="+"
          />
          <Button onClick={handleDecrease}>-</Button>
          <Button onClick={handleIncrease}>+</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      ) : (
        <>
          <Table columns={columns} dataSource={data} scroll={{ x: true }} />
          <ModalResumen
            isModalOpen={isModalOpen && modalData.actionType === "resumen"}
            data={modalData.data}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </>
      )}
    </>
  );
};
export default PreciosDePropiedad;

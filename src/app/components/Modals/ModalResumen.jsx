import React from "react";
import { Modal } from "antd";

const ModalResumen = ({ isModalOpen, data, handleOk, handleCancel }) => {
  if (!isModalOpen || !data) {
    // Return null or some loading state when data is not available
    return null;
  }

  const {
    ubicacion,
    direccion,
    distrito,
    provincia,
    departamento,
    codigo_postal,
    referencia,
    modalidad_de_propiedad,
    categoria_de_propiedades,
    tipo_de_propiedad,
    propiedades,
    fecha,
    hora_de_inicio,
    hora_de_fin,
    primer_nombre,
    primer_apellido,
    telefono,
    trabaja_con_agente,
    detalle_adicional,
  } = data.resumen;
  return (
    <>
      <Modal
        title="Resumen de datos del propietario"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h3>Ubicación de propiedad</h3>
        <p>{`Ubicación: ${ubicacion || "--"}`}</p>
        <p>{`Dirección: ${direccion || "--"}`}</p>
        <p>{`Distrito: ${distrito || "--"}`}</p>
        <p>{`Provincia: ${provincia || "--"}`}</p>
        <p>{`Departamento: ${departamento || "--"}`}</p>
        <p>{`Código Postal: ${codigo_postal || "--"}`}</p>
        <p>{`Referencia: ${referencia || "--"}`}</p>
        <h3>Detalles de propiedad</h3>
        <p>{`Modalidad de Propiedad: ${modalidad_de_propiedad || "--"}`}</p>
        <p>{`Categoría de Propiedades: ${categoria_de_propiedades || "--"}`}</p>
        <p>{`Tipo de Propiedad: ${tipo_de_propiedad || "--"}`}</p>
        <p>{`#Propiedades: ${propiedades || "--"}`}</p>
        <h3>Datos de visita con el propietario</h3>
        <p>{`Fecha: ${fecha || "--"}`}</p>
        <p>{`Hora de inicio: ${hora_de_inicio || "--"}`}</p>
        <p>{`Hora de fin: ${hora_de_fin || "--"}`}</p>
        <h3>Más información del propietario</h3>
        <p>{`Primer nombre: ${primer_nombre || "--"}`}</p>
        <p>{`Primer apellido: ${primer_apellido || "--"}`}</p>
        <p>{`Teléfono: ${telefono || "--"}`}</p>
        <p>{`Trabaja con Agente: ${trabaja_con_agente || "--"}`}</p>
        <p>{`Detalle Adicional: ${detalle_adicional || "--"}`}</p>
      </Modal>
    </>
  );
};
export default ModalResumen;

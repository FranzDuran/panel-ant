"use client";
import React, { useState, useEffect } from "react";
import { Modal, Select, Button, Table, Checkbox } from "antd";
import { dataAgentes } from "../data";

const { Option } = Select;

const AgenteAsignarModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  onAssign,
  data,
}) => {
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [isAssignButtonDisabled, setIsAssignButtonDisabled] = useState(true);

  useEffect(() => {
    // Obtén la lista de departamentos únicos al cargar el componente
    const uniqueDepartments = [
      ...new Set(dataAgentes.map((agente) => agente.departamento)),
    ];
    setDepartments(uniqueDepartments);
  }, []);

  useEffect(() => {
    // Actualiza las provincias cuando se selecciona un departamento
    if (selectedDepartment) {
      const uniqueProvinces = [
        ...new Set(
          dataAgentes
            .filter((agente) => agente.departamento === selectedDepartment)
            .map((agente) => agente.provincia)
        ),
      ];
      setProvinces(uniqueProvinces);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    // Actualiza los distritos cuando se selecciona una provincia
    if (selectedProvince) {
      const uniqueDistricts = [
        ...new Set(
          dataAgentes
            .filter((agente) => agente.provincia === selectedProvince)
            .map((agente) => agente.distrito)
        ),
      ];
      setDistricts(uniqueDistricts);
    }
  }, [selectedProvince]);

  const handleSearch = () => {
    // Filtra los agentes basados en el departamento, provincia y distrito seleccionados
    const filteredAgents = dataAgentes.filter((agente) => {
      return (
        (!selectedDepartment || agente.departamento === selectedDepartment) &&
        (!selectedProvince || agente.provincia === selectedProvince) &&
        (!selectedDistrict || agente.distrito === selectedDistrict)
      );
    });

    setSearchResult(filteredAgents);
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    // Limpiar las selecciones de provincia y distrito al cambiar el departamento
    setSelectedProvince(null);
    setSelectedDistrict(null);
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    // Limpiar la selección de distrito al cambiar la provincia
    setSelectedDistrict(null);
  };

  const resetSearchData = () => {
    setSearchResult([]);
    setSelectedDepartment(null);
    setProvinces([]);
    setSelectedProvince(null);
    setDistricts([]);
    setSelectedDistrict(null);
    setSelectedAgents([]);
  };
  const handleAssign = () => {
    // Llama a la función proporcionada por el componente padre
    onAssign(selectedAgents);
    resetSearchData();
    // Cierra el modal
    handleCancel();
  };

  const handleCheckboxTodosChange = () => {
    // Toggle the state of "Todos" checkbox and clear other selections
    setSelectAll((prevSelectAll) => {
      if (!prevSelectAll) {
        const approvedAgents = dataAgentes.filter((agent) => {
          return agent.estado === "Aprobado";
        });

        console.log(approvedAgents);
        setSearchResult(approvedAgents);
        // Clear other selections
        setSelectedDepartment(null);
        setSelectedProvince(null);
        setSelectedDistrict(null);
      } else {
        // If "Todos" checkbox is unchecked, clear the table
        setSearchResult([]);
      }
      return !prevSelectAll;
    });
  };
  

  const handleCheckboxChange = (record) => {
    setSelectedAgents((prevSelected) => {
      const agentIndex = prevSelected.findIndex(
        (agent) => agent.id === record.id
      );

      // Clear the selection by removing all previously selected agents
      const newSelected = prevSelected.filter(
        (agent) => agent.id === record.id
      );

      // If the agent is not in the selectedAgents, add it
      if (agentIndex === -1) {
        newSelected.push(record);
      }

      const isAtLeastOneCheckboxSelected = newSelected.length > 0;
      setIsAssignButtonDisabled(!isAtLeastOneCheckboxSelected);
      return newSelected;
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "nombre",
      key: "name",
    },
    {
      title: "Last Name",
      dataIndex: "apellido",
      key: "lastName",
    },
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          onChange={() => handleCheckboxChange(record)}
          checked={selectedAgents.some((agent) => agent.id === record.id)}
        />
      ),
    },
  ];


  return (
    <>
      <Modal
        title="Agentes disponibles"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleAssign}
            disabled={isAssignButtonDisabled}
          >
            Asignar
          </Button>,
        ]}
      >
        <Select
          placeholder="Seleccionar Departamento"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          {departments.map((department, index) => (
            <Option key={index} value={department}>
              {department}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Seleccionar Provincia"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          {provinces.map((province, index) => (
            <Option key={index} value={province}>
              {province}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Seleccionar Distrito"
          value={selectedDistrict}
          onChange={(value) => setSelectedDistrict(value)}
        >
          {districts.map((district, index) => (
            <Option key={index} value={district}>
              {district}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleSearch}>
          Buscar
        </Button>
        <Checkbox onChange={handleCheckboxTodosChange}>Todos</Checkbox>
        <Table columns={columns} dataSource={searchResult} />
      </Modal>
    </>
  );
};

export default AgenteAsignarModal;

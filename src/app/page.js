"use client";
import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  CloudUploadOutlined,
  UserOutlined,
  CreditCardOutlined,
  ProfileOutlined,
  HomeOutlined,
  DollarOutlined,
  FileSearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Pagination } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    icon: <HomeOutlined />,
    label: "Inicio",
    key: "1",
  },
  {
    icon: <UserOutlined />,
    label: "Potenciales clientes",
    key: "2",
  },
  {
    icon: <ProfileOutlined />,
    label: "Solicitudes para aprobar agentes inmobiliarios",
    key: "3",
  },
  {
    icon: <HomeOutlined />,
    label: "Asignaciones",
    key: "4",
  },
  {
    icon: <ProfileOutlined />,
    label: "Listado de Visitas",
    key: "5",
  },
  {
    icon: <ProfileOutlined />,
    label: "Reprogramaciones",
    key: "6",
  },
  {
    icon: <CloudUploadOutlined />,
    label: "Cierre de contrato",
    key: "7",
  },
  {
    icon: <CloudUploadOutlined />,
    label: "Potenciales propietarios sin acuerdos de contrato",
    key: "8",
  },

  {
    icon: <DollarOutlined />,
    label: "Precios de propiedad",
    key: "9",
  },
  {
    icon: <CreditCardOutlined />,
    label: "Programar verificador",
    key: "10",
  },
  {
    icon: <FileSearchOutlined />,
    label: "Lista de verificaciones",
    key: "11",
  },
  {
    icon: <ShopOutlined />,
    label: "Seguimiento de propiedad",
    key: "12",
  },
  {
    icon: <QuestionCircleOutlined />,
    label: "Ayuda", // Cambiado el nombre aquí
    key: "13",
  },
];

import PotencialesClientes from "./components/PotencialesClientes";
import ListadoDeVisitas from "./components/ListadoDeVisitas";
import SolicitudesAgentes from "./components/SolicitudesAgentes";
import Asignaciones from "./components/Asignaciones";
import Reprogramaciones from "./components/Reprogramaciones";
import CierreDeContrato from "./components/CierreDeContrato";
import PotencialesPropietarios from "./components/PotencialesPropietarios";
import PreciosDePropiedad from "./components/PreciosDePropiedad";

const App = () => {
  /* const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken(); */

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
  };
  // Función para renderizar el componente correspondiente al elemento del menú seleccionado
  const renderSelectedComponent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <PotencialesClientes />;
      case "2":
        return <PotencialesClientes />;
      case "3":
        return <SolicitudesAgentes />;
      case "4":
        return <Asignaciones />;
      case "5":
        return <ListadoDeVisitas />;
        case "6":
        return <Reprogramaciones />;
        case "7":
        return <CierreDeContrato />;
        case "8":
        return <PotencialesPropietarios />;
        case "9":
        return <PreciosDePropiedad />;

      // Agrega más casos según sea necesario para otros elementos del menú

      default:
        return null; // Puedes mostrar un mensaje de error o un componente por defecto aquí
    }
  };

  useEffect(() => {
    //console.log(selectedMenuItem);
  }, [selectedMenuItem]);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuClick}
          items={items}
        /> */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={handleMenuClick}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        {/* <Header
          style={{
            padding: 0,
            //background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          {renderSelectedComponent()}
          <Pagination defaultCurrent={1} total={50} />
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default App;

# 🚀 React Native challenge at Cocos Capital

Este es un proyecto hecho para un React Native Challenge de la empresa [Cocos Capital]((https://cocos.capital/))


## Descripción

Esta es una aplicación móvil sobre inversión en acciones, desarrollada en **React Native** con **Expo**. La aplicación permite a los usuarios realizar órdenes de compra y venta de acciones, monitorear el estado de sus inversiones, y gestionar su portafolio de manera eficiente. Además, incluye funciones avanzadas como filtrado y búsqueda de instrumentos financieros, así como la capacidad de manejar diferentes tipos de órdenes (MARKET y LIMIT).

## Funcionalidades Principales

- **Consulta de Instrumentos Financieros**: Los usuarios pueden explorar una lista de instrumentos financieros disponibles, con detalles como el nombre de la compañía, ticker, nombre, ultimo precio y retorno .

- **Visualización del Portafolio**: Los usuarios pueden ver el rendimiento de sus inversiones en tiempo real, incluyendo el valor total del portafolio y las ganancias o pérdidas porcentuales de cada activo.

- **Compra y Venta de Acciones**:
  - **Órdenes de Compra/Venta**: Los usuarios pueden enviar órdenes de compra o venta especificando el tipo de orden (MARKET o LIMIT), la cantidad de acciones, y el precio si la orden es LIMIT.
  - **Confirmación de Órdenes**: Se solicita confirmación al usuario antes de ejecutar una orden para evitar errores.
  - **Seguimiento de Órdenes**: Después de enviar una orden, se muestra el estado de la misma (PENDING, FILLED, REJECTED) junto con los detalles de la transacción.

- **Filtrado de Instrumentos**: La app permite buscar y filtrar instrumentos financieros dentro de la lista de acciones, facilitando la navegación y selección.


## Tecnologías Utilizadas

- **React Native**: Desarrollo de la aplicación móvil para Android e iOS.
- **Expo**: Plataforma de desarrollo que facilita la creación y despliegue de aplicaciones móviles.
- **Redux Toolkit** para la gestión del estado global.
- **Formik** para la gestión y validación de formularios.
- **Yup** para la validación de formularios.
- **TanStack Query** para la gestión de datos remotos.
- **Axios** para las solicitudes HTTP.
- **Expo-Blur** para efectos visuales avanzados.

## Imágenes de la Aplicación

A continuación se muestran algunas capturas de pantalla de la aplicación:

- **Pantalla de Inicio**

<img width="477" alt="image" src="https://github.com/user-attachments/assets/372cc56e-2509-44f9-b85f-cece31240041">


- **Lista de Instrumentos Financieros**

<img width="491" alt="image" src="https://github.com/user-attachments/assets/e0d00317-0b32-415d-8aa1-5b428f76877a">


- **Visualización del Portafolio**

<img width="488" alt="image" src="https://github.com/user-attachments/assets/89c56e82-e8b4-4406-a891-79351d50a2c6">


- **Compra de Acciones**

<img width="496" alt="image" src="https://github.com/user-attachments/assets/da7a8452-bba8-42ff-b996-5a2340ec60ef">
<img width="483" alt="image" src="https://github.com/user-attachments/assets/22ef176d-c2ee-4109-8d3f-d017dd6e291b">

- **Confirmación de Orden**

<img width="485" alt="image" src="https://github.com/user-attachments/assets/efb1af1c-bf1f-4f0f-ac2c-0dbc49cbe0c0">


- **Resultado de la Orden**

<img width="490" alt="image" src="https://github.com/user-attachments/assets/511d8e42-68c3-4060-ac62-79c8d1cb7ff1">


<img width="477" alt="image" src="https://github.com/user-attachments/assets/2fa692a1-cf04-4497-8856-30174804991b">

<img width="483" alt="image" src="https://github.com/user-attachments/assets/3a48f77a-49aa-473f-a508-159b7fd22038">

## Demo del producto

https://github.com/user-attachments/assets/5c678024-68ed-4b22-9b75-eb262c90ec9b


## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 14 o superior)
- **Expo CLI** (puedes instalarlo con `npm install -g expo-cli`)
- **Yarn** o **npm** (gestor de paquetes)

## Instalación
```
1. Clona este repositorio en tu máquina local:

   git clone https://github.com/InesR21/Fintechapp.git
   cd fintechapp

2. Instalar dependencias:
    npm install

3. PreBuilt
    npx expo prebuild

4. Iniciar la aplicación:
    npx expo run ios
```

¡Listo! 🚀🚀🚀


## Autor ✒️

- **Ines Rojas** - _Front End Developer_ - [InesR](https://inesrojas.com/)

## Contributing

¡Las contribuciones son bienvenidas! No dudes en abrir un issue o enviar una solicitud de pull request.

## License

Este proyecto está licenciado bajo la  [LICENSE](LICENSE).

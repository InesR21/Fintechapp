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

![Pantalla de Inicio]()

- **Lista de Instrumentos Financieros**

![Lista de Instrumentos]()

- **Visualización del Portafolio**

![Portafolio]()

- **Compra de Acciones**

![Compra de Acciones]()

- **Confirmación de Orden**

![Confirmación de Orden]()

- **Resultado de la Orden**

![Resultado de la Orden]()





## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 14 o superior)
- **Expo CLI** (puedes instalarlo con `npm install -g expo-cli`)
- **Yarn** o **npm** (gestor de paquetes)

## Instalación

1. Clona este repositorio en tu máquina local:
```
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


## Demo del producto


## Autor ✒️

- **Ines Rojas** - _Front End Developer_ - [InesR](https://inesrojas.com/)

## Contributing

¡Las contribuciones son bienvenidas! No dudes en abrir un issue o enviar una solicitud de pull request.

## License

Este proyecto está licenciado bajo la  [LICENSE](LICENSE).

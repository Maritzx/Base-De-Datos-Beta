# Base de Datos Integral para Cultivo Profesional de Cannabis

Aplicación web construida con React y Vite que modela una base de datos completa para la planificación, gestión y trazabilidad de cultivos profesionales de *Cannabis sativa* L. Incluye entidades que cubren todo el ciclo productivo, desde la genética y la propagación hasta el secado, curado e inventario final.

## Características principales

- **Modelo de datos modular**: 16 entidades interrelacionadas con más de 150 campos que abarcan parámetros agronómicos, ambientales, de cumplimiento y poscosecha.
- **Persistencia local**: Los registros se almacenan en `localStorage`, permitiendo trabajar sin backend y exportar fácilmente la información.
- **Datos de ejemplo**: Se incluye un dataset de referencia basado en un cultivo industrial certificado para visualizar relaciones y mejores prácticas.
- **Interfaz adaptable**: Navegación por etapas del ciclo, métricas clave y formularios dinámicos para registrar datos en cualquier escala de producción.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Ejecución en modo desarrollo

```bash
npm run dev
```

El servidor de desarrollo abrirá automáticamente la aplicación en tu navegador. Si el puerto `5173` estuviera ocupado, Vite elegirá otro disponible y lo mostrará en la terminal.

### Solución de problemas de acceso (`HTTP ERROR 404`)

Si el navegador muestra un error 404 al intentar acceder a `localhost`, verifica lo siguiente:

1. Confirma en la terminal que el servidor de Vite sigue ejecutándose y revisa la URL exacta que indica (por ejemplo `http://localhost:5174/`).
2. Asegúrate de que no exista otro proceso usando el puerto 5173. Si es necesario, detén el proceso en conflicto o utiliza la URL alternativa que provea Vite.
3. Si ejecutas el proyecto dentro de un contenedor o máquina virtual, utiliza la IP o el hostname expuestos por dicho entorno (gracias al parámetro `--host`).

## Build de producción

```bash
npm run build
```

Luego de compilar, puedes previsualizar el build ejecutando:

```bash
npm run preview
```

## Estructura relevante

- `src/data/schema.js`: Definición de entidades, campos y metadatos del modelo.
- `src/data/sampleData.js`: Dataset de referencia con registros completos por cada fase.
- `src/context/DataContext.jsx`: Proveedor de datos que gestiona persistencia, inserción, edición y eliminación.
- `src/components/`: Componentes reutilizables para formularios dinámicos, tablas y paneles de control.

## Personalización

1. **Ajustar entidades**: Modifica `schema.js` para añadir campos, reglas o nuevas entidades según tu operación.
2. **Integración con backend**: Sustituye la lógica de `DataContext` por llamadas a tu API o base de datos relacional/noSQL.
3. **Exportación**: Almacena el contenido de `localStorage` (`cultivation-database-v1`) para respaldos o migraciones.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Puedes adaptarlo libremente para operaciones comerciales o de investigación, respetando las regulaciones locales vigentes.

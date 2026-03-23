# Stockfils Front

Frontend profesional para la gestion de stock de filamentos de impresion 3D, con foco en experiencia de usuario, arquitectura escalable y calidad de codigo.

## Resumen del proyecto

- **Tipo de producto:** aplicacion web tipo SaaS de dashboard e inventario
- **Dominio:** control de stock de filamentos para impresion 3D
- **Objetivo principal:** centralizar inventario, consumo y trazabilidad
- **Estado:** proyecto funcional con rutas protegidas, dashboard, inventario y flujo de consumo

## Que demuestra este proyecto

Este proyecto esta planteado para mostrar capacidad real de desarrollo frontend en entorno productivo:

- Arquitectura por features y separacion de responsabilidades.
- Manejo de estado global con Redux Toolkit.
- UX responsive con enfoque mobile-first y mejoras iterativas.
- Buenas practicas de accesibilidad y semantica.
- Flujo de calidad con linting, formateo y git hooks.
- Entorno de testing con Vitest + Testing Library.

## Funcionalidades principales

- Autenticacion y proteccion de rutas.
- Dashboard con visualizacion de estado general.
- Gestion de inventario de filamentos:
  - alta de bobinas
  - listado filtrable y ordenable
  - marcado de favoritos
  - vista de detalle
- Registro de consumo y actualizacion de stock en tiempo real.
- Historial de impresiones/consumos.
- UI responsive para escritorio y movil.

## Stack tecnologico

- **Framework:** React 19 + TypeScript
- **Herramienta de build:** Vite 7
- **Gestion de estado:** Redux Toolkit + React Redux
- **Enrutado:** React Router 7
- **Estilos:** Tailwind CSS 4
- **Testing:** Vitest + Testing Library + MSW
- **Calidad de codigo:** ESLint + Prettier + Husky + lint-staged

## Arquitectura

La estructura sigue un enfoque modular por dominio:

```txt
src/
  components/         # layout y componentes compartidos
  features/
    auth/             # login, registro, guardas y estado de sesion
    stock/            # logica principal de inventario
    historyPrint/     # consumo e historial de impresion
    dashboard/        # metricas y widgets
  pages/              # composicion por ruta
  router/             # definicion de rutas
  store/              # store global de Redux
```

### Puntos clave de arquitectura

- **Organizacion por features** para escalar sin acoplamiento excesivo.
- **Slices por dominio** (`auth`, `stock`, `printingHistory`) para mantener un modelo de estado claro.
- **Hooks por caso de uso** para encapsular llamadas al cliente HTTP y efectos secundarios.
- **Componentes UI reutilizables** para consistencia visual.

## Rutas

- `/` -> landing/autenticacion
- `/dashboard` -> panel principal (protegido)
- `/stock` -> listado de inventario (protegido)
- `/stock/nuevo` -> alta de filamento (protegido)
- `/stock/filamento/:id` -> detalle de filamento (protegido)

## Puesta en marcha

### 1) Instalar dependencias

```bash
npm install
```

### 2) Configurar variables de entorno

Crea un archivo `.env` en la raiz:

```bash
VITE_API_URL=http://localhost:4000
```

### 3) Ejecutar en desarrollo

```bash
npm run dev
```

## Scripts disponibles

- `npm run dev` -> entorno local
- `npm run build` -> build de produccion
- `npm run preview` -> previsualizacion de build
- `npm run lint` -> analisis estatico
- `npm run test` -> ejecutar tests una sola vez
- `npm run test:dev` -> tests en modo watch
- `npm run test:coverage` -> cobertura de tests

## Estandares de calidad

El proyecto incorpora controles de calidad automatizados:

- **Prettier** para formato consistente.
- **ESLint** con reglas para React/TypeScript.
- **Husky + lint-staged** para validar archivos antes de commit.
- Convencion de commits en ingles y estilo imperativo (`Add`, `Create`, `Refactor`, etc.).

## Principios de accesibilidad y UX

- Inputs con labels accesibles (incluyendo `sr-only` cuando aplica).
- Navegacion y feedback pensados para escritorio y movil.
- Iteraciones de UI centradas en claridad visual, jerarquia y acciones de alto impacto.

## Autora

**Isabel Saenz**  
Desarrolladora Frontend

# Generator Config

Aplicación React + TypeScript para generar y descargar archivos de configuración `delivery.json` a partir de un archivo `ConfigMvp.json`.

## Características

- 📦 **Redux State Management** - Gestión centralizada del estado
- 💾 **LocalStorage Persistence** - Guarda automáticamente el estado
- 🎨 **Dark Theme** - Interfaz moderna con colores cyan y naranja
- 📱 **Responsive Design** - Funciona en mobile, tablet y desktop
- ⚡ **Vite + React 18** - Build rápido y desarrollo optimizado
- 🎯 **TypeScript** - Tipado estricto

## Instalación y Uso

### Requisitos
- Node.js 18+
- npm o yarn

### Desarrollo

```bash
npm install
npm run dev
```

Se abrirá en `http://localhost:5173`

### Build

```bash
npm run build
```

Genera los archivos optimizados en `/dist`

### Preview Build

```bash
npm run preview
```

## GitHub Pages Deployment

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.

### Configuración Inicial

1. **Crea un repositorio en GitHub** llamado `generator-config`

2. **Configura GitHub Pages**:
   - Ve a `Settings` > `Pages`
   - En **Source**, selecciona **GitHub Actions**
   - Guarda los cambios

3. **Configura la URL base** (si es necesario):
   - Si despliegas en un repo secundario (ej: `username/generator-config`):
     - Edita `vite.config.ts`
     - Cambia `return '/'` por `return '/generator-config/'`
   - Si despliegas en `username.github.io`:
     - Mantén `return '/'`

4. **Push a GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

### Despliegue Automático

El workflow `.github/workflows/build-and-deploy.yml` se ejecutará automáticamente en cada push a `main` o `master`:

- ✅ Instala dependencias
- ✅ Build del proyecto
- ✅ Despliega en GitHub Pages

**Ver estado del despliegue**: Ve a la pestaña **Actions** en tu repositorio de GitHub

## Estructura del Proyecto

```
src/
├── components/              # Componentes React
│   ├── ParameterInput.tsx
│   ├── PipelineList.tsx
│   ├── EnvSelector.tsx
│   ├── LoadButton.tsx
│   ├── Preview.tsx
│   └── layout/
│       └── Layout.tsx
├── redux/                   # State management
│   ├── store.ts
│   ├── slices/
│   │   ├── configSlice.ts
│   │   └── selectionSlice.ts
│   └── middleware/
│       └── persistenceMiddleware.ts
├── utils/                   # Funciones utilitarias
│   ├── StringUtils.ts
│   ├── FileUtils.ts
│   └── StorageUtils.ts
├── models/                  # Tipos TypeScript
│   ├── ConfigMvp.ts
│   └── Delivery.ts
├── App.tsx
├── Form.tsx
├── main.tsx
└── index.css
```

## Tecnologías

- **React 18.2** - UI Framework
- **TypeScript 5.3** - Lenguaje
- **Vite 5.4** - Build tool
- **Redux Toolkit 2.11** - State management
- **Tailwind CSS 3.4** - Styling
- **react-icons 4.10** - Iconos

## Desarrollo

### Agregar nuevas utilidades

Las funciones reutilizables van en `src/utils/`:
- `StringUtils.ts` - String y path manipulation
- `FileUtils.ts` - Manejo de archivos
- `StorageUtils.ts` - localStorage operations

### Agregar nuevos componentes

Los componentes van en `src/components/` como archivos `.tsx` con:
- Props interface tipificado
- JSDoc comments
- Estilos Tailwind inline
- Exports nombrados o default

### Redux actions

Agregar acciones en los slices correspondientes:
- `configSlice.ts` - Estados de configuración
- `selectionSlice.ts` - Estados de selección

## Licencia

MIT
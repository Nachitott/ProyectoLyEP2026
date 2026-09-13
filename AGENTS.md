# AGENT RULES & PROJECT CONTEXT

## INFORMACIÓN DEL PROYECTO
- **Nombre del Proyecto:** ProyectoLyEP2026 (React 19 + Vite + Bootstrap/CSS Modules)
- **Metodología:** Spec-Driven Development (SDD) con commits atómicos por issue.
- **Rama activa de trabajo:** `style/11-diseno-visual-modal`
- **Issue asociada:** #11 (Opción 5: Sistema de Diseño Visual, Iconografía y Modal de Confirmación)

---

## RESTRICCIONES Y REGLAS DE ARQUITECTURA
1. **Preservación de Lógica Core:** NO modificar lógica de autenticación, rutas principales ni la firma de funciones en `src/services/clientesService.js`.
2. **Estilos:** Priorizar CSS Modules (`*.module.css`) o clases aisladas. No utilizar selectores globales descontrolados ni la directiva `!important`.
3. **Control de Versiones (Git):** 
   - Publicar directo sobre `origin` (repositorio compartido, sin forks).
   - Formato de commits estricto: `tipo(scope): descripción (#11)` (ej. `feat(icons): ... (#11)`).

---

## ESTADO DE AVANCE (ISSUE #11)
- [x] **Paso 1:** Paleta de variables CSS globales (`app.css`). -> *Commit completado.*
- [x] **Paso 2:** Iconografía semántica (`react-icons` instalada). -> *Commit completado.*
- [x] **Paso 3:** Modularización y limpieza de estilos CSS. -> *Commit completado.*
- [x] **Paso 4:** Reubicación y alineación del buscador en tablas. -> *Commit completado.*
- [ ] **Paso 5 (PENDIENTE):** Modal de confirmación interactivo antes de ejecutar `DELETE` en `DetalleCliente.jsx`.

---

## COMANDOS DE VALIDACIÓN
Antes de dar por concluido un paso o hacer un commit, ejecutar:
`npm run build`
# Workspace operativo

Espacio público para organizar diagramas, indicadores de pedidos y proyectos, y guías de trabajo y automatización.

## Contenido

- [Diagrama de abastecimiento WOS + Modelo YAS](diagrams/abastecimiento-wos-yas.md)
- [Guía para trabajar con agentes](playbooks/trabajo-con-agentes.md)
- `projects/`: planes y documentación de proyectos.
- `indicators/`: definiciones, consultas y documentación de indicadores. Mantener los datos de negocio en ubicaciones autorizadas y compartir aquí solo lo necesario.

## Seguridad de credenciales y datos

No guardar contraseñas, tokens, claves privadas, cadenas de conexión ni credenciales reales en el repositorio, issues, diagramas o historial de Git, aunque sea privado. Para consultas, usar el gestor de secretos aprobado por la organización o secretos del entorno de ejecución; documentar aquí solo los nombres de las variables requeridas y cómo obtener acceso. No incluir datos personales o exportaciones de producción sin autorización.

Si una credencial se publica por error, revocarla/rotarla de inmediato y seguir el proceso interno de respuesta; borrar el archivo no elimina el secreto del historial.

## Publicación

El repositorio es público: todo su contenido e historial es visible para cualquiera. GitHub Pages publica el sitio interactivo desde `site/`; no agregues allí ni al repositorio información confidencial, credenciales ni datos personales. Las notas del diagrama se guardan únicamente en el almacenamiento local del navegador y no se sincronizan con GitHub ni con otras personas.

- [Abrir el diagrama interactivo](https://eblasiandreani.github.io/workspace-operativo/)
- Los cambios en `site/` se publican automáticamente desde la rama `main` mediante GitHub Actions.
- El diagrama editable original permanece en [`diagrams/abastecimiento-wos-yas.md`](diagrams/abastecimiento-wos-yas.md).

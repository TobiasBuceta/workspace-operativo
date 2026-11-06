# Workspace operativo

Espacio privado para organizar diagramas, indicadores de pedidos y proyectos, y guías de trabajo y automatización.

## Contenido

- [Diagrama de abastecimiento WOS + Modelo YAS](diagrams/abastecimiento-wos-yas.md)
- [Guía para trabajar con agentes](playbooks/trabajo-con-agentes.md)
- `projects/`: planes y documentación de proyectos.
- `indicators/`: definiciones, consultas y documentación de indicadores. Mantener los datos de negocio en ubicaciones autorizadas y compartir aquí solo lo necesario.

## Seguridad de credenciales y datos

No guardar contraseñas, tokens, claves privadas, cadenas de conexión ni credenciales reales en el repositorio, issues, diagramas o historial de Git, aunque sea privado. Para consultas, usar el gestor de secretos aprobado por la organización o secretos del entorno de ejecución; documentar aquí solo los nombres de las variables requeridas y cómo obtener acceso. No incluir datos personales o exportaciones de producción sin autorización.

Si una credencial se publica por error, revocarla/rotarla de inmediato y seguir el proceso interno de respuesta; borrar el archivo no elimina el secreto del historial.

## Publicación

El repositorio es privado, pero el sitio publicado en GitHub Pages es público. Solo se publica el contenido de `site/`; no agregar ahí información confidencial ni datos reales. La página permite agregar notas que se guardan únicamente en el almacenamiento local del navegador y no se sincronizan con GitHub ni con otras personas.

- [Abrir el diagrama interactivo](https://eblasiandreani.github.io/workspace-operativo/)
- Para desplegarlo, configura GitHub Pages en **Settings → Pages → Build and deployment → GitHub Actions** y ejecuta **Deploy GitHub Pages** desde **Actions → Run workflow** para la primera publicación. Los cambios en `site/` se publican desde la rama `main`.
- El diagrama editable original permanece en [`diagrams/abastecimiento-wos-yas.md`](diagrams/abastecimiento-wos-yas.md).

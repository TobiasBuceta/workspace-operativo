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

El repositorio es privado y GitHub Pages no está disponible con el plan actual sin hacerlo público o actualizar el plan. Por eso se configuró una vista previa privada en GitHub Codespaces. Solo se sirve la carpeta `site/`; las notas se guardan en el almacenamiento local del navegador y no se sincronizan con GitHub ni con otras personas.

- En GitHub, abre **Code → Codespaces → Create codespace on main**. Al iniciar, Codespaces arranca el servidor y abre el diagrama; si no se abre automáticamente, selecciona el puerto **8000** en la pestaña **Ports** y elige **Open in Browser**. El puerto está configurado como privado y solo deben poder acceder usuarios autorizados al repositorio.
- El uso de Codespaces está sujeto a la disponibilidad, cuota y configuración de facturación de la cuenta.
- El diagrama editable original permanece en [`diagrams/abastecimiento-wos-yas.md`](diagrams/abastecimiento-wos-yas.md).

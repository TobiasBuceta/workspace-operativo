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

El repositorio es privado: sus archivos, incluido el diagrama, requieren acceso a GitHub. El enlace al archivo del diagrama está arriba. No habilitar Pages ni copiar contenido a un sitio público si debe permanecer restringido.

# Práctica T04

Se ha puesto en contacto un cliente que quiere que le desarrollemos un visor de mapas web para la consulta de los Caminos de Santiago por España.

Tras varias reuniones con él, el equipo de desarrollo a obtenido la siguiente relación de requisitos técnicos y funcionales para la aplicación:

- El diseño de la aplicación debe contar como mínimo con una barra superior a modo de menú con el título de la aplicación (“Caminos de Santiago”) y el mapa.
- La vista inicial del mapa debe ser España y limitada a su área geográfica.
- Debe contar con herramientas que permitan hacer zum más y zum menos, presente la atribución de la capa base, añada un mapa guía. Si es posible debe existir un botón que haga zoom a la provincia de La Coruña.
- Como capa principal debe verse los diferentes caminos de Santiago. La capa la facilita el cliente.
- La capa lineal debe simbolizarse de forma correcta. El cliente quiere Si es posible, y o es muy costoso, podrían verse colores diferentes según el campo agrupación.
- La capa de caminos se debe de ver sobre tres mapas base: OMS, el WMS del PNOA y el WMS de la primera edición del MTN50. Solo se debe ver una capa base por defecto
- El cliente quiere que se pueda activar o desactivar la visualización de la capa de caminos y cambiar el mapa base.
- Para cada camino se debe poder consultar sus atributos principales.
  
## Requisitos tecnológicos:

La aplicación debe estar desarrollada usando la librería JS OpenLayers ya que se prevé implementar futuros desarrollos que permitan por ejemplo añadir herramientas de edición.

## Adjuntos:
- Proyecto plantilla con Vite (t4-visor-caminos.zip)
- WMS PNOA
  - URL del WMS https://www.ign.es/wms-inspire/pnoa-ma? 
  - Capa: OI.OrthoimageCoverage
- WMS Primera edición MTN50
  - URL del WMS https://www.ign.es/wms/primera-edicion-mtn 
  - Capa: MTN50
- GeoJSON con los caminos de Santiago (dentro de la carpeta /data).

## Opciones sobre el desarrollo de la práctica:

La aplicación puede estar desarrollada incluyendo todas funcionalidades dentro del mapa (Tema 4 Ejemplo 1 - Vídeos 1-4) o personalizando cada requisitos usando JavaScript, CSSS y HTML5 (Tema 4 - Ejemplo 2 - Vídeo 5)

## Entrega:
- Opción 1. Enlace a repositorio GitHub con el código del desarrollo (asegúrate que no se suben los archivos de la carpeta /node_modules)
- Opción 2. Archivo comprimido del proyecto sin añadir os archivos de la carpeta /node_modules.


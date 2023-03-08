import './style.css';
import {Map, View} from 'ol';
//import TileLayer from 'ol/layer/Tile';
//import OSM from 'ol/source/OSM';

import { OSM, TileWMS, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";

import GeoJSON from "ol/format/GeoJSON";

import {fromLonLat} from 'ol/proj';
import sync from "ol-hashed";

// Controles
import {
  ScaleLine,
  MousePosition,
  ZoomToExtent,
  OverviewMap,
  FullScreen,
  defaults as defaultControls,
  Control,
} from "ol/control";

//Estilos
import {
  Text,
  Icon,
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
} from "ol/style";

//Overlay y layerSwitcher
import Overlay from "ol/Overlay";

import "ol-layerswitcher/dist/ol-layerswitcher.css";
import LayerSwitcher from "ol-layerswitcher";

const center_4326=fromLonLat([-3.6667,36])
const spainExtent = [-4242152.2315, 2253314.7512, 3506727.948, 6152214.69];
const corunia_extent=[-1051943, 5103303, -819030, 5467062];

// OverviewMap control

const overviewMapControl = new OverviewMap({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
});

// Zoom extent contol

const zoomToCoruniaControl = new ZoomToExtent({
   extent: corunia_extent,
 });


//Controles EXTEND activados
const extendControls = [
  overviewMapControl,
  //fullScreenControl,
  zoomToCoruniaControl,
  // mousePositionControl,
  // scaleControl,
  // scaleControl2,
  // infoControl
];

//Capas

//capa OSM
const osmLayer=new TileLayer({
  title:'OpenStreetMap',
  source: new OSM(),
  type:'base',
  visible: true,  
});

//capas WMS
const ortoPNOALayer = new TileLayer({
  title: "PNOA",
  visible: false,
  source: new TileWMS({
    url: "https://www.ign.es/wms-inspire/pnoa-ma?",
    params: { LAYERS: "OI.OrthoimageCoverage", TILED: true },
    attributions:
      '© <a href="https://www.ign.es/web/ign/portal">Instituto Geográfico Nacional</a>',
  }),
  type: "base",
});

const MTN50Layer = new TileLayer({
  title: "MTN50",
  visible: false,
  source: new TileWMS({
    url: "https://www.ign.es/wms/primera-edicion-mtn",
    params: { LAYERS: "MTN50", TILED: true },
    attributions:
      '© <a href="https://www.ign.es/web/ign/portal">Instituto Geográfico Nacional</a>',
  }),
  type: "base",
});

//capa geoJSON

//    Temático de los Caminos por campo Agrupación

const CaminoAgrupaStyle=function(feature){
  let agrupaCaminos= feature.get("agrupacion");
  let stroke_white = new Stroke({ color: "white", width: 2 });
  if(agrupaCaminos ==='Camino Francés'){
    return new Style({
      stroke: new Stroke({color: "red", width: 2})
    });
  } else  if(agrupaCaminos ==='Caminos Andaluces'){
    return new Style({
      stroke: new Stroke({color: "green", width: 2})
    });
  } else  if(agrupaCaminos ==='Caminos Catalanes'){
    return new Style({
      stroke: new Stroke({color: "blue", width: 2})
    });
  } else  if(agrupaCaminos ==='Caminos de Galicia'){
    return new Style({
      stroke: new Stroke({color: "purple", width: 2})
    });
  } else  if(agrupaCaminos ==='Caminos del Centro'){
    return new Style({
      stroke: new Stroke({color: "fuchsia", width: 2})
    });  
  } else  if(agrupaCaminos ==='Caminos del Este'){
    return new Style({
      stroke: new Stroke({color: "lime", width: 2})
    });      
  } else  if(agrupaCaminos ==='Caminos del Norte'){
    return new Style({
      stroke: new Stroke({color: "aqua", width: 2})
    }); 
  } else  if(agrupaCaminos ==='Caminos Insulares'){
    return new Style({
      stroke: new Stroke({color: "coral", width: 2})
    }); 
  } else  if(agrupaCaminos ==='Caminos Portugueses'){
    return new Style({
      stroke: new Stroke({color: "darkslategray", width: 2})
    }); 
  } else  if(agrupaCaminos ==='Chemins vers Via des Piemonts'){
    return new Style({
      stroke: new Stroke({color: "gold", width: 2})
    });     
  } else  if(agrupaCaminos ==='Chemins vers Via Turonensis'){
    return new Style({
      stroke: new Stroke({color: "lightslategray", width: 2})
    });     
  } else  if(agrupaCaminos ==='Via Tolosana Arles'){
    return new Style({
      stroke: new Stroke({color: "gray", width: 2})
    }); 
  } else  if(agrupaCaminos ==='Voie des Piemonts'){
    return new Style({
      stroke: new Stroke({color: "maroon", width: 2})
    }); 
  } else  if(agrupaCaminos ==='Voie Turonensis - Paris'){
    return new Style({
      stroke: new Stroke({color: "navy", width: 2})
    });     
  } else  if(agrupaCaminos ==='Caminos del Sureste'){
    return new Style({
      stroke: new Stroke({color: "brown", width: 2})
    }); 
  } else {
    return new Style({
      stroke: stroke_white,
    });
  }
};


const CaminosLayer = new VectorLayer({
  title: "Caminos de Santiago",
  visible: true,
  source: new VectorSource({
    format: new GeoJSON(),
    url:"./data/caminos_santiago.geojson",
  }),
  style:function(feature){
    return CaminoAgrupaStyle(feature);
  },
});

// Popup

// Variables asociadas a los objetos HTML
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");

// Evento para ocultar popup
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

// Objeto overlay de OL
const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});


//Map

const map = new Map({
  target: 'map',
  layers: [osmLayer,ortoPNOALayer, MTN50Layer, CaminosLayer],
  view: new View({
    center: center_4326,
    zoom:5.5,
    extent:spainExtent,
  }),
  controls: defaultControls({
    // Gestión de los controles por defecto
    zoom: true,
    attribution: true,
    rotate: true,
  }).extend(extendControls),
  overlays: [overlay],
});

sync(map)

// 06.4 Evento apertura del popup

map.on("singleclick", function (evt) {
  // Función consulta de datos de la capa vectorial
  let info = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    let camino = feature.get("nombre");
    let longitud=feature.get("longitud");
    let grupo = feature.get("agrupacion");
    let urlInfo= feature.get("url_info");
    let data = [camino,grupo,longitud,urlInfo]; // Almacenamos los datos en un array
    return data;
  });

  if (info) {
    container.style.display = "block";
    const coordinate = evt.coordinate;
    // Añadimos el contenido al HTML
    content.innerHTML = `<a href=${info[3]} target="_blank" rel="noopener noreferrer">${info[0]}</a>
                          <p>${info[2]} km.</p>
                          <p>${info[1]}</p>`;
    // Presenta la ventana en las coordenadas
    overlay.setPosition(coordinate);
  } else {
    container.style.display = "none";
  }
});

map.on("pointermove", function (evt) {
  map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel)
    ? "pointer"
    : "";
});
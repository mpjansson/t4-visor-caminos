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

const center_4326=fromLonLat([-3.6667,40.5])
const spainExtent = [-4242152.2315, 2253314.7512, 3506727.948, 6152214.69];
const corunia_extent=[-1051943, 5103303, -819030, 5467062];

// 03.1 OverviewMap control

const overviewMapControl = new OverviewMap({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
});

// 03.2 Zoom extent contol

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

//capa OMS
const omsLayer=new TileLayer({
  source: new OSM(),
});

//capas WMS
const ortoPNOALayer = new TileLayer({
  title: "PNOA",
  source: new TileWMS({
    url: "https://www.ign.es/wms-inspire/pnoa-ma?",
    params: { LAYERS: "OI.OrthoimageCoverage", TILED: true },
    attributions:
      '© <a href="https://www.ign.es/web/ign/portal">Instituto Geográfico Nacional</a>',
  }),
  type: "base",
});



//Map

const map = new Map({
  target: 'map',
  layers: [omsLayer,ortoPNOALayer],
  view: new View({
    center: center_4326,
    zoom:6,
    extent:spainExtent,
  }),
  controls: defaultControls({
    // Gestión de los controles por defecto
    zoom: true,
    attribution: true,
    rotate: true,
  }).extend(extendControls),
});

sync(map)

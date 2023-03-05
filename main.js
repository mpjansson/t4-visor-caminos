import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import {fromLonLat} from 'ol/proj';
import sync from "ol-hashed";

const center_4326=fromLonLat([-3.66667,40.5])
const spainExtent = [-4242152.2315, 2253314.7512, 3506727.948, 6152214.69];

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: center_4326,
    zoom:6,
  })
});

sync(map)

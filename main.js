import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
const spainExtent = [-4242152.2315, 2253314.7512, 3506727.948, 6152214.69];

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [-500000, 4800000],
    zoom:6,
  })
});

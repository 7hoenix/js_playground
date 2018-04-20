import { Observable } from "rxjs";
import L from "leaflet";

const QUAKE_URL = `http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp`;

function setup() {
  const cssElement = document.createElement("link");
  cssElement.setAttribute("rel", "stylesheet");
  cssElement.setAttribute(
    "href",
    "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
  );
  document.getElementsByTagName("head")[0].appendChild(cssElement);
}

function loadJSONP(url) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  const head = document.getElementsByTagName("head")[0];
  head.appendChild(script);
}

setup();

const mapContainer = document.createElement("div");
mapContainer.style.height = "800px";
mapContainer.style.width = "1000px";
mapContainer.id = "map";
document.body.appendChild(mapContainer);

const map = L.map("map").setView([33.858631, -118.279602], 7);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);

const quakes$ = Observable.create(observer => {
  window.eqfeed_callback = response => {
    response.features.forEach(feature => observer.next(feature));
  };

  loadJSONP(QUAKE_URL);
});

quakes$.subscribe(quake => {
  const coords = quake.geometry.coordinates;
  const size = quake.properties.mag * 10000;

  L.circle([coords[1], coords[0]], size).addTo(map);
});

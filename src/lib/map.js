import L from 'leaflet';
import { formatDate } from './utils';

let map;
let markers = [];

// Skilgreinir það sem fer inn í popup 
function onEachFeature(feature, layer){
    layer.bindPopup('<h1>'+feature.properties.place+'</h1>' + 
		            '<p>' + formatDate(feature.properties.time) + '</p>' +
					'<a href="' + feature.properties.detail + '" target="_blank">Skoða nánar</a>');
}

// Býr til popup á korti út frá geojson með content
export function createPopup(geojson, content) {
  const marker = L.geoJSON(geojson, {onEachFeature: onEachFeature});
  marker.addTo(map);
  markers.push(marker);
}

// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
export function init(el) {

	el.setAttribute('id', 'mapid');
	map = L.map('mapid').setView([0, 0], 2);

  // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
}

// Virkni þegar ýtt er á takka í lista yfir jarðskjálfta
export function buttonMapClick(markerNr){
	//map.setView(markers[markerNr].getLatLng(), 20);
	map.flyTo(markers[markerNr].getBounds().getCenter(), 10)
	markers[markerNr].openPopup();
}
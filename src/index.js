import { el, element, formatDate } from './lib/utils';
import { fetchEarthquakes } from './lib/earthquakes';
import { init, createPopup, buttonMapClick } from './lib/map';


document.addEventListener('DOMContentLoaded', async () => {
  // Nær í gögn
  fetchEarthquakes()
	.then((data) => {
		let features = data.features;
		// Lætur vita ef gögn finnast ekki, hendir annars út "Hlaða gögnum texta"
		updateLoadingText(features);
		// Býr til kortið og bendla á það
		createMap(features);
		// Býr til listann yfir jarðskjálfta
		addEarthquakeList(features);
	});
});


function updateLoadingText(features){
	const loadingText = document.querySelector('.loading');
	if(!features){
		loadingText.textContent = 'Ekki tókst að hlaða niður gögnum';
	return;
	}
	loadingText.remove()
}

function createMap(features){
	const mapContainer = document.querySelector('.map');
	init(mapContainer);
	for(let i = 0; i < features.length; i++){
		createPopup(features[i], null);
	}
} 

function addEarthquakeList(features){
	const earthquakeList = document.querySelector('.earthquakes');
	for(let i = 0; i < features.length; i++){
		const listElement = 
			el('li',
				el('div', 
					el('h2', features[i].properties.place),
					el('dl', 
						el('dt', 'Tími'),
						el('dd', formatDate(features[i].properties.time)),
						el('dt', 'Styrkur'),
						el('dd', features[i].properties.mag + ' á richter'),
						el('dt', 'Nánar'),
						el('dd', features[i].properties.detail)
					),
					element('div', { 'class': 'buttons' }, null,
						element('button', null, { click: () => {buttonClicked(i);}}, 'Sjá á korti'),
						element('a', { 'href': features[i].properties.detail }, null,'Skoða nánar')
					)
				)
			)
		earthquakeList.appendChild(listElement);
	}
}

function buttonClicked(markerNr){
	buttonMapClick(markerNr);
}

/*
<li>
            <div>
              <h2>M 4.6 - 105 km NNW of Villa General Roca, Argentina</h2>
              <dl>
                <dt>Tími</dt>
                <dd>02.11.2020 05:10:46</dd>
                <dt>Styrkur</dt>
                <dd>4.6 á richter</dd>
              </dl>
              <div class="buttons">
                <button>Sjá á korti</button>
                <a href="https://earthquake.usgs.gov/earthquakes/eventpage/us7000c95h" target="_blank">Skoða nánar</a>
              </div>
            </div>
          </li>
*/
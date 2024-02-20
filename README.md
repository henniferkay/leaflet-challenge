# leaflet-challenge

## Background
The aim of this project was to visualize seismology data from the United States Geological Survey (USGS) on a map.

## Methods
The USGS updates data on earthquakes around the world every 5 minutes and provides them in JSON format on their [website](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). The "All Earthquakes from the Past 7 Days" dataset was selected from this webpage.

The JavaScript program (`logic.js` within `static/js`) shows how the data were imported and visualized. We pulled the data by making an API call to USGS's GeoJSON via JavaScript's D3 library. We then created a map plotting all the earthquake data points using Leaflet. 

There were specific objectives for this map assignment:

* The data markers reflect the earthquake's magnitude by their size (higher magnitudes appear larger) and depth (where the earthquake begins to rupture) by their color

* A popup for each marker detailing that selected data point's location, magnitude and depth

* A legend explaining the depths (measured in kilometers) each color represents

A webpage of the end result was designed and laid out in HTML (open `index.html`). A CSS file (`style.css` within `static/css`) was also written to cater the map and legend to our desired view.
// visualize USGS earthquake data from the last 7 days on a map

// first set up a function to determine marker color by earthquake depth
function markerColor(depth){
    if (depth < 10) return '#00ff00';
    else if (depth < 30) return '#ccff33';
    else if (depth < 50) return '#ffff00';
    else if (depth < 70) return '#ffcc00';
    else if (depth < 90) return '#ff6600';
    else return '#ff0000';
}

// add earthquake data points to the map
function createMarkers(response) {

    // initialize an array to hold the earthquake data markers
    let earthquakeMarkers = [];
    
    // pull the "features" property from the API call response
    let points = response.features; 

    // loop through the data points
    for (let i = 0; i < points.length; i++) {

        // set geographic coordinates of each earthquake incident
        let point = points[i].geometry.coordinates;

        // set marker radius to the earthquake's magnitude
        let rad = points[i].properties.mag;

        // set marker color to the earthquake's depth
        let fill = markerColor(point[2]);

        // arrange all the marker features
        let markers = {
            radius: rad * 10000,
            fillColor: fill,
            fillOpacity: 0.72,
            color: "black",
            storke: true,
            weight: 1.0
        };

        // map the earthquake data points and add a popup tooltip with the location, magnitude, and depth
        let earthquakeMarker = L.circle([point[1], point[0]], markers)
            .bindPopup("<h3>Location: " + points[i].properties.place + "<h3><h3>Magnitude: " + points[i].properties.mag + "<h3><h3>Depth: " + point[2] + "</h3>");
        
        // add the data to the earthquake markers array
        earthquakeMarkers.push(earthquakeMarker);
    }
    // create a layer group with the eartquake markers array and pass it to the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
}

// create a legend control
let legend = L.control({position: 'bottomright'})

// define legend content
legend.onAdd = function() {

    let div = L.DomUtil.create('div', 'info legend');
    
    // add title to the legend
    div.innerHTML = '<h4>Earthquake Depths (km)</h4>';

    // define an array of earthquake depths
    let depths = [-10, 10, 30, 50, 70, 90];

    // loop through depth intervals and generate a label with a colored square for each interval
    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
        '<i style="background:' + markerColor(depths[i] + 1) + '"></i> ' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
};

// put everything set up above together into a map
function createMap(earthquakeLayer) {

    // create the map object
    let map = L.map("map-id", {
        center: [37.09, -95.71],
        zoom: 4.5
    });

    // create the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // add the legend to the map
    legend.addTo(map);

    // add the earthquake layer to the map
    earthquakeLayer.addTo(map);
}

// perform an API call to the USGS GeoJSON feed to fetch the earthquake data and perform the plotting function set above
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
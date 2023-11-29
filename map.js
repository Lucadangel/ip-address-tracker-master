
// API KEY at_mAaKhetBvOEkxSEfOU69OyXCgZyO4
// https://geo.ipify.org/api/v2/country,city?apiKey=at_mAaKhetBvOEkxSEfOU69OyXCgZyO4&ipAddress=8.8.8.8



var initialLat = 51.505;
var initialLng = -0.09;


var map = L.map('map').setView([initialLat, initialLng], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([initialLat, initialLng]).addTo(map);


function updateMapAndMarker(newLat, newLng) {
    map.setView([newLat, newLng]); 
    marker.setLatLng([newLat, newLng]); 
}


var newLat = 52.0;  
var newLng = -0.1;  
updateMapAndMarker(newLat, newLng);

function displayData(data) {
    document.getElementById('IP-address').textContent = data.ip;
    document.getElementById('location').textContent = `${data.location.city}, ${data.location.region}`;
    document.getElementById('utc').textContent = `UTC ${data.location.timezone}`;
    document.getElementById('isp').textContent = data.isp;
    newLat = data.location.lat;
    newLng = data.location.lng;
    

    updateMapAndMarker(newLat, newLng);
}
//fetch
async function fetchData(ipAddress) {
    try {
        const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_mAaKhetBvOEkxSEfOU69OyXCgZyO4&ipAddress=${ipAddress}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
  
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const ipAddress = document.getElementById('search').value.trim();
    if (ipAddress) {
        fetchData(ipAddress);
    }
});

// Modify elements style inside container
var elements = document.querySelectorAll('#IP-address, #location, #utc, #isp');
elements.forEach(function(element) {
    element.style.color = 'black';
    element.style.fontSize = '25px';
    element.style.fontWeight = 'bold';
});


var icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"14\"><path fill=\"none\" stroke=\"#FFF\" stroke-width=\"3\" d=\"M2 1l6 6-6 6\"/></svg>";


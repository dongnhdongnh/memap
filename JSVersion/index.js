let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(2.8, -187.3),
    mapTypeId: "terrain",
    zoomControl: true,
    scaleControl: true,
    gestureHandling: "greedy"
  });
  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp


  script.src =
    "./map.geojson";
  //script.textContent="eqfeed_callback("+script.textContent+")";
  console.log(script.textContent);
  document.getElementsByTagName("head")[0].appendChild(script);
  moveToCurrentLocation();
}

function moveToCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // infoWindow.setPosition(pos);
        // infoWindow.setContent("Location found.");
        // infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        //  handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
  }

}


// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {

  const image = {
    url: "./img/food.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(200, 200),
    scaledSize: new google.maps.Size(50, 50),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(20, 50)
  };

  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    const name= results.features[i].properties.name;
    new google.maps.Marker({
      position: latLng,
      icon: image,
      label: {
        text:  name,
        //  color: "#4682B4",
        fontSize: "20px",
        fontWeight: "bold",
        className: "my-label-class"
      },
      title: "Hello World!",

      map: map,
    });
  }
};
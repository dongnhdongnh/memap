let map,center;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(20.994137455214727, 105.80647230148315),
    mapTypeId: "terrain",
    zoomControl: true,
    scaleControl: true,
    gestureHandling: "greedy"
  });
  center=new google.maps.LatLng(20.994137455214727,  105.80647230148315);
  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp

  script.charset="UTF-8";
  script.src =
    "./map.geojson";
  //script.textContent="eqfeed_callback("+script.textContent+")";
  console.log(script.textContent);
  document.getElementsByTagName("head")[0].appendChild(script);
  moveToCenter();
// moveToCurrentLocation();
}
function moveToCenter()
{
  map.setCenter(center);
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
        console.log(pos);
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

  const imageFood = {
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
  const imageHome = {
    url: "./img/home.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(200, 200),
    scaledSize: new google.maps.Size(50, 50),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(20, 50)
  };
  const imagePark = {
    url: "./img/park.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(200, 200),
    scaledSize: new google.maps.Size(50, 50),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(20, 50)
  };
  const infowindow = new google.maps.InfoWindow(
    {pixelOffset: new google.maps.Size(-50,0)}
  );
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    const name= results.features[i].properties.name;
    const desc= results.features[i].properties.desc;
    const type=results.features[i].properties["marker-symbol"];
    var img=imageHome;
    if(type=="fast-food") img=imageFood;
    if(type=="garden") img=imagePark;
    console.log(name);
    const marker=   new google.maps.Marker({
      position: latLng,
      icon: img,
      name:name,
      label: {
        text:  name,
        //  color: "#4682B4",
       // fontSize: "20px",
       // fontWeight: "bold",
        className: "my-label-class"
      },
      title: "Hello World!",

      map: map,
    });
    
    marker.addListener("click", () => {
      //infowindow.
      infowindow.setContent(infor(name,desc,coords));
      infowindow.open(map, marker);
    });
  }
};


function infor(name,desc,coords){
  return "<div><b>INFO</b><br><b>Name: "+name+"</b><br>Desc: "+desc+"...bla,bla,bla<br>Location: "+coords[0]+" & "+coords[1]+"</div>";
}
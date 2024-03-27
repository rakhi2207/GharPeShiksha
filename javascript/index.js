async function success(pos) {
    const requestOptions = {
        method: 'GET',
    };
    const crd = pos.coords;
    const api = `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&apiKey=3f401cb4b4a34c43b7737678e5e8db37`;
    fetch(api, requestOptions).then((response) => response.json())
    .then(data => {
        const inputField = document.getElementsByClassName('search-text')[0];
        inputField.value = data.features[0].properties.address_line2;
    })
    .catch(err=> {
        console.log(err);
    });
}
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
function getCurrentAddress(){
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      
      navigator.geolocation.getCurrentPosition(success, error, options);
}

function searchTutor(){
    const address = document.getElementById("currAddress").value;
    if(address){
        window.location.href = `http://127.0.0.1:5500/tutor.html?address=${address}`
    }else{
        window.location.href = `http://127.0.0.1:5500/tutor.html`;
    }
}
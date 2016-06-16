(function(){
    angular.module('angularSpa')

.controller('RutaCtrl', function($scope, entradasService){

	//obtener entradas
	
	$scope.entradas =[];
    
        function getEntradas(){
            entradasService.getEntradas()
            .success(function(data){
                $scope.entradas = data;
            })
            .error(function(error){
                $scope.status = 'Error al consultar por entradas';
            });
        }
        getEntradas();
        

	//API Google
    function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: {lat: -33.450178, lng: -70.686327} 
        });
        directionsDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }initMap();

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var start = document.getElementById('start').value
       

        var fin = document.getElementById('end').value
        var latlngStr = fin.split(',', 2);
        var latlng2 = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

        directionsService.route({

          origin: start,
          destination: latlng2,
          travelMode: google.maps.TravelMode.WALKING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      //FIN API Google

	});
})();
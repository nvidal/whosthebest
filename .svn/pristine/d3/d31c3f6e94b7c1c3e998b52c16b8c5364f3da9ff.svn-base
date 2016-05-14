app.controller('RankCtrl', ['$scope', '$resource', 
	function($scope, $resource){
		var Players = $resource('/api/players');
		Players.query(function(players){
			
			$scope.players = [];
			var maxSubida = 0;
			var maxBajada = 0;
			//Agrego rank a cada jugador
			for(i = 0; i< players.length; i++){
				players[i].rank = i+1;
				players[i].nombreCompleto = players[i].name+" "+players[i].lastname;
				if (players[i].rankAnterior != 0){
					if (players[i].rank - players[i].rankAnterior > maxBajada){
						maxBajada = players[i].rank - players[i].rankAnterior;
						$scope.masBaja = players[i];
					}
					if (players[i].rank - players[i].rankAnterior < maxSubida){
						maxSubida = players[i].rank - players[i].rankAnterior;
						$scope.masSube = players[i];
					}
				}
			}
			$scope.players = players;
			$scope.first = players[0];
		});

		$scope.grafica = function(player){
			var Players = $resource('/api/players/historial/:id');
			Players.get({ id : player._id }, function(hist){
				hist.labels.push("Actual");
				hist.data.push(player.rank*-1);
				
				$scope.labels = hist.labels;
				$scope.data = [];
				$scope.data[0] = hist.data;
			});
		};
		$scope.opt = {
            scale: {
                reverse: true,
                ticks: {
                    beginAtZero: true
                }
            }
    	};

		$scope.opciones = {
			scaleStepWidth: -1,
		    scales: {
		        yAxes: [
		            {
		                reverse: true, // will reverse the scale
		            }
		        ]
		    }
		};
}]);

app.controller('RankClubsCtrl', ['$scope', '$resource', 
	function($scope, $resource){
		
		var Clubs = $resource('/api/players/clubs');
		Clubs.query(function(clubs){
			$scope.clubs = clubs;
		});


		$scope.sort = function(keyname){
		        	$scope.sortKey = keyname;   //set the sortKey to the param passed
		        	$scope.reverse = !$scope.reverse; //if true make it false and vice versa
		}	
}]);


app.controller('PlayersCtrl', ['$scope', '$resource', '$location', 
	function($scope, $resource, $location){

		$scope.newPlayer = function(){
			var Players = $resource('/api/players');
				Players.save($scope.player, function(){
					alert('New player created!');
					$location.path('/ranking');
				});
		};

		$scope.submitForm = function(isValid){

			if (isValid){
				var Players = $resource('/api/players');
				Players.save($scope.player, function(){
					alert('New player created!');
					$location.path('/ranking');
				});
			}
			else{
				$scope.showErrors = true;
			}
		};
	

		var Players = $resource('/api/players/random');
		
		Players.query(function(players){
			$scope.player1 = players[0];
			$scope.player2 = players[1];
		});

		
		$scope.vot1 = function(){
			var Players = $resource('/api/players/vote');
			Players.save({
				player1 : $scope.player1,
				player2 : $scope.player2
			}, function(){
				$location.path('/vote');
			});
		};

		$scope.vot2 = function(){
			var Players = $resource('/api/players/vote');
			Players.save({
				player1 : $scope.player2,
				player2 : $scope.player1
			}, function(){
				$location.path('/vote');
			});
		};
	}]);


//MEJOR 11
app.controller('MejorEquipoCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){

		var Clubs = $resource('/api/clubs/');
		Clubs.query({},function(clubs){
			$scope.clubs = [{name : "GENERAL"}];
			$scope.clubs = $scope.clubs.concat(clubs);

			$scope.formaciones = ["442","433","343","541","352", "451"];
			
		});

		$scope.generar = function(){

			if ($scope.club == "GENERAL")
				var Player = $resource('/api/players/mejores/:position/:cant');
			else
				var Player = $resource('/api/players/mejores/:position/:cant/:club');
			Player.query({ position: "Arquero", cant: 1, club: $scope.club }, function(players){
				$scope.arq = players;
				$scope.arq[0].css = 'goalkeeper';
			});
			var cant_def = $scope.formacion.charAt(0);
			Player.query({ position: "Defensa", cant: cant_def, club: $scope.club }, function(players){
				$scope.def = players;
				for (var i=0; i< cant_def;i++){
					$scope.def[i].css = 'def-'+cant_def+'-'+(i+1);
				}
			});
			var cant_med = $scope.formacion.charAt(1);
			Player.query({ position: "Mediocampista", cant: cant_med, club: $scope.club }, function(players){
				$scope.med = players;
				for (var i=0; i< cant_med;i++){
					$scope.med[i].css = 'med-'+cant_med+'-'+(i+1);
				}
			});
			var cant_del = $scope.formacion.charAt(2);
			Player.query({ position: "Delantero", cant: cant_del, club: $scope.club }, function(players){
				$scope.del = players;
				for (var i=0; i< cant_del;i++){
					$scope.del[i].css = 'del-'+cant_del+'-'+(i+1);
				}
			});
		};


		$scope.formaciones = ["442"];
		$scope.clubs = ["GENERAL"];
		$scope.formacion = "442";
		$scope.club = "GENERAL";
		$scope.generar();


	}]);


app.controller('HeaderController', ['$scope','$location',
 	function($scope, $location) {
		$scope.isActive = function (viewLocation) { 
        		return $location.path().indexOf(viewLocation) == 0; 
		};
	}]);

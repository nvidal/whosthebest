app.controller('RankCtrl', ['$scope', '$resource', 
	function($scope, $resource){
		var Players = $resource('/api/players');
		Players.query(function(players){
			
			$scope.players = [];
			//Agrego rank a cada jugador
			for(i = 0; i< players.length; i++){
				players[i].rank = i+1;
				players[i].nombreCompleto = players[i].name+" "+players[i].lastname;
			}
			$scope.players = players;
		});

		$scope.grafica = function(player){
			var Players = $resource('/api/players/historial/:id');
			Players.get({ id : player._id }, function(hist){
				$scope.labels = hist.labels;
				$scope.data = [];
				$scope.data[0] = hist.data;
			});
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
		
		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		//$scope.series = ['Series A', 'Series B'];
		$scope.data = [[
		65, 59, 80, 81, 56, 55, 40
		]];
		$scope.onClick = function (points, evt) {
		console.log(points, evt);
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

app.controller('HeaderController', ['$scope','$location',
 	function($scope, $location) {
		$scope.isActive = function (viewLocation) { 
        		return $location.path().indexOf(viewLocation) == 0; 
		};
	}]);

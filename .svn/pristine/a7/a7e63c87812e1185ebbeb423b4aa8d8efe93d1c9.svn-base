app.controller('RankCtrl', ['$scope', '$resource', 
	function($scope, $resource){
		var Players = $resource('/api/players/top');
		Players.query(function(players){
			$scope.players = players;
		});
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

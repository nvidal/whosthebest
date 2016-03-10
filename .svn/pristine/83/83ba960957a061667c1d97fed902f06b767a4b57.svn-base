app.controller('PlayerCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location){
		
		var Player = $resource('/api/admin/players');
		Player.query(function(players){
			$scope.players = players;
		});

		$scope.createPlayer = function(isValid){

			if (isValid){
				var Players = $resource('/api/admin/players');
				Players.save($scope.player, function(){
					alert('New player created!');
					$location.path('/');
				});
			}
			else{
				$scope.showErrors = true;
			}
		};

		$scope.deletePlayer = function(player){
			var idx = $scope.players.indexOf(player);
			var res = confirm("Delete "+player.name+" "+player.lastname+", ok?");
			if (res == true) {
				var Players = $resource('/api/admin/players/:id');
				Players.delete({ id : player._id }, function(player){
					$location.path('/');
				});

			    alert("Player deleted");
			    $scope.players.splice(idx, 1);
			} else {
			    //alert("Cancelled!");
			}
		};

		$scope.resetAll = function (){
			var res1 = confirm("Reset all players to default values ?");

			if (res1 == true) {
				var Players = $resource('/api/admin/players/reset');
				Players.save({}, function(players){
					alert('Success!!');

					var Player = $resource('/api/admin/players');
					Player.query(function(players){
						$scope.players = players;
					});

					$location.path('/');
				});
				
			}
		}

		

	}]);

app.controller('PlayerEditCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){

		var PlayerId = $resource('/api/admin/players/:id');
		PlayerId.get({ id: $routeParams.id }, function(player){
			$scope.playerEdition = player;
		});

		$scope.editPlayer = function(){
			var Players = $resource('/api/admin/players/:id', { id : '@_id' }, 
				{ update : {method : 'PUT'} });
			Players.update( $scope.playerEdition, function(){
				alert('Player edited');
				$location.path('/');
			});
		};
	}]);
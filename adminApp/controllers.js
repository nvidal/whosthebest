// CONTROLLER DE ADMINISTRACION DE JUGADORES (LIST Y CREATE)
app.controller('PlayerCtrl', ['$scope', '$resource', '$location', 'filterFilter',
	function($scope, $resource, $location, filterFilter){

		//INIT
		//$scope.currentPage = 0;
		//$scope.itemsPerPage = 10;
		//$scope.pageSize = 10;
		$scope.players = [];
		var Player = $resource('/api/admin/players');
		Player.query(function(players){
			$scope.players = players;
			//$scope.groupToPages();
			//$scope.filterList = players;//filterFilter($scope.players, { lastname : "" });
			//$scope.currentPage = 1;
		});

		$scope.sort = function(keyname){
        	$scope.sortKey = keyname;   //set the sortKey to the param passed
        	$scope.reverse = !$scope.reverse; //if true make it false and vice versa
    	}	

		
		/*$scope.$watch('searchPlayer.lastname', function(term){
			var obj = { lastname : term }
			$scope.filterList = filterFilter($scope.players, obj);
			$scope.currentPage = 1;
		});*/


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
			    alert("Cancelled!");
			}
		};

		$scope.resetAll = function (){
			var res1 = confirm("Reset all players to default values ?");

			if (res1 == true) {
				var Players = $resource('/api/admin/players/reset');
				Players.save({}, function(players){
					alert('Success!!');

					$scope.currentPage = 0;
					var Player = $resource('/api/admin/players');
					Player.query({}, function(players){
						$scope.players = players;
						$scope.groupToPages();
					});

					$location.path('/');
				});
				
			}
		};

		/*$scope.groupToPages = function () {
        	$scope.pagedItems = [];
	        for (var i = 0; i < $scope.players.length; i++) {
	            if (i % $scope.itemsPerPage === 0) {
	                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.players[i] ];
	            } else {
	                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.players[i]);
	            }
	        }
	    };
		
		$scope.nextPage = function(){
			if ($scope.currentPage < $scope.pagedItems.length -1){
				$scope.currentPage ++;
			};
		}

		$scope.prevPage = function(){
			if ($scope.currentPage > 0 ){
				$scope.currentPage --;
			};
		}*/

	}]);
	/*.filter('start', function(){
		return function (input, start){
			if (!input || !input.length)
				return;

			start = +start;
			return input.slice(start);
		};
	});*/


// CONTROLLER DE EDITAR JUGADOR
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

// CONTROLLER DE PAGINA DE INICIO ADM
app.controller('StatsAdminCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){

		var Stats = $resource('/api/admin/stats');
		Stats.get(function(stats){
			$scope.stats = stats;
		});

		$scope.orderByField = 'avgPoints';
  		$scope.reverseSort = true;

		var Stats = $resource('/api/admin/stats/clubs');
		Stats.query(function(clubs){
			$scope.clubStats = clubs;
		});
	}]);



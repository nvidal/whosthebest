

// CONTROLLER DE ADMINISTRACION DE JUGADORES (LIST Y CREATE)
app.controller('PlayerCtrl', ['$scope', '$resource', '$location', 'filterFilter',
	function($scope, $resource, $location, filterFilter){

		$scope.players = [];
		var Player = $resource('/api/admin/players');
		Player.query(function(players){
			$scope.players = players;
		});

		$scope.sort = function(keyname){
        	$scope.sortKey = keyname;   //set the sortKey to the param passed
        	$scope.reverse = !$scope.reverse; //if true make it false and vice versa
    	}	

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
			var res = confirm("Eliminar a "+player.name+" "+player.lastname+"?");
			if (res == true) {
				var Players = $resource('/api/admin/players/:id');
				Players.delete({ id : player._id }, function(player){
					$location.path('/');
				});

			    alert("Jugador eliminado");
			    $scope.players.splice(idx, 1);
			} else {
			    alert("Cancelado");
			}
		};

		$scope.resetAll = function (){
			var res1 = confirm("Reset all players to default values ?");

			if (res1 == true) {
				var Players = $resource('/api/admin/players/reset');
				Players.save({}, function(players){
					alert('Reseteo exitoso');

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

	}]);


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
				alert('Jugador editado');
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

// CONTROLLER DE HISTORIAL
app.controller('HistorialCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){

		var Hist = $resource('/api/admin/historial/list');
		Hist.query({}, function(hist){
			$scope.historial = [];
			for(i=0; i<hist.length; i++){
				$scope.historial[i] = {
					fecha : hist[i]._id,
					players : hist[i].players
				};
			};

		});

		$scope.orderByField = 'fecha';
  		$scope.reverseSort = true;

  		$scope.sort = function(keyname){
        	$scope.sortKey = keyname;   //set the sortKey to the param passed
        	$scope.reverse = !$scope.reverse; //if true make it false and vice versa
    	}

  		$scope.grabar = function (){
			var res = confirm("Se va a grabar la semana actual, ok ?");

			if (res == true) {
				var Hist = $resource('/api/admin/historial/grabar');
				Hist.save({}, function(result){
					alert('Grabada con exito!');

					var List = $resource('/api/admin/historial/list');
					List.query({}, function(hist){
						$scope.historial = [];
						for(i=0; i<hist.length; i++){
							$scope.historial[i] = {
								fecha : hist[i]._id,
								players : hist[i].players
							};
						};
					});
				});	
			}
		};

	}]);


// CONTROLLER DE USUARIO ADM
/*app.controller('PasswordCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){

		var User = $resource('/api/admin/players/user');
		User.get(function(user){
			$scope.user = user;
		});

		$scope.pass = {};
  		$scope.pass.nueva = "";
  		$scope.pass.actual = "";

  		$scope.cambiarPass = function(isValid){

			if (isValid){
				if ($scope.pass.actual)
				
				var Players = $resource('/api/admin/players/:id', { id : '@_id' }, 
				{ update : {method : 'PUT'} });
				Players.update( $scope.playerEdition, function(){
				alert('Jugador editado');
				$location.path('/');
			});
			}
			else{
				$scope.showErrors = true;
			}
		};

		var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

	}]);*/





// CONTROLLER DE ADMINISTRACION DE JUGADORES (LIST Y CREATE)
app.controller('PlayerCtrl', ['$scope', '$resource', '$location', 'filterFilter',
	function($scope, $resource, $location, filterFilter){

		$scope.checkImg = function(){	
			var img = []
			for(var i =0; i< 10; i++){
				img[i] = new Image();
				img[i].onload = function() { $scope.players[i].imgOk = true; };
				img[i].onerror = function() { $scope.players[i].imgOk = false; };
				img[i].src = $scope.players[i].image;
			}
		};

		$scope.players = [];
		var Player = $resource('/api/admin/players');
		Player.query(function(players){
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
		});

		$scope.clubs = [];
		var Clubs = $resource('/api/clubs/');
		Clubs.query(function(clubs){
			$scope.clubs = clubs;
		});

		$scope.positions = [];
		var Pos = $resource('/api/positions/');
		Pos.query(function(pos){
			$scope.positions = pos;
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
					$location.path('/list');
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
					$location.path('/list');
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

		$scope.clubs = [];
		var Clubs = $resource('/api/clubs/');
		Clubs.query(function(clubs){
			$scope.clubs = clubs;
		});

		$scope.positions = [];
		var Pos = $resource('/api/positions/');
		Pos.query(function(pos){
			$scope.positions = pos;
		});
		
		$scope.editPlayer = function(){
			var Players = $resource('/api/admin/players/:id', { id : '@_id' }, 
				{ update : {method : 'PUT'} });
			Players.update( $scope.playerEdition, function(){
				alert('Jugador editado');
				$location.path('/list');
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

		$scope.formacion = "442";
		$scope.club = "GENERAL";
		$scope.generar();

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



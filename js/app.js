var app = angular.module('myApp', []);

app.factory('audio', ['$document', function($document){
	var audio = $document[0].createElement('audio');
	return audio;
}]);

app.factory('player', ['audio', '$rootScope' function(audio, $routeScope){
	var player = {
		playing: false;
		current : null,
		ready: false,

		currentTime: function(){
			return audio.currentTime;
		},

		currentDuration: function(){
			return parseInt(audio.duration);
		},

		play: function(program){
			//if playing, stop current playback
			if(player.playing) player.stop();
			var url = program.audio[0].format.mp4.$text; //npr api
			player.current = program;
			audio.src = url;
			audio.play();
			player.playing = true;
		},

		stop: function(){
			if(player.playing){
				audio.pause();

				player.ready = player.playing = false;
				player.current = null;
			}
		}
	};
	audio.addEventListener('ended', function(){
		$rootScope.$apply(payer.stop());
	});
	return player;
}])

var apiKey = 'MDE1MDI3OTI4MDE0MDM0OTkxNjgyNTE0MQ001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerCtrl', ['$scope', '$http', 'audio', 'player',
 function($scope, $http, audio, player){
	$scope.audio = audio;
	
	$http({
		method: 'JSONP',
		url: nprUrl + '&apiKey='+apiKey+'&callback=JSON_CALLBACK'
	}).success(function(data, status){
		// returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
    $scope.programs = data.list.story;
	}).error(function(data, status){

	});

	$scope.player = player;

}]);

app.controller('RelatedCtrl', ['$scope', function($scope){

}]);


//Just trying out a clock via angular.
app.controller('MyCtrl', function($scope) {
  $scope.person = { name: "Kyle" };
  var updateClock = function() {
    $scope.clock = new Date();
  };
  var timer = setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
});
var app = angular.module('myApp', []);

var apiKey = 'MDE1MDI3OTI4MDE0MDM0OTkxNjgyNTE0MQ001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerCtrl', ['$scope', '$http', function($scope, $http){
	var audio = document.createElement('audio');
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

	$scope.playing = false;


	//format.mp4.$text is route to mp4 file from api
	$scope.play = function(program){
		if($scope.playing) $scope.audio.pause();
		var url = program.audio[0].format.mp4.$text;
		audio.src = url;
		audio.play();
		$scope.playing = true;
	}

	$scope.stop = function(){
		$scope.audio.pause();
		$scope.playing = false;
	}

	$scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  });
}]);

app.controller('RelatedCtrl', ['$scope', function($scope){

}]);

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
var fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var Twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');
var random = require('./random.txt');
var nodeArgs = process.argv;


if (nodeArgs[2] == "my-tweets"){

	var client = new Twitter({
 			 consumer_key: keys.twitterKeys.consumer_key,
 			 consumer_secret: keys.twitterKeys.consumer_secret,
 			 access_token_key: keys.twitterKeys.access_token_key,
 			access_token_secret: keys.twitterKeys.access_token_secret
				});

			var params = {screen_name: 'kblumbra'};

			client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {

  				for (i=0; i<20; i++){
  					console.log("------------------------------------------------------------------------")
    				console.log(tweets[i].created_at);
    				console.log(tweets[i].text);
    				console.log("------------------------------------------------------------------------")
    				fs.appendFile("log.txt", (process.argv[2] + tweets));
  				}
  			}


});

}else if (nodeArgs[2] == "spotify-this-song"){

	if (nodeArgs[3] == undefined){
		nodeArgs[3] = "The Sign Ace of Base"

	}

	 spotify.search({ type: 'track', query: nodeArgs[3] }, function(err, data) {
  if ( err ) {
       console.log('Error occurred: ' + err);
       return;
    }else {
    	console.log("Artists Name: " + JSON.stringify(data.tracks.items[2].name, null, 4));
    	console.log("Track Name: " + JSON.stringify(data.tracks.items[2].artists[0].name, null, 4));
    	console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 4));
    	console.log("Preview URL: " + JSON.stringify(data.tracks.items[2].preview_url, null, 4));

    }
});




}else if (nodeArgs[2] == "movie-this"){

}else if (nodeArgs[2] == "do-what-it-says"){

}else {
	console.log("Do valid option.");
}




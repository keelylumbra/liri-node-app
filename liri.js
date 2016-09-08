var fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var Twitter = require('twitter');
var SpotifyWebApi = require("spotify-web-api-node");
var spotifyApi = new SpotifyWebApi();
var keys = require('./keys.js');
var random = require('./random.txt');
var nodeArgs = process.argv;
var request = require('request');

var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";
var song = "";



function spotify(){

  if (nodeArgs[3] == undefined){
    song = "The Sign Ace of Base";

  }

  else{

    song = nodeArgs.slice(3).join(" ");

spotifyApi.searchTracks('track:' + song)
  .then(function(data) {





                console.log("===============================================================================");
           
                        console.log("Artists Name: " + JSON.stringify(data.body.tracks.items[0].artists[0].name));
                        console.log("Song Name: " + JSON.stringify(data.body.tracks.items[0].name));
                        console.log("Album Name: " + JSON.stringify(data.body.tracks.items[0].album.name));
                        console.log("Preview: " + JSON.stringify(data.body.tracks.items[0].preview_url));

            console.log("===============================================================================");




          fs.appendFile("log.txt", (process.argv[2] + "Artists Name: " + JSON.stringify(data.body.tracks.items[0].artists[0].name) + "Song Name: " + JSON.stringify(data.body.tracks.items[0].name)
                                        + "Album Name: " + JSON.stringify(data.body.tracks.items[0].album.name) + "Preview: " + JSON.stringify(data.body.tracks.items[0].preview_url) + "---------------------------------------------------------------"));
 



});
}

};


function tweets (){

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
            fs.appendFile("log.txt", (process.argv[2] + JSON.stringify(tweets[i].created_at) + JSON.stringify(tweets[i].text) + "-------------------------------------------"));
          }
        }
        

    })
    };



    function tweets (){

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
            fs.appendFile("log.txt", (process.argv[2] + JSON.stringify(tweets[i].created_at) + JSON.stringify(tweets[i].text) + "-------------------------------------------"));
          }
        }
        

    })
    };



if (nodeArgs[2] == "my-tweets"){

  
    tweets ();


} else if (nodeArgs[2] == "spotify-this-song"){

 
spotify ();

}else if (nodeArgs[2] == "movie-this"){

  
movie ();

}else if (nodeArgs[2] == "do-what-it-says"){

 fs.readFile('random.txt', "utf8", function(err, data){

  random = [];


   random = data.split(" ");

   console.log(random);


        if (random[0] == "spotify-this-song"){
          spotify();
        }
        else if (random[0] == "my-tweets"){
          tweets();
        }
        else if (random[0] == "movie-this"){
          movie();
        }
        else{
          console.log ("N/A");
        }

      });



}else {
	console.log("Do valid option.");
}




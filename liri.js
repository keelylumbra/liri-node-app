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


  function movie (){

          if (nodeArgs[3] == undefined){
                            movieName = "Mr.+Nobody";

                          }



                        // Loop through all the words in the node argument
                        // And do a little for-loop magic to handle the inclusion of "+"s

                        else {
                        movieName = nodeArgs.slice(3).join("+");


                        };


                        // Then run a request to the OMDB API with the movie specified 
                        var queryUrl = 'http://www.omdbapi.com/?t="' + movieName + '"&y=&plot=short&tomatoes=true&r=json';

                        // This line is just to help us debug against the actual URL.  

                        request(queryUrl, function(error, response, body) {

                            // If the request is successful (i.e. if the response status code is 200)
                            if (! error && response.statusCode == 200) {

                                // Parse the body of the site and recover just the imdbRating
                                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                                console.log("Title: " + JSON.parse(body)["Title"]);
                                console.log("Release Year: " + JSON.parse(body)["Year"]);
                                console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
                                console.log("Country Released: " + JSON.parse(body)["Country"]);
                                console.log("Language: " + JSON.parse(body)["Language"]);
                                console.log("Plot: " + JSON.parse(body)["Plot"]);
                                console.log("Actors: " + JSON.parse(body)["Actors"]);
                                console.log("Rotten Tomatos Rating: " + JSON.parse(body)["tomatoRating"]);
                                console.log("Rotten Tomatos URL: " + JSON.parse(body)["tomatoURL"]);
                            }


                            fs.appendFile("log.txt", (process.argv[2]+ JSON.parse(body)["tomatoURL"]));
                        });
                        }


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
    }


function tunes (){

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


if (nodeArgs[2] == "my-tweets"){

  

    tweets ();


} else if (nodeArgs[2] == "spotify-this-song"){

  
tunes ();

}else if (nodeArgs[2] == "movie-this"){


movie ();

}else if (nodeArgs[2] == "do-what-it-says"){

 fs.readFile('random.txt', "utf8", function(err, data){


   data = data.split(" ");

   console.log(data)


        if (data[0] == "spotify-this-song"){
          tunes()
        }
        else if (data[0] == "my-tweets"){
          tweets()
        }
        else if (data[0] == "movie-this"){
          movie();
        }
        else{
          console.log ("N/A");
        }

      });



}else {
	console.log("Do valid option.");
}




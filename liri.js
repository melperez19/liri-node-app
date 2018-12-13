require("dotenv").config();

// --------------------------Variables for accessing other files and API Keys-------------------------------------------
//creates log.txt file to store retrieved information
var filename = './log.txt';

var request = require("request");
var keys = require("./javascript/keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment")




// ----------------------------Variables to determine the user command outputs--------------------------------------------

// User input to determine the type of search (ex.spotify-this-song)
var searchCommand = process.argv[2];
// User input to determine the actual search term (ex.any song name)
var userCommandInput = process.argv[3];
//concatenate multiple words in the actual search term
for (var i = 4; i < process.argv.length; i++) {
    userCommandInput += '+' + process.argv[i];
}


// ---------------------------node liri.js spotify-this-song '<song name here>'--------------------------------------------

// Fetch Spotify Keys
var spotify = new Spotify(keys.spotify);

// Writes to the log.txt file
var getArtistNames = function (artist) {
    return artist.name;
};

// Function for running a Spotify search
var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "The Sign, Ace of Base";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            console.log("artist(s): " + songs[0].artists.map(getArtistNames));
            console.log("song name: " + songs[0].name);
            console.log("preview song: " + songs[0].preview_url);
            console.log("album: " + songs[0].album.name);
            console.log("----------------End spotify-this-song-------------------");

            // add the search results to the log.txt file
            fs.appendFile('log.txt', "\n-----------------------spotify-this-song--------------------------");
            fs.appendFile('log.txt', "\nartist(s): " + songs[0].artists.map(getArtistNames));
            fs.appendFile('log.txt', "\nsong name: " + songs[0].name);
            fs.appendFile('log.txt', "\npreview song: " + songs[0].preview_url);
            fs.appendFile('log.txt', "\nalbum: " + songs[0].album.name);
            
            

        }
    );
};

// ----------------------------node liri.js concert-this <artist/band name here>-------------------------------------


var getConcert = function (band) {
    if (band === undefined) {
        band = "3lau";
    }
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("Name of the venue: " + response.data[0].venue.name);
            console.log("Venue location: " + response.data[0].venue.city);
            console.log("Date of the Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

            // add the search results to the log.txt file
            fs.appendFile('log.txt', "\n-----------------------concert-this---------------------------");
            fs.appendFile('log.txt', "\nName of the venue: " + response.data[0].venue.name);
            fs.appendFile('log.txt', "\nVenue location: " + response.data[0].venue.city);
            fs.appendFile('log.txt', "\nDate of the Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            
        }
    );
}


// -----------------------------node liri.js movie-this '<movie name here>'------------------------------------------

// Make a request with axios to the OMDB API with the movie specified
var getMovie = function (movieName) {
    if (movieName === undefined) {
        movieName = "Mr.Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

            // add the search results to the log.txt file
            fs.appendFile('log.txt', "\n-----------------------movie-this---------------------------");
            fs.appendFile('log.txt', "\nTitle: " + response.data.Title);
            fs.appendFile('log.txt', "\nYear: " + response.data.Year);
            fs.appendFile('log.txt', "\nIMDB Rating: " + response.data.imdbRating);
            fs.appendFile('log.txt', "\nRotten Tomatoes Rating: " + response.data.Ratings[2].Value);
            fs.appendFile('log.txt', "\nCountry: " + response.data.Country);
            fs.appendFile('log.txt', "\nLanguage: " + response.data.Language);
            fs.appendFile('log.txt', "\nPlot: " + response.data.Plot);
            fs.appendFile('log.txt', "\nActors: " + response.data.Actors);
            
        }
    );
}


//-------------------------------- node liri.js do-what-it-says----------------------------------------------------

// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"

var justDoIt = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // the return 
        // We will then print the contents of data
        console.log(data);

    });

    const data = fs.readFileSync('random.txt', 'utf8')

}


//-------------------- Switch function to jump between the different search commands---------------------------------

switch (searchCommand) {
    case "spotify-this-song":
        getSpotify(userCommandInput);
        break;
    case "concert-this":
        getConcert(userCommandInput);
        break;
    case "movie-this":
        getMovie(userCommandInput);
        break;
    case "do-what-it-says":
        justDoIt(userCommandInput);
        break;
    default:
        console.log("{Please enter a command: spotify-this-song, concert-this, movie-this, do-what-it-says}")
}
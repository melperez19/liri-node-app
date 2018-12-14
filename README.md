                                                            # Liri-Node-App
                                                            
           ![gif-screenshot](https://github.com/melperez19/liri-node-app/blob/master/screenshots/Animated%20GIF-source.gif)

LIRI is a Language Interpretation and Recognition Interface. This app will be a command line node app that takes in parameters and gives you back data based on API calls. LIRI uses the following commands:

spotify-this-song

concert-this

movie-this

do-what-it-says

# Technologies used:

* Node.js
* Javascript
* npm packages: require, fs, spotify, axios, moment

# How to Run LIRI-Bot

--------------------------------------------------------------------------------------------------------------------------------------
1: node liri.js spotify-this-song <song name here> :
This will show the following information about the song in your terminal/bash window 
  * Artist(s) 
  * The song's name 
  * A preview link of the song from Spotify 
  * The album that the song is from

if no song is provided then the program will default to
"The Sign" by Ace of Base

![spotify-screenshot](https://github.com/melperez19/liri-node-app/blob/master/screenshots/SpotifyDefaultResults.JPG) 
--------------------------------------------------------------------------------------------------------------------------------------
2. node liri.js concert-this <band name here> :
This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

    * Name of the venue
    * Venue location
    * Date of the Event (use moment to format this as "MM/DD/YYYY")
    
    ![concert-screenshot](https://github.com/melperez19/liri-node-app/blob/master/screenshots/ConcertThisResults.JPG)
---------------------------------------------------------------------------------------------------------------------------------------
3: node liri.js movie-this <movie name here> :
This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

![movie-screenshot](https://github.com/melperez19/liri-node-app/blob/master/screenshots/MovieThisDefault.JPG)

--------------------------------------------------------------------------------------------------------------------------------------
4: node liri.js do-what-it-says

This should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

![do-screenshot](https://github.com/melperez19/liri-node-app/blob/master/screenshots/DoWhatItSaysResults.JPG)

--------------------------------------------------------------------------------------------------------------------------------------
5. New Text File created with results information

An fs.appendFile has been added to the search results from each search command so that the information retrieved gets stored in a seperate, new file called log.txt

![log-screenshot](https://github.com/melperez19/liri-node-app/blob/master/screenshots/LogTxtResults.JPG)

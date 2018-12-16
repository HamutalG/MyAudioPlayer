# [My Audio Player](https://myonlineaudioplayer.000webhostapp.com/)
#### JQuery - AJAX

A one-page webpage that presents an audio player as well as the various playlists created by the user.  
The user may add, edit, and delete each playlist (as well as songs within each playlist).  
The songs in each playlist are in URL MP3 format and are played using an HTML5 audio player.  

The project is written using:

  - HTML5 + CSS3
    - New HTML5 tags
    - CSS3 media queries and advanced selectors
    - Dynamic page layouts
    - Bootstrap & Font Awesome
  - JavaScript
    - Objects
    - Function Closures
    - jQuery
    - Single Page Application foundations
    - Events
    - Ajax (RESTful API)
    - Documentation

#### Extras
- Each playlist is displayed within an image of a record.
- Each playlist has a name and an individual image (an image URL which the user may edit at any time).
- Each playlist contains a list of songs (MP3 URLs that are editable).
- Upon clicking on a playlist, the playlist will be presented on the audioplayer (with the playlist image spinning on the audio player's record) and start playing the first song. The next song will automatically play when the current playing song ends or upon clicking on a different song from the song list. 
- The user may also search playlists by name by using the search input box (upon typing more than 2 letters, an "auto-complete" list of the existing playlists will appear to choose from).
- All playlists and songs are stored in a RESTful server and can be added, edited and deleted (by API).
- Titles of the playlists are designed using [jquery.lettering.js](http://letteringjs.com/).
    
##### Installation:

This project requires:
- An integrated development environment that allows applications to be developed from modules. I used [NetBeans](https://netbeans.org/)
- A cross-platform web server solution consisting of the Apache HTTP Server, MariaDB database (MySQL), and interpreters for scripts written in the PHP languages. I used [XAMPP](https://www.apachefriends.org/)
- Upload "playlist.sql" to the database (phpMyAdmin) to see (and hear) existing playlists


 

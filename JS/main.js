
$(function () {

    //global index counter
    currentSongsIndex = 0;

    //global error message
    errorMsgIsValid = false;

    //global search terms array
    availableSearchTerms = [];

    //shows all the playlists in the database
    getAllPlaylists();

    //shows all the playlists in the database and filters the search input value
    function getAllPlaylists(searchTerm) {

        $.get('./db/playlist.php?type=playlist', function (data) {

            $(".playListsContainer").html("");

            if (searchTerm) {

                let lower = searchTerm.toLowerCase();
                var filteredResult = data.data.filter(playlist => {
                    return playlist.name.toLowerCase().indexOf(lower) !== -1;
                });
            }

            if (!filteredResult) {
                var filteredResult = data.data;
            }

            $(filteredResult).each((i, playlist) => {

                var eachPlaylist = `
                    <div class="col-sm-3 singlePlyst">
                        <div class="eachPlaylist">
                           <h3 class="plylstTitle">${playlist.name}</h3>
                           <div class="singleRecord">
                                <div class="singleRecordBtns"><span class='plyBtn2'><i class="fas fa-play plyBtn" data-id='${playlist.id}'></i></span>
                                <span class='plyBtn3'><i class="fas fa-edit editBtn" data-id='${playlist.id}' data-toggle="modal" data-target="#modalWindow" data-id='${playlist.id}'></i></span>
                                <span class='plyBtn4'><i class="fas fa-trash-alt deleteBtn" data-id='${playlist.id}'></i></span></div>
                                <span class='backgrndimg'><img class="record" src='${playlist.image}' alt="Playlist Image"/></span>
                            </div>
                        </div>                
                    </div>`;
                $(".playListsContainer").append(eachPlaylist);
            });

            $(".plylstTitle").each((i) => {

                let circle = new CircleType(document.getElementsByClassName("plylstTitle")[i]);
                circle.radius(180);
            });

            var tempArr = [];
            data.data.map(playlistItem => {
                tempArr.push(playlistItem.name);
            });

            availableSearchTerms = tempArr;

            $("#searchInput").autocomplete({
                minLength: 2,
                source: availableSearchTerms
            });
        });
    }

    //search for a playlist
    $('.searchBtn').click((e) => {
        e.preventDefault();

        $(".playListsContainer").empty();

        var searchTerm = $("#searchInput").val();
        getAllPlaylists(searchTerm);

        $("#searchInput").val("");
    });

    //shows all the playlists (for example, after searching and displaying individual playlists)
    $(".showAllBtn").click((e) => {
        e.preventDefault();
        getAllPlaylists();
    });

    //shows preview of image when adding a playlist
    $('.modal-body').on("change", ".plylstURL", () => {
        $('.modal-body #imgToDisplay').attr('src', $('.modal-body .plylstURL').val())
    }
    );

    //shows preview of image when editing a playlist
    $('.modal-body').on("change", ".editplylstURL", () => {
        $('.modal-body #imgToDisplay').attr('src', $('.modal-body .editplylstURL').val())
    });

    //global adding a new playlist info
    AddplaylistInfo = {};

    //add a new playlist
    $("#addPlystItem").click(() => {

        $(".modal-title").html("Add New Playlist");
        $(".modal-body").html(`
        <div class='addPlylstNameURL'><Label class="addName">Playlist Name: </Label><input class='plylstName' type='text' placeholder='Playlist Name' /> </br>
        <Label class="addUrl">Playlist URL: </Label><input class='plylstURL' type='text' placeholder='Playlist URL' /><br/>
        <div class="URLerrorMsg"></div></div>
        <img id="imgToDisplay" class='previewImg' src='../CSS/images/urlPreview.JPG' /> 
        `);
        $(".modal-footer").html(`
        <input class="btn btn-primary resetBtn" type='button' value='Reset Fields'/>
        <span class="inputErr"></span>
        <input class="btn btn-primary addPlystNextBtn" type='button' value='Next'/>
        `);

    });

    //validation for image input url when adding a playlist
    $(".modal-body").on("blur", ".plylstURL", () => {
        testImage($(".plylstURL").val(), record);
    });

    //clear inputs in add or edit window
    $(".modal-footer").on("click", ".resetBtn", () => {
        $(".plylstName").val("");
        $(".plylstURL").val("");
    });

    //second "stage" of adding a new playlist
    $(".modal-footer").on("click", ".addPlystNextBtn", () => {

        if (!($(".plylstName").val() == "") && !($(".plylstURL").val() == "")) {
            $(".inputErr").html("");

            var plylstName = $(".plylstName").val();
            var plylstURL = $(".plylstURL").val();

            AddplaylistInfo.name = plylstName;
            AddplaylistInfo.image = plylstURL;


            $(".modal-title").html("Add Playlist Songs");
            $(".modal-body").html(`
                <div class='addSongNameURL'><Label class="songURLNameLabel">Song URL: </Label><input class='songURL' type='text' placeholder='Song URL' />
                <Label class="songURLNameLabel addSongLabel">Name: </Label><input class='songName ' type='text' placeholder='Song Name' /> 
                <i class="fas fa-trash-alt deleteSongURLRow"></i><br/>
                <div class="URLErrorSong" style="font-size: 80%; color: red; float: left;"></div></div>        
                `);

            $(".modal-footer").html(`
                   <input class="btn btn-primary addAnotherSong" type='button' value='Add Another Song'/>   
                   <span class="inputErr2"></span>
                   <input class="btn btn-primary saveAndFinish" type='button' value='Finish & Save'/>
            `);
        } else {
            $(".inputErr").html("All fields are required!");
        }
    });

    //adds an additional row for adding more songs in the add or edit window
    $(".modal-footer").on("click", ".addAnotherSong", () => {

        $(".modal-body").append(`
            <div class='addSongNameURL'><Label class="songURLNameLabel">Song URL: </Label><input class='songURL'  type='text' placeholder='Song URL' />
            <Label class="songURLNameLabel addSongLabel">Name: </Label><input class='songName' type='text' placeholder='Song Name' />
            <span><i class="fas fa-trash-alt deleteSongURLRow"></i></span><br/>
            <div class="URLErrorSong" style="font-size: 80%; color: red; float: left;"></div></div>
        `);
    });

    //deletes a row for adding more songs in the add window
    $(".modal-body").on("click", ".deleteSongURLRow", (e) => {
        let inputIndex = Array.from($(`.${e.target.classList[2]}`)).indexOf(e.target);

        $($(".addSongNameURL")[inputIndex]).remove();
    });

    ////deletes a row for adding more songs in the edit window
    $(".modal-body").on("click", ".deleteSongURLRow2", (e) => {
        let inputIndex = Array.from($(`.${e.target.classList[2]}`)).indexOf(e.target);

        $($(".editSongNameURL")[inputIndex]).remove();
    });

    //validation for song input url
    $(".modal-body").on("blur", ".songURL", (e) => {
        let validation = checkMp3(e.target.value);

        let inputIndex = Array.from($(".songURL")).indexOf(e.target);
        !validation ? $($(".URLErrorSong")[inputIndex]).html("Not a valid mp3 link!") : $($(".URLErrorSong")[inputIndex]).html("");
    });

    //save and finish button when adding a new playlist
    $(".modal-footer").on("click", ".saveAndFinish", () => {

        var songsArr = [];

        $(".inputErr2").html("");

        $(".songURL").each((i) => {

            let newSong = {name: $($(".songName")[i]).val(), url: $($(".songURL")[i]).val()};
            songsArr.push(newSong);

        });

        AddplaylistInfo.songs = songsArr;

        $("#modalWindow").modal('hide');

        $.post('../DB/playlist.php?type=playlist', AddplaylistInfo, (data) => {

            getAllPlaylists();

        });

    });

    //global editing a playlist info
    EditplaylistInfo = {};

    //clicking on the "edit" icon from the playlists container
    $(".playListsContainer").on("click", ".editBtn", (e) => {

        $.get(`./db/playlist.php?type=playlist&id=${e.target.dataset.id}`, function (data) {
            $(".modal-title").html("Edit Playlist");
            $(".modal-body").html(`
                <div class='editPlylstNameURL'><Label class="editName">Playlist Name: </Label><input class='editplylstName' type='text' placeholder='Playlist Name' value="${data.data.name}"/> </br>
                <Label class="editUrl">Playlist URL: </Label><input class='editplylstURL' type='text' placeholder='Playlist URL' value="${data.data.image}" /><br/>
                <div class="URLerrorMsg"></div></div>
                <img id="imgToDisplay" class='previewImg' src='${data.data.image}' /> 
            `);

            $(".modal-footer").html(`
                <input class="btn btn-primary resetBtn" type='button' value='Reset Fields'/>
                <span class="inputErr"></span>
                <input class="btn btn-primary editPlystNextBtn" data-id="${data.data.id}" type='button' value='Next'/>
            `);
        });
    });

    //clicking on the "edit" icon from the player's icons
    $(".outerPlayer").on("click", ".playerEdit", (e) => {

        $.get(`./db/playlist.php?type=playlist&id=${e.target.dataset.id}`, function (data) {
            $(".modal-title").html("Edit Playlist");
            $(".modal-body").html(`
                <div class='editPlylstNameURL'><Label class="editName">Playlist Name: </Label><input class='editplylstName' type='text' placeholder='Playlist Name' value="${data.data.name}"/> </br>
                <Label class="editUrl">Playlist URL: </Label><input class='editplylstURL' type='text' placeholder='Playlist URL' value="${data.data.image}" /><br/>
                <div class="URLerrorMsg"></div></div>
                <img id="imgToDisplay" class='previewImg' src='${data.data.image}' /> 
            `);

            $(".modal-footer").html(`
                <input class="btn btn-primary resetBtn" type='button' value='Reset Fields'/>
                <span class="inputErr"></span>
                <input class="btn btn-primary editPlystNextBtn" data-id="${data.data.id}" type='button' value='Next'/>
            `);
        });
    });

    //validation for image input url when editing a playlist
    $(".modal-body").on("blur", ".editplylstURL", () => {
        testImage($(".editplylstURL").val(), record);
    });

    //second "stage" of editing a playlist
    $(".modal-footer").on("click", ".editPlystNextBtn", (e) => {

        var editplylstName = $(".editplylstName").val();
        var editplylstURL = $(".editplylstURL").val();

        EditplaylistInfo.name = editplylstName;
        EditplaylistInfo.image = editplylstURL;

        if (!(editplylstName == "") && !(editplylstURL == "")) {

            $(".inputErr").html("");

            $.get(`./db/playlist.php?type=songs&id=${e.target.dataset.id}`, function (data) {

                data.data.songs.map((song, index) => {
                    var editSongHtml = `
                    <div class='editSongNameURL'><Label class="songURLNameLabel">Song URL: </Label><input class='songURL' type='text' value = ${song.url} placeholder='Song URL' />
                    <Label class="songURLNameLabel addSongLabel">Name: </Label><input class='songName ' type='text' value = ${song.name} placeholder='Song Name' /> 
                    <span><i class="fas fa-trash-alt deleteSongURLRow2"></i></span><br/>
                    <div class="URLErrorSong" style="font-size: 80%; color: red; float: left;"></div></div>                        
                `;

                    $(".modal-title").html("Edit Playlist Songs");

                    if (index == 0) {
                        $(".modal-body").html(editSongHtml);
                    } else {
                        $(".modal-body").append(editSongHtml);
                    }

                    $(".modal-footer").html(`
                       <input class="btn btn-primary addAnotherSong" type='button' value='Add Another Song'/>  
                       <span class="inputErr2"></span>
                       <input class="btn btn-primary editSaveAndFinish" data-id="${e.target.dataset.id}" type='button' value='Finish & Save'/>
                    `);
                });
            });
        } else {
            $(".inputErr").html("All fields are required!");
        }
    });

    //save and finish button after editing a playlist
    $(".modal-footer").on("click", ".editSaveAndFinish", (e) => {

        var songsArr = [];
        $(".songURL").each((i) => {

            let newSong = {name: $($(".songName")[i]).val(), url: $($(".songURL")[i]).val()};
            songsArr.push(newSong);
        });

        EditplaylistInfo.songs = songsArr;

        $("#modalWindow").modal('hide');

        $.post(`../DB/playlist.php?type=playlist&id=${e.target.dataset.id}`, EditplaylistInfo, (data) => {
            debugger;
            $.post(`../DB/playlist.php?type=songs&id=${e.target.dataset.id}`, {songs: songsArr}, (data) => {

                getAllPlaylists();

                if (e.target.classList[2] == "saveAndFinish") {
                    $(".songsList").html("");

                    $.get(`../DB/playlist.php?type=songs&id=${e.target.dataset.id}`, function (data) {
                        currentSongs = data.data.songs;
                        $(currentSongs).each((i, song) => {
                            let updatedSong = $(`<li data-url=${song.url} data-index=${i}>${song.name}</li>`).appendTo($(".songsList"));
                        });
                        setCurrentSongsIndex();
                    });
                }
            });
        });
    });

    //deleting a playlist from the playlists container
    $(".playListsContainer").on("click", ".deleteBtn", (e) => {

        var deleteConfirm = confirm("Are you sure you want to delete the playlist permenantly?");

        if (deleteConfirm) {
            $.ajax({
                url: `../DB/playlist.php?type=playlist&id=${e.target.dataset.id}`,
                method: 'DELETE',
                type: 'playlist',
                success: function (result) {
                    document.getElementById("songAudio").pause();
                    $(".playerContainer").hide();
                    getAllPlaylists();
                }
            });
        }
    });

    //deleting a playlist from the record's icons
    $(".outerPlayer").on("click", ".playerDelete", (e) => {
        var deleteConfirm = confirm("Are you sure you want to delete the playlist permenantly?");

        if (deleteConfirm) {

            $.ajax({
                url: `../DB/playlist.php?type=playlist&id=${e.target.dataset.id}`,
                method: 'DELETE',
                type: 'playlist',
                success: function (result) {
                    document.getElementById("songAudio").pause();
                    $(".playerContainer").hide();
                    getAllPlaylists();
                }
            });
        }
    });

    //global array for songs that are currently displayed in the player
    currentSongs = [];

    //clicking on the "play" icon displayed on each of the playlists
    $(".playListsContainer").on("click", ".plyBtn", (e) => {
        $(".playerContainer").show();
        $(".outerPlayer").html(`
            <span class='plyBtn5'><i class="fas fa-edit playerEdit" data-toggle="modal" data-target="#modalWindow" data-id=${e.target.dataset.id}></i></span>
            <span class='plyBtn6'><i class="fas fa-trash-alt playerDelete" data-id=${e.target.dataset.id}></i></span>
        `);

        $('.songsList').html("");

        $.get(`../DB/playlist.php?type=playlist&id=${e.target.dataset.id}`, (data) => {
            $('.playerImg').html("<img id='ImgInPlayer' src='" + data.data.image + "'/>");
        });

        $.get(`../DB/playlist.php?type=songs&id=${e.target.dataset.id}`, (data) => {
            let songsArr = [];
            data.data.songs.map((song, index) => {
                $('.songsList').append(`<li class="singleSong" data-url="${song.url}" data-index="${index}" data-name="${song.name}">${song.name}</li>`);

                if (index == 0) {
                    $('#songAudio source').attr('src', song.url);
                    document.getElementById('songAudio').load();
                    document.getElementById('songAudio').play();
                    setCurrentSongsIndex();
                }

                songsArr.push({name: song.name, url: song.url, index: index});


            });

            currentSongs = songsArr;

            nowPlayingName(currentSongs[0]);

        });
    });

    //setting the index for currently playing songs in the player
    function setCurrentSongsIndex() {
        var currentPlayingSong = $("#songAudio source").attr('src');

        $(currentSongs).each((i, song) => {

            if (currentPlayingSong == song.url) {
                currentSongsIndex = song.index;
                nowPlayingName(song);
            }
        });
    }

    //global variable for songs that are currently displayed in the player
    currentPlayingName = "";

    //displaying the name for the currently playing song in the player
    function nowPlayingName(song) {
        $('.nowPlaying').html("");
        var currentPlayingSong = $("#songAudio source").attr('src');

        $(currentSongs).each(() => {
            if (currentPlayingSong == song.url) {
                currentPlayingName = song.name;
            }
        });
        $('.nowPlaying').html('<h5 class="nowPlayingLabel">Now Playing: </h5><span class="nameOfSong">' + currentPlayingName + '</span>');
    }

    //plays the song that is clicked in the player song list
    $(".songsList").click("li", (e) => {

        $('#songAudio source').attr('src', e.target.dataset.url);

        currentPlayingName = e.target.dataset.name;
        setCurrentSongsIndex();

        document.getElementById('songAudio').load();
        document.getElementById('songAudio').play();

        $('.nowPlaying').html('<h5 class="nowPlayingLabel">Now Playing: </h5><span class="nameOfSong">' + currentPlayingName + '</span>');

    });

    //playing the next song on the song list in player when a previous song ends
    document.getElementById('songAudio').addEventListener("ended", function () {

        $("#songAudio source").attr("src", currentSongs[currentSongsIndex + 1].url);
        setCurrentSongsIndex();
        this.load();
        this.play();

        nowPlayingName(currentSongs[currentSongsIndex + 1]);

    });

    //validation for image urls
    function testImage(url, callback, timeout) {
        timeout = timeout || 5000;
        var timedOut = false, timer;
        var img = new Image();
        img.onerror = img.onabort = function () {
            if (!timedOut) {
                clearTimeout(timer);
                callback(url, "Not a valid image link!");
            }
        };
        img.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                callback(url, "success");
            }
        };
        img.src = url;
        timer = setTimeout(function () {
            timedOut = true;
            callback(url, "timeout");
        }, timeout);
    }

    //continued validation for image urls
    function record(url, result) {
        if (result != 'success') {
            errorMsgIsValid = false;
            $(".addPlystNextBtn").prop("disabled", true);
            $(".editPlystNextBtn").prop("disabled", true);
            $('.previewImg').css("display", "none");
            $('.URLerrorMsg').html("<span style='color:red; font-size: 80%; float: left;' class='" + result + "'>" +
                    result + ": " + url + "</span>");
        } else {
            errorMsgIsValid = true;
            $(".addPlystNextBtn").prop("disabled", false);
            $(".editPlystNextBtn").prop("disabled", false);
            $('.previewImg').css("display", "block");
            $('.URLerrorMsg').html("");
        }
    }

    //validation for song urls
    function checkMp3(url) {
        var patt = new RegExp("^.*(?=\.wav$|\.mp3$)");
        var res = patt.test(url);
        if (!res) {
            errorMsgIsValid = false;
            $(".saveAndFinish").prop("disabled", true);
        } else {
            errorMsgIsValid = true;
            $(".saveAndFinish").prop("disabled", false);
        }
        return res;

    }

    //pauses the spinning playlist image when the pausing a song
    document.getElementById('songAudio').addEventListener("pause", function () {
        $("#ImgInPlayer").css("animation-play-state", "paused");

    });

    //spinning image when a song plays
    document.getElementById('songAudio').addEventListener("play", function () {
        $("#ImgInPlayer").css("animation-play-state", "running");

    });
});

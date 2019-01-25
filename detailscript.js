$(document).ready(function(){
    var artist = getQueryParameter("term");

    $.ajax({
        url: "https://itunes.apple.com/search?term=" + artist,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            display(result);
            console.log(result);
        },
        error: function () {
            alert('Failed!');
        }
    });
});

function getQueryParameter(name){
    var query = window.location.search.substring(1);
    var eva = query.split("&");
    for (var i = 0;i < eva.length; i++) {
        var pair = eva[i].split("=");
        if(pair[0] === name){
            return pair[1];
        }
    }
}

function display(result){
    var limit = getQueryParameter("limit");
    var details = $("#songDetails");
    var artist = getQueryParameter("term");
    var song = getQueryParameter("song");
    var explicitness = "";

    if(result.results[0].trackExplicitness === "cleaned"){
        explicitness = "Clean";
    }else{
        explicitness = "Explicit";
    }

    details.append("<div><img src='" + result.results[song].artworkUrl100 + "'></div>");
    details.append("<div>Song: " + result.results[song].trackName + " (" + explicitness + ")</div>");
    details.append("<div>Artist: " + result.results[song].artistName + "</div>");
    details.append("<div>Album: " + result.results[song].collectionName + "</div>");
    details.append("<div>Genre: " + result.results[song].primaryGenreName + "</div>");
    details.append("<a href='" + result.results[song].collectionViewUrl + "' target = '_blank'>Album Page</a>");

    var time = convertMilliseconds(result.results[song].trackTimeMillis);
    details.append("<div>Track time: " + time + "</div>");

    var releaseDate = new Date(result.results[song].releaseDate);
    var dateString = releaseDate.toDateString();
    details.append("<div>Release date: " + dateString + "</div>");

    details.append("<audio src='" + result.results[song].previewUrl + "' controls></audio><br>");
    details.append("<a href='index.html?term=" + artist + "&button=click&limit=" + limit + "'>Back</a>");
}

function convertMilliseconds(millis){
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

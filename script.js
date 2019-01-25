$(document).ready(function(){
    var button = getQueryParameter("button");
    if(button === "click"){
        document.getElementById("searchTerm").value = getQueryParameter("term");
        document.getElementById("number").value = getQueryParameter("limit");
        onClick();
    }
    $("#button").click(function(){
        onClick();
    });
});

function onClick(){
    var searchTerm = $("#searchTerm").val();
    $("#results").empty();
    if(searchTerm === ""){
        searchTerm = getQueryParameter("term");
    }else{
        searchTerm = $("#searchTerm").val();
    }
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + searchTerm,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result){
            process(result);
            console.log(result);
        },
        error: function (){
            alert('Failed!');
        }
    });
}

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

function process(result) {
    var myResult = result;
    var limit = $("#number").val();
    $("#results").append('<table class="w3-table-all" id="table">');
    if(myResult.resultCount === 0){
        $("#results").append("There are no results for this search.");
    }else{
        for(var i = 0; i < limit; i++){
            $("#table").append("<tr class='w3-hover-blue' id='" + i + "'>");
            $("#" + i).append("<td><div>" + (i+1) + ".</div></td>");
            $("#" + i).append("<td><a href='detail.html?term=" + myResult.results[i].artistName + "&song=" + i + "&limit=" + limit + "'><img src='" + myResult.results[i].artworkUrl100 + "'></a></td>");
            $("#" + i).append("<td><div>" + myResult.results[i].trackName + "</div></td>");
            $("#" + i).append("<td><div>" + myResult.results[i].artistName + "</div></td>");
            $("#" + i).append("<td><div>" + myResult.results[i].collectionName + "</div></td>");
            $("#" + i).append("<td><audio src='" + myResult.results[i].previewUrl + "' controls></audio></td>");
            $("#table").append("</tr>");

        }
        $("#results").append("</table>");
    }
}

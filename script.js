$(document).ready(function(){
    $("#button").click(function(){
        var searchTerm = $("#searchTerm").val();
        $("#results").empty();
        $.get("https://itunes.apple.com/search?term=" + searchTerm, process);
    });
});

function process(result) {
    var myResult = JSON.parse(result);
    var numResults = $("#number").val();
    $("#results").append('<table class="w3-table-all" id="table">');
    if(myResult.resultCount == 0){
        $("#results").append("There are no results for this search.");
    }else{
        for(var i = 0; i < numResults; i++){
            $("#table").append("<tr class='w3-hover-blue' id='" + i + "'>");
            $("#" + i).append("<td><div>" + (i+1) + ".</div></td>");
            $("#" + i).append("<td><img src='" + myResult.results[i].artworkUrl100 + "'></td>");
            $("#" + i).append("<td><div>" + myResult.results[i].trackName + "</div></td>");
            $("#" + i).append("<td><div>" + myResult.results[i].artistName + "</div></td>");
            $("#" + i).append("<td><div>" + myResult.results[i].collectionName + "</div></td>");
            $("#" + i).append("<td><audio src='" + myResult.results[i].previewUrl + "' controls></audio></td>");
            $("#table").append("</tr>");

        }
        $("#results").append("</table>")
    }
}

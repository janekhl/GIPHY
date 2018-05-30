var topics = ["baking","cooking","marvel","yoga","monkeys"]

function displayGif() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=h2rgamDqEa0XFgQwQVhY9SkyUErIHHQD&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {    
        var results=response.data;
        for (var i=0; i<results.length;i++) {
            var gifDiv = $("<div class='gif'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            gifDiv.append(p);
            var image = $("<img>");
            image.addClass('giphy')
            image.attr('src', results[i].images.fixed_height_still.url);
            image.attr('data-still', results[i].images.fixed_height_still.url)
            image.attr('data-animate', results[i].images.fixed_height.url)
            .attr('data-state', 'still');
            gifDiv.append(image);
            $("#gifs-view").prepend(gifDiv);
        }
        $('.giphy').on('click', function() {
            var state = $(this).attr('data-state'); 
            if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
            } else {          
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
            }      
        });
    });
}


function renderButtons() {
    
    $("#buttons-view").empty();
    
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
  }

    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        renderButtons();
  });

    $(document).on("click", ".gif-btn", displayGif);
    renderButtons();
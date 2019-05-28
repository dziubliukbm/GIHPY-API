var animals = [
  "Dog",
  "Parrot",
  "Squirrel",
  "Lion",
  "Fish",
  "owl",
  "eagle",
  "shark",
  "deer",
  "wolf",
  "snake",
  "worm",
  "frog",
  "turkey"
];

function getGifs() {
  var animal = $(this).attr("data-animal");

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=uEu2UPfgqyuQjlL0fKdwL3UebbIK1z0e&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var animalImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-state", "still");
      animalImage.attr("class", "gif");

      // Appending the paragraph and image tag to the animalDiv

      animalImage.on("click", function(event) {
        console.log(this);
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        if (state === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      animalDiv.append(p);
      animalDiv.append(animalImage);

      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gif").prepend(animalDiv);
    }
  });
}
// Function for displaying movie data
function renderButtons() {
  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < animals.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("animals");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-animal", animals[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}
renderButtons();

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var inputAnimal = $("#animal-input")
    .val()
    .trim();
  // The movie from the textbox is then added to our array
  animals.push(inputAnimal);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();

  $("#animal-form").each(function() {
    this.reset();
  });
});
$(document).on("click", ".animals", getGifs); // Calling the renderButtons function at least once to display the initial list of movies
//  $('.animals').on('click', getGifs); - why this one doesnt work?

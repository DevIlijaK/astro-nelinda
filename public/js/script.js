$(document).ready(function () {
  $("#askButton").click(function () {
    // Dobijanje vrednosti iz input polja
    var inputValue = $("#textInput").val();
    var chatBody = $("#chat-body");

    // AJAX poziv
    $.ajax({
      url: "/ask",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ question: inputValue }),
      success: function (response) {
        console.log("Uspesno poslato na /ask", response);

        chatBody.append(`<div>${inputValue}</div>`);
        chatBody.append(response);
        console.log("Body je: ", chatBody);
      },
      error: function (error) {
        console.error("Greska pri slanju zahteva", error);
        // Dodajte kod za rukovanje greškom ovde
      },
    });
  });
});

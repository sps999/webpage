
$(document).ready(function(){
  myFunction();
  
  $('.filtercolor').click(function(){
     var color = this.id;
     urlFiltered = urlLoc + "&colors=" + color;
     page = 1;
     myFunction();
    });
  
  $('.filtertype').click(function(){
     var type = this.id;
     urlFiltered = urlLoc + "&subtypes=" + type;
     page = 1;
     myFunction();
    });
  
  $("#customtype").keyup(function(event) {
    if (event.keyCode === 13) {
      var type = this.value;
      console.log(this.value);
      urlFiltered = urlLoc + "&subtypes=" + type;
      page = 1;
      myFunction();
    }
  });
 }
)
var urlLoc = "https://api.magicthegathering.io/v1/cards?set=XLN,RIX,HOU,AKH,AER,KLD";
var urlFiltered = urlLoc;
var url = urlTemp;
var page = 1;

function next() {
   document.body.scrollTop = 0; // For Chrome, Safari and Opera 
   document.documentElement.scrollTop = 0; // For IE and Firefox
   page = page + 1;
   myFunction();
}

function myFunction(){
  url = urlFiltered + "&page=" + page;
  console.log(url);
  $.ajax({
     url : url,
     dataType: "json",
     success:  function(parsed_json){
        console.log("Success");
        
        cards = parsed_json["cards"];
        var summaryString = "";
        var count = 0;
        
        for(card in cards){
           cardImage = cards[card]["imageUrl"];
           console.log(cardImage);
           
           summaryString = summaryString + "<img src =\"" + cardImage + "\">";
           count = count + 1;
        }
        if(count >= 100)
        {
          summaryString = summaryString + "<button type=\"button\" onclick=\"next()\">Next Page</button>";
        }
        $("#summary").html(summaryString);
       
     }
  });
}
let quotes = [
      { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
      { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
      { quote: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
      { quote: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
      { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { quote: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
      { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" }
    ];


let button = document.getElementById("btn");
let quote = document.getElementById("quote")
let authorx = document.getElementById("authorx")


function generate(){
  let randomIndex = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomIndex];

        quote.innerHTML = `"${randomQuote.quote}"`
        authorx.innerHTML = `-  ${randomQuote.author}`
  
}
const http = require("http");
var now = require("performance-now");

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/book",
  method: "GET",
};

let start = now();
const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    let end = now();
    console.log((end - start).toFixed(3));
    const book = JSON.parse(data);
    console.log("Book Information:");
    console.log("Title:", book.title);
    console.log("Description:", book.description);
    console.log("Author:", book.author);
  });
});

req.on("error", (error) => {
  console.error("Error:", error.message);
});

req.end();

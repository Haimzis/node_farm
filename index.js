const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const insertProductDataToHtmlCard = require("./replaceTemplate");

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const productsObj = JSON.parse(data);

const htmlOverView = fs.readFileSync("./html/overview.html", "utf-8");
const htmlProduct = fs.readFileSync("./html/product.html", "utf-8");
const htmlCard = fs.readFileSync("./html/card.html", "utf-8");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const htmlCards = productsObj
      .map((productObj) => insertProductDataToHtmlCard(productObj, htmlCard))
      .join("");
    res.end(htmlOverView.replace("{%PRODUCT_CARDS%}", htmlCards));
  }
  //product page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const htmlProductPage = insertProductDataToHtmlCard(
      productsObj[query.id],
      htmlProduct
    );
    res.end(htmlProductPage);
  }
  //api
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Contenst-type": "text/html",
      Check: "this is response from the server.!",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

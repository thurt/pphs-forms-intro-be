const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// this is the master list of messages.
const messages = [];

// allows us to serve files in the public/ folder as URLs
app.use(express.static("public"));

// allows us to process submitted form data
app.use(express.urlencoded({ extended: true }));

app.post("/messages", function(request, response) {
  // add a timestamp so we know when this user posted the message
  request.body.timestamp = Date.now();

  // add the message to the master list of message
  messages.push(request.body);

  // send back the messages html page by using redirect
  response.redirect("/messages");
});

app.get("/messages", (request, response) => {
  // create an html page to send back as the response
  response.send(`
  <html>
      <head>
          <title>Messages</title>
          <link rel="stylesheet" href="style.css">
      </head>
      <body>
          <h1>Messages</h1>
          <hr>
          ${messages
            .reverse()
            .map(message => {
              return `
                  <section>
                      <h2>${message.name} (email: ${message.email}) said,</h2>
                      <p>"${message.message}"</p>
                      <i>Posted on ${new Date(
                        message.timestamp
                      ).toLocaleDateString()}</i>
                  </section>
              `;
            })
            .join("")}
      </body>
  </html>
`);
});

app.listen(port);

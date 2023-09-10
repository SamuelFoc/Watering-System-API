const logIncomingData = async (req, res) => {
  try {
    const data = req.body;
    console.log(data, req.params);
    res.status(200).send("Data received and updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const defPage = (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Simple HTML Response</title>
    </head>
    <body>
      <h1>Hello, Express.js!</h1>
      <p>This is a simple HTML response.</p>
    </body>
    </html>
  `;

  res.send(htmlResponse);
};

module.exports = {
  logIncomingData,
  defPage,
};

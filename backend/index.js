const Express = require("express");
const path = require('path');
const fs = require('fs');
const carbone = require('carbone');


const app = new Express();



//add middleware to allow cross-origin requests
const cors = require("cors");


//add middleware to parse the request body
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.json());

//add middleware to parse form data

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generate-report', (req, res) => {
  const data = req.body; // Data received from the frontend
  console.log("data: ", data);

  // Read the chart image file and convert it to base64
  const chartImagePath = path.join(__dirname, 'chart-.png');
  const chartImageBase64 = fs.readFileSync(chartImagePath, 'base64');

  // Append the base64-encoded chart image to the data object
  data.chartImage = `data:image/png;base64,${chartImageBase64}`;

  // Specify the path to your template file
  const templatePath = path.join(__dirname, 'test-template.docx');

  carbone.render(templatePath, data, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating report');
    }

    // Optional: Create a filename with the current date and time
    const dateTime = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    const filename = `result-${dateTime}.docx`;

    // Send the PDF file directly to the client
    res.type('application/docx');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(result);
  });
});

app.get("/", (req, res) => {
    res.send("Hello World");
    }
);

app.get("/data", (req, res) => {

    let parsedDataPoints = [
        { label: "Age Related Risk", y: 573 },
        { label: "T:21 Risk", y: 10000 },
        { label: "T:18/13 Risk", y: 100000 },
      ];

    return res.json(parsedDataPoints);
    }
);



let port = 4001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

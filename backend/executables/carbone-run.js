const fs = require('fs');
const carbone = require('carbone');
const { get } = require('http');
const captureChartAsBase64 = require('./chartToImageModule');

// Data to inject
var data = {
    "patientName": "driz",
    "patientID": "00001",
    "referredBy": "njk",
    "lastMenstrualPeriod": "sddws",
    "gravida": "efwfew",
    "numberOfFetus": "wefwef",
    "previousHistory": "Yes",
    "ivfPersonType": "Self",
    "parity": "sewfw",
    "methodOfConception": "Spontaneous",
    "previousTrisomy21": true,
    "previousTrisomy18": false,
    "previousTrisomy13": false,
    "previousTurner": false,
    "previousNTD": false,
    "dateOfBirth": "2024-03-10",
    "diabetes": "wqdqwd",
    "weight": "213",
    "hcgInjection": false,
    "hcgInjectionDate": "2024-03-29",
    "ethnicity": "wdvvw",
    "sonologistName": "83134",
    "ultrasoundDate": "2024-03-29",
    "bpd": "1132",
    "gestationalAgeBiometrics": "qewfeqw",
    "gestationalAgeUSG": "qfqfqw",
    "fetalHeartRate": "eqfwe",
    "crl": "qfeqew",
    "nt": "qefqewf",
    "dateOfTesting": "2024-03-05",
    "immunoassayAnalyzer": "qwdqw",
    "freeBHCG": "qeqefq",
    "momBHCG": "dvqwefew",
    "pappa": "qfqfeq",
    "momPappa": "qfwqfqw",
    "ntValue": "fqwqf",
    "momNT": "jb",
    "ageRelatedRisk": "jib",
    "trisomy21Risk": "qwdq",
    "trisomy1318Risk": "bbjk",
    "finalAssessment": "jkbk",
    "height": "87987"
};

function getFormattedDateTime() {
    const now = new Date();
    return now.toISOString().replace(/:/g, '-').replace(/\..+/, ''); // ISO string format: YYYY-MM-DDTHH-mm-ss
  }
  
  carbone.render('../../../../Downloads/test-template.docx', data, function(err, result){
    if (err) {
      return console.log(err);
    }
    // write the result
    const dateTime = getFormattedDateTime();
    fs.writeFileSync(`result-${dateTime}.docx`, result);
  });
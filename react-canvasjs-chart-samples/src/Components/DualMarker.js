import React, { useState, useEffect, useRef } from "react";
import ChartWithSecondaryAxis from "../views/ChartWithSecondaryAxis";
import html2canvas from "html2canvas";

const DualMarker = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientID: "",
    referredBy: "",
    lastMenstrualPeriod: "",
    gravida: "",
    numberOfFetus: "",
    parity: "",
    methodOfConception: "",
    previousTrisomy21: false,
    previousTrisomy18: false,
    previousTrisomy13: false,
    previousTurner: false,
    previousNTD: false,
    dateOfBirth: "",
    diabetes: "",
    weight: "",
    hcgInjection: false,
    hcgInjectionDate: "",
    ethnicity: "",
    sonologistName: "",
    ultrasoundDate: "",
    bpd: "",
    gestationalAgeBiometrics: "",
    gestationalAgeUSG: "",
    fetalHeartRate: "",
    crl: "",
    nt: "",
    dateOfTesting: "",
    immunoassayAnalyzer: "",
    freeBHCG: "",
    momBHCG: "",
    pappa: "",
    momPappa: "",
    ntValue: "",
    momNT: "",
    ageRelatedRisk: "",
    trisomy21Risk: "",
    trisomy1318Risk: "",
    finalAssessment: "",
  });

  const chartRef = useRef();

  const [ageRelatedRisk, setAgeRelatedRisk] = useState(0);
  const [t21Risk, setT21Risk] = useState(0);
  const [t1813Risk, setT1813Risk] = useState(0);

  const [riskAssessmentData, setRiskAssessmentData] = useState([
    { label: "Age Related Risk", y: 0 },
    { label: "T:21 Risk", y: 0 },
    { label: "T:18/13 Risk", y: 0 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

    if (name === "ageRelatedRisk") {
      setAgeRelatedRisk(value);
    } else if (name === "trisomy21Risk") {
      setT21Risk(value);
    } else if (name === "trisomy1318Risk") {
      setT1813Risk(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chartElement = chartRef.current;
    const chartCanvas = await html2canvas(chartElement);
    const chartImageCanvas = chartCanvas.toDataURL("image/png");

    console.log("Chart Image Canvas", chartImageCanvas);

    const reportData = {
      "convertTo": "pdf",
      "data": {
        ...formData,
        chartImage: chartImageCanvas,
      },
    };

    console.log("Report Data", reportData);

    fetch(
      "https://render.carbone.io/render/e2d2ec885aee449073b76af37c0ac31ccd98e6bc1618aaddf8fa96a832490fcf",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "test_eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4Njk1MDg3MzUwMDE4MDM2MDEiLCJhdWQiOiJjYXJib25lIiwiZXhwIjoyMzc1MzY4NzE4LCJkYXRhIjp7InR5cGUiOiJ0ZXN0In19.ARPICgDJzf1ba0Z1xmfbquTy5UU_TPy4jXTNHVCGRF_sswZXufyz1q1iz3wIDqO3kFwPrizgz4dJ75DubpnyCd5bAHNeaf1UFyZpZZLu59aBO463J45dHP_BdXdxK7cTa0u6cUfDaQnLlm8URv3frJPjNb3FJ4pNb2RRRCFaIqcQ9xll",
          "carbone-version": "4",
        },
        body: JSON.stringify(reportData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Carbone data", data);
        let renderID = data.data.renderId;

        // redirect to the URL in a new tab

        window.open(
          `https://render.carbone.io/render/${renderID}`,
          "_blank"
        );

        

      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <div ref={chartRef}>
        <ChartWithSecondaryAxis
          ageRelatedRisk={ageRelatedRisk}
          t21Risk={t21Risk}
          t1813Risk={t1813Risk}
        />
      </div>
      <div id="report-form">
        <form onSubmit={handleSubmit}>
          <label>
            Patient Name:
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
            />
          </label>

          <label>
            Age Related Risk:
            <input
              type="text"
              name="ageRelatedRisk"
              value={formData.ageRelatedRisk}
              onChange={handleChange}
            />
          </label>

          <label>
            Trisomy 21 Risk (Downs Syndrome):
            <input
              type="text"
              name="trisomy21Risk"
              value={formData.trisomy21Risk}
              onChange={handleChange}
            />
          </label>

          <label>
            Trisomy 13/18 Risk:
            <input
              type="text"
              name="trisomy1318Risk"
              value={formData.trisomy1318Risk}
              onChange={handleChange}
            />
          </label>

          <label>
            Method of Conception:
            <select
              name="methodOfConception"
              value={formData.methodOfConception}
              onChange={handleChange}
            >
              <option value="spontaneous">Spontaneous</option>
              <option value="ivf">IVF</option>
            </select>
          </label>

          {/* Additional boolean fields for previous conditions can be checkboxes */}
          <label>
            Previous Trisomy 21:
            <span style={{ marginLeft: "10px" }}>
              {formData.previousTrisomy21 ? "True" : "False"}
              <input
                type="checkbox"
                name="previousTrisomy21"
                checked={formData.previousTrisomy21 ? true : false}
                onChange={handleChange}
                style={{ display: "inline-block", width: "auto" }}
              />
            </span>
          </label>

          {/* ...similar checkboxes for other previous conditions... */}

          <label>
            Height (in cm):
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </label>

          <label>
            Name of Sonologist:
            <input
              type="text"
              name="sonologistName"
              value={formData.sonologistName}
              onChange={handleChange}
            />
          </label>

          <label>
            Ultrasound Date:
            <input
              type="date"
              name="ultrasoundDate"
              value={formData.ultrasoundDate}
              onChange={handleChange}
            />
          </label>

          <label>
            BPD (mm):
            <input
              type="number"
              name="bpd"
              value={formData.bpd}
              onChange={handleChange}
            />
          </label>

          {/* ...similar inputs for other ultrasound details... */}

          <label>
            Date of Testing:
            <input
              type="date"
              name="dateOfTesting"
              value={formData.dateOfTesting}
              onChange={handleChange}
            />
          </label>

          <label>
            Immunoassay Analyzer:
            <input
              type="text"
              name="immunoassayAnalyzer"
              value={formData.immunoassayAnalyzer}
              onChange={handleChange}
            />
          </label>

          {/* ...similar inputs for test details like Free BHCG, PAPPA, etc. */}

          {/* The risk assessment fields can be select or text input depending on requirements */}

          <label>
            Final Assessment:
            <textarea
              name="finalAssessment"
              value={formData.finalAssessment}
              onChange={handleChange}
            />
          </label>
          <label>
            Referred By:
            <input
              type="text"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleChange}
            />
          </label>

          <label>
            Last Menstrual Period:
            <input
              type="text"
              name="lastMenstrualPeriod"
              value={formData.lastMenstrualPeriod}
              onChange={handleChange}
            />
          </label>

          <label>
            Gravida:
            <input
              type="text"
              name="gravida"
              value={formData.gravida}
              onChange={handleChange}
            />
          </label>

          <label>
            Number of Fetus:
            <input
              type="text"
              name="numberOfFetus"
              value={formData.numberOfFetus}
              onChange={handleChange}
            />
          </label>

          <label>
            Parity:
            <input
              type="text"
              name="parity"
              value={formData.parity}
              onChange={handleChange}
            />
          </label>

          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </label>

          <label>
            Diabetes:
            <input
              type="text"
              name="diabetes"
              value={formData.diabetes}
              onChange={handleChange}
            />
          </label>

          <label>
            Weight:
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </label>

          <label>
            HCG Injection Date:
            <input
              type="date"
              name="hcgInjectionDate"
              value={formData.hcgInjectionDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Ethnicity:
            <input
              type="text"
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleChange}
            />
          </label>

          <label>
            Gestational Age Biometrics:
            <input
              type="text"
              name="gestationalAgeBiometrics"
              value={formData.gestationalAgeBiometrics}
              onChange={handleChange}
            />
          </label>

          <label>
            Gestational Age USG:
            <input
              type="text"
              name="gestationalAgeUSG"
              value={formData.gestationalAgeUSG}
              onChange={handleChange}
            />
          </label>

          <label>
            Fetal Heart Rate:
            <input
              type="text"
              name="fetalHeartRate"
              value={formData.fetalHeartRate}
              onChange={handleChange}
            />
          </label>

          <label>
            CRL:
            <input
              type="text"
              name="crl"
              value={formData.crl}
              onChange={handleChange}
            />
          </label>

          <label>
            NT:
            <input
              type="text"
              name="nt"
              value={formData.nt}
              onChange={handleChange}
            />
          </label>

          <label>
            Free BHCG:
            <input
              type="text"
              name="freeBHCG"
              value={formData.freeBHCG}
              onChange={handleChange}
            />
          </label>

          <label>
            MoM BHCG:
            <input
              type="text"
              name="momBHCG"
              value={formData.momBHCG}
              onChange={handleChange}
            />
          </label>

          <label>
            PAPPA:
            <input
              type="text"
              name="pappa"
              value={formData.pappa}
              onChange={handleChange}
            />
          </label>

          <label>
            MoM PAPPA:
            <input
              type="text"
              name="momPappa"
              value={formData.momPappa}
              onChange={handleChange}
            />
          </label>

          <label>
            NT Value:
            <input
              type="text"
              name="ntValue"
              value={formData.ntValue}
              onChange={handleChange}
            />
          </label>

          <label>
            MoM NT:
            <input
              type="text"
              name="momNT"
              value={formData.momNT}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Submit Report</button>
        </form>
      </div>
    </>
  );
};

export default DualMarker;

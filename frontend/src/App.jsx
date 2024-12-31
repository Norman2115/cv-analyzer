import { useState } from "react";
import "./App.css";
import { Alert, Button, Container, Form, Row, Spinner } from "react-bootstrap";
import pdfToText from "react-pdftotext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { unified } from "unified";
import markdown from "remark-parse";
import docx from "remark-docx";
import { saveAs } from "file-saver";

const processor = unified().use(markdown).use(docx, { output: "blob" });

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const extractTextOnChange = async (event) => {
    setError("");
    const file = event.target.files[0];
    try {
      const extractedText = await pdfToText(file);
      setText(extractedText);
    } catch (error) {
      console.error(error);
      setError("An error occurred while extracting the text from the PDF");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!text) {
      setError("Please upload a PDF file");
      return;
    }

    if (!jobDescription) {
      setError("Please enter a job description");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://0.0.0.0:8000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cv_text: text,
          job_desc: jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("An error occurred while processing the PDF file");
      }

      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      setError("An error occurred while processing the PDF file");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (text) => {
    try {
      const doc = await processor.process(text);
      const blob = await doc.result;
      saveAs(blob, "cv_report.docx");
    } catch (error) {
      console.error(error);
    }
  };

  const reportContent = `### 📝 Summary\n${result?.cv_summary}\n### 💼 Work Experience\n${result?.work_experience}\n### ⭐️ Ratings\n${result?.ratings}\n### ✅ Matching Skills\n${result?.matching_skills}\n### ❌ Skills Not Match\n${result?.skills_not_match}\n### 🗒️ Final Report\n${result?.final_report}`;

  return (
    <div className="bg-dark" style={{ minHeight: "100vh" }}>
      <Container className="d-flex flex-column justify-content-center">
        <Row className="d-flex flex-column justify-content-center align-items-center mt-5">
          <h1 className="text-light text-center">
            Recruitment Helper: Your CV Analyzer
          </h1>
          <Form
            className="rounded bg-white d-flex flex-column mt-5 p-4"
            style={{ maxWidth: "800px", width: "100%" }}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload CV (PDF)</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={extractTextOnChange}
              />
            </Form.Group>
            <Form.Group controlId="formJobDescription" className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter job description here"
                value={jobDescription}
                onChange={(event) => {
                  setJobDescription(event.target.value);
                }}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Process CV"}
            </Button>
          </Form>
          <div
            className="rounded mt-5 p-4 bg-light"
            style={{ maxWidth: "800px", width: "100%" }}
          >
            {!loading && !result && (
              <Alert variant="info" className="mb-0 text-center">
                Upload a CV and enter a job description to get started
              </Alert>
            )}
            {loading && <Spinner animation="grow" />}
            {result && (
              <Markdown remarkPlugins={[remarkGfm]}>{reportContent}</Markdown>
            )}
          </div>
          {result && (
            <div style={{ maxWidth: "800px" }} className="p-0 mt-4 mb-5">
              <Button
                variant="outline-info"
                onClick={() => downloadReport(reportContent)}
              >
                Download Report as DOCX
              </Button>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;

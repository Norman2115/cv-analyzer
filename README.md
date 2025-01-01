# CV Analyzer
## Description
This project is a simple CV analysis web tool. The backend uses FastAPI to process CVs by interacting with JamAI Base. JamAI Base is a powerful platform for AI-powered applications. This integration allows for CV analysis using AI without the need for managing complex AI infrastructure. The frontend, built with React, is responsible for receiving CV/Resume and job description as inputs and displaying the analysis results.

## Technology and Libraries
### Frontend (React)
* bootstrap 5.3.3
* react-bootstrap 2.10.7
* file-saver 2.0.5
* react-icons 5.4.0
* react-markdown 9.0.1
* react-pdftotext 1.3.4
* remark-docx 0.1.6
* remark-gfm 4.0.0
* remark-parse 11.0.0
* unified 11.0.5

### Backend (Python)
* fastapi 0.115.6
* fastapi-utils 0.8.0
* uvicorn 0.34.0
* jamaibase 0.3.0
* pydantic 2.10.4
* python-dotenv 1.0.1

## Features
### Upload CV and Job Description
* Upload your CV or resume in supported formats (PDF) and job description for analysis.

<img width="1512" alt="Screenshot 2024-12-31 at 10 28 44 PM" src="https://github.com/user-attachments/assets/16e4fd7e-68ef-4f29-89a9-d078e8c3fa96" />

---

### Instant CV Summary
* Receive a concise summary of the candidate's qualifications and experience immediately after processing.

<img width="1509" alt="Screenshot 2024-12-31 at 10 27 23 PM" src="https://github.com/user-attachments/assets/3a34988a-e72f-46ff-931a-8b49a384ae6a" />

---

### Skills & Experience Assessment
* View a comprehensive evaluation of the candidate's resume and work experience.

<img width="1510" alt="Screenshot 2024-12-31 at 10 27 58 PM" src="https://github.com/user-attachments/assets/3fc01ee2-91bf-4066-a40a-f0379fbff38f" />

---

### Skill Matching
* Show both skills identified in the CV that match the job description.
* Show skills identified in the CV that do not directly align with the job requirements.

<img width="1512" alt="Screenshot 2024-12-31 at 10 28 20 PM" src="https://github.com/user-attachments/assets/0753fa05-d888-478d-9636-0c4c0ec3e0e6" />

---

### Final Report & Download
* Receive a final report summarizing the analysis findings, including an overall suitability assessment for the job.
* Download the complete analysis report as a DOCX file for future reference or sharing.

<img width="1512" alt="Screenshot 2024-12-31 at 10 28 30 PM" src="https://github.com/user-attachments/assets/def49983-397a-4b06-9c7f-a88f826f3d1b" />

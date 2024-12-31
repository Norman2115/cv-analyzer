from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from jamaibase import JamAI, protocol as p
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)

load_dotenv()

jamai_token = os.getenv("JAMAI_TOKEN")
jamai_project_id = os.getenv("JAMAI_PROJECT_ID")

jamai = JamAI(token=jamai_token, project_id=jamai_project_id)

@app.get("/")
def read_root():
    # Test if the API is working
    return {"Hello": "World"}

@app.get("/get")
def get_data():
    rows = jamai.table.list_table_rows("action", "cv_analyze")
    row = rows.items[0]
    cv_summary = row["cv_summary"]["value"]
    return {"cv_summary": cv_summary}

class Result(BaseModel):
    cv_summary: str
    work_experience: str
    ratings: str
    matching_skills: str
    skills_not_match: str
    final_report: str

@app.post("/add")
def add_row(cv_text: str = Body(...), job_desc: str = Body(...)):
    
    completion = jamai.table.add_table_rows(
        "action",
        p.RowAddRequest(
            table_id="cv_analyze",
            data=[dict(cv_text=cv_text, job_desc=job_desc)],
            stream=False,
        ),
    )

    return Result(
        cv_summary=completion.rows[0].columns["cv_summary"].text,
        work_experience=completion.rows[0].columns["work_experience"].text,
        ratings=completion.rows[0].columns["ratings"].text,
        matching_skills=completion.rows[0].columns["matching_skills"].text,
        skills_not_match=completion.rows[0].columns["skills_not_match"].text,
        final_report=completion.rows[0].columns["final_report"].text
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from FastAPI on Render!"}

@app.post("/submit")
def submit(data: dict):
    return {"received": data}

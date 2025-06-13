from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"message": "Healthy"}


# Models
class CalculationRequest(BaseModel):
    operand1: float
    operand2: float
    operator: str


# PUBLIC_INTERFACE
@app.post("/calculate")
async def calculate(req: CalculationRequest):
    """
    PUBLIC_INTERFACE
    POST /calculate endpoint.
    Accepts JSON body: { operand1: float, operand2: float, operator: string }
    Returns result for basic +, -, *, / operations.
    """
    op = req.operator
    a = req.operand1
    b = req.operand2

    if op == "+":
        result = a + b
    elif op == "-":
        result = a - b
    elif op == "*":
        result = a * b
    elif op == "/":
        if b == 0:
            return {"error": "Cannot divide by zero"}
        result = a / b
    else:
        return {"error": f"Unsupported operator: {op}"}
    # Optionally round float
    if isinstance(result, float):
        # Only round if not integer
        if result == int(result):
            result = int(result)
        else:
            result = round(result, 8)
    return {"result": result}

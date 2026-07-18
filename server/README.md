# BlogGPT Backend (FastAPI + uv)

This folder contains a uv-based FastAPI server that replicates the CrewAI multi-agent workflow from `crew.ipynb`. It exposes a single endpoint used by the Next.js client without requiring frontend changes.

- Endpoint: `POST /generate-blog/`
- Port: `8002` (matches the existing frontend action)
- CORS: allows `http://localhost:3000` and `http://127.0.0.1:3000`

## Requirements
- Python 3.10 through 3.13 (Python 3.14 is not supported by CrewAI)
- `uv` installed (Rust-based Python package manager)
- API keys in environment:
  - `GOOGLE_API_KEY`
  - `SERPER_API_KEY` (optional when `SEARCH_PROVIDER=auto` or `SEARCH_PROVIDER=gemini`)

Create a `.env` file in this `server/` directory:

```
GOOGLE_API_KEY=your_google_api_key
SERPER_API_KEY=your_serper_api_key
SEARCH_PROVIDER=auto
```

Search provider modes:

- `auto`: try Serper first, then fall back to Gemini Google Search grounding
- `serper`: only use Serper; requires `SERPER_API_KEY`
- `gemini`: only use Gemini Google Search grounding

## Install and Run (one command)
From the `server/` directory:

```
uv run uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload
```

- uv will resolve and install dependencies from `pyproject.toml` automatically
- The API will be available at `http://127.0.0.1:8002`

## Install with pip on Windows

From the project root, create a Python 3.13 virtual environment and install the dependencies:

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r server\requirements.txt
```

Then start the backend:

```powershell
Set-Location server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload
```

## Endpoint
- `POST /generate-blog/`
  - Body: `{ "topic": "Agentic AI" }`
  - Response: `{ "topic": "Agentic AI", "blog": { "raw": "<markdown>" } }`

## Notes
- The server initializes the Crew (Planner, Writer, Editor) at startup for lower latency.
- Image generation (DALL·E) is not included at the moment, mirroring only the utilized parts of the notebook.

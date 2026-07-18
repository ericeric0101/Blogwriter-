
# Multi-Agent Blog Writing System - Crew AI

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)

## 🚀 Overview

![multi agent blog writer.png](<multi agent blog writer.png>)

The **Multi-Agent Blog Writing System (Crew AI)** is an innovative project that utilizes cutting-edge technologies to automate the process of creating well-researched, human-like blogs. This system is designed to bridge the gap between AI automation and human creativity by incorporating the latest advancements in **Agentic AI**.

This project features a **multi-agent architecture** that autonomously plans, writes, and edits blog posts, ensuring they are accurate, engaging, and up-to-date with the latest trends.


https://github.com/user-attachments/assets/9475289e-5e7a-4cc3-99c9-6ca01b7fb11a

---

## 📁 Project Structure

```
multi-agent/
│
├── client/
│   └── bloggpt/          # Next.js frontend for blog generation
│       ├── pages/        # Next.js pages
│       ├── components/   # Reusable React components
│       ├── actions/      # API calls to the FastAPI backend
│       ├── tailwind.config.js
│       ├── package.json
│       └── ...
│
│── crewai.ipynb      # Jupyter Notebook with FastAPI server and AI logic
│── requirements.txt  # Python dependencies
│── ...
```

---

## 🌟 Features

- **Planner Agent**: Structures and strategizes blog content based on the input query.
- **Writer Agent**: Generates blog content using the configured Gemini LLM.
- **Editor Agent**: Refines the content for clarity, engagement, and accuracy.
- **Web Search**: Uses Serper when available, with Gemini Google Search grounding as a fallback.
- **FastAPI Backend**: Handles blog generation requests.
- **Next.js Frontend**: Provides a sleek user interface for input and blog display.
- **End-to-End Automation**: Delivers a complete, polished blog with references.

---

## ⚙️ Technologies Used

### Backend
- **CREW AI**: For Creating multi agent system.
- **FastAPI**: For serving the AI-powered blog generation API.
- **Python**: For scripting and implementation.
- **LangChain**: For managing multi-agent workflows.
- **Gemini**: As the language model powering the system.
- **Serper and Gemini Google Search**: To gather real-time data and trends.

### Frontend
- **Next.js**: For building the client-side application.
- **React**: For creating dynamic UI components.
- **Tailwind CSS**: For styling.
- **Shadcn  UI**: Components.

---

## 🛠 Installation

### Backend Setup (FastAPI Server) on macOS
1. Install Python 3.13. CrewAI does not support Python 3.14. From Terminal, create and activate the virtual environment:

   ```zsh
   cd ~/Blogwriter-
   python3.13 -m venv .venv
   source .venv/bin/activate
   python -m pip install --upgrade pip
   python -m pip install -r server/requirements.txt
   ```

2. Create `server/.env` and add your API keys:

   ```zsh
   nano server/.env
   ```

   ```dotenv
   GOOGLE_API_KEY=your_google_api_key
   SERPER_API_KEY=your_serper_api_key
   SEARCH_PROVIDER=auto
   ```

   `SEARCH_PROVIDER=auto` tries Serper first, then uses Gemini Google Search grounding if Serper is unavailable. Set it to `gemini` to use only Gemini search, or `serper` to require Serper.

3. Start the backend from the `server` directory:

   ```zsh
   cd ~/Blogwriter-/server
   source ../.venv/bin/activate
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload
   ```

   - **Server URL**: `http://127.0.0.1:8002`

### Backend Setup on Windows

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r server\requirements.txt
Set-Location server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload
```

---

### Frontend Setup (Next.js) on macOS

Keep the backend running, then open a second Terminal window and run:

```zsh
cd ~/Blogwriter-/client/bloggpt
npm install
npm run dev
```

- **Frontend URL**: `http://localhost:3000`

---

## 🧠 How It Works

1. **User Input**: The user enters a topic through the Next.js frontend.
2. **API Request**: The frontend sends a POST request to the FastAPI server running at `http://127.0.0.1:8002/generate-blog/`.
3. **Blog Generation**:
   - The FastAPI server processes the request using `crewai.ipynb`.
   - The AI agents (Planner, Writer, Editor) collaboratively generate a polished blog.
4. **Response**: The FastAPI server returns the generated blog in Markdown format.
5. **Frontend Rendering**:
   - The blog is rendered using `ReactMarkdown` with proper Markdown styling.

---

## 🎯 Use Cases

- **Content Marketing**: Automate blog creation for businesses and brands.
- **Research Documentation**: Generate research summaries or articles with minimal effort.
- **Trend Analysis**: Create content based on the latest trends in various domains.

---

## 📝 Future Enhancements

- **Multi-modal Capabilities**: Incorporate image and video generation.
- **Advanced Customization**: Enable user-specific writing styles.
- **Workflow Orchestration**: Add support for managing multiple blogs simultaneously.

---

## 🌐 Contact

For questions or collaboration, feel free to connect:

- **Author**: Abdul Basit
- **GitHub**: [Abdulbasit110](https://github.com/Abdulbasit110)
- **LinkedIn**: [Abdul Basit](https://www.linkedin.com/in/abdul-basit-231204255/)

---

**Elevating AI creativity—one blog at a time! 🌟**

--- 

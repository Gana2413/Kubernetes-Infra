# K8sGPT + Ollama Integration Project

## 📘 Overview

This project integrates **K8sGPT** (Kubernetes GPT Diagnostic Tool) with **Ollama AI** to analyze and explain issues in a Kubernetes cluster using natural language understanding.

The goal of this project is to automatically identify and explain Kubernetes issues such as pod crashes, configuration errors, and API deprecations using a locally running AI model.

---

## 🚀 Tools & Technologies Used

| Tool                         | Purpose                                            |
| ---------------------------- | -------------------------------------------------- |
| **K8sGPT**                   | AI-driven Kubernetes diagnostic tool               |
| **Ollama**                   | Local AI model runner (used as LLM backend)        |
| **Kubernetes**               | Container orchestration system                     |
| **Kubectl**                  | Command-line tool for managing Kubernetes clusters |
| **Docker**                   | For container management and local testing         |
| **VS Code + Dev Containers** | Development environment                            |

---

## ⚙️ Setup Steps

### 1️⃣ Install K8sGPT

```bash
brew install k8sgpt-ai/tap/k8sgpt   # For macOS
# OR
curl -s https://raw.githubusercontent.com/k8sgpt-ai/k8sgpt/main/install.sh | bash
```

### 2️⃣ Install and Run Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama serve &   # Start Ollama server
```

### 3️⃣ Pull an Ollama Model

```bash
ollama pull phi3:mini
```

### 4️⃣ Verify Ollama API is Working

```bash
curl -X POST http://127.0.0.1:11434/api/generate -d '{
  "model": "phi3:mini",
  "prompt": "Hello",
  "stream": false
}'
```

If this returns a response (e.g., `Hello!`), Ollama is running fine.

### 5️⃣ Connect K8sGPT with Ollama

```bash
k8sgpt auth add --provider ollama --baseurl http://127.0.0.1:11434/api/generate
```

### 6️⃣ Analyze the Cluster

```bash
k8sgpt analyze cluster --explain
```

---

## ❌ Issues Faced & 🔧 Solutions

| Issue                                  | Cause                                 | Solution                                                        |
| -------------------------------------- | ------------------------------------- | --------------------------------------------------------------- |
| **Error: connect: connection refused** | Ollama not running                    | Start Ollama using `ollama serve &`                             |
| **No response from model**             | Model not pulled or API misconfigured | Run `ollama pull phi3:mini` and recheck base URL                |
| **Deprecated API warnings**            | Kubernetes version > 1.33             | Replace `v1 Endpoints` with `discovery.k8s.io/v1 EndpointSlice` |

---

## 🧠 Flowchart

```mermaid
graph TD
    A[Start] --> B[Install K8sGPT]
    B --> C[Install Ollama]
    C --> D[Pull Model (phi3:mini)]
    D --> E[Run Ollama Server]
    E --> F[Verify API Connection]
    F --> G[Authenticate Ollama in K8sGPT]
    G --> H[Run k8sgpt analyze cluster]
    H --> I{AI Connected?}
    I -- Yes --> J[Analyze & Explain Cluster Issues]
    I -- No --> K[Troubleshoot Connection (Restart Ollama)]
    J --> L[Success ✅]
    K --> E
```

---

## 🧩 Example Output

```bash
W1014 08:08:01.860981    6904 warnings.go:70] v1 Endpoints is deprecated in v1.33+; use discovery.k8s.io/v1 EndpointSlice
Error: failed while calling AI provider ollama: connect: connection refused
```

✅ **Fix:** Start Ollama using `ollama serve &` and rerun the command.

---

## 📄 Summary

* Integrated **K8sGPT** with **Ollama** for local AI-powered Kubernetes analysis.
* Faced connection issues (`dial tcp 127.0.0.1:11434: connect refused`).
* Solved by starting Ollama service and verifying API endpoint.
* Successfully analyzed Kubernetes cluster and received AI-generated explanations for issues.

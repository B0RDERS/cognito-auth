# AWS Cognito FastAPI Backend Setup
## 1. Environment Configuration File
```bash
cp .env.example .env
```
Open the `.env` file and fill in your AWS Cognito and other necessary credentials.
## 2. Set up environment
```bash
conda create -n cognito-auth python=3.11 -y
conda activate cognito-auth
pip install -r requirements.txt
```
## 3. Run the Application
```bash
python main.py
```

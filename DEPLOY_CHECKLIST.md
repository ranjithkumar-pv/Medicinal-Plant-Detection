# Pre-Deployment Checklist

Run this checklist before deploying to Render to ensure all required files are in place.

## ✅ Required Files Checklist

- [ ] **app.py** - Flask application
  ```bash
  # Verify size and content
  ls -lh app.py
  ```

- [ ] **requirements.txt** - Dependencies
  ```bash
  cat requirements.txt
  # Should include: Flask, tensorflow, gunicorn, numpy, Pillow, keras
  ```

- [ ] **runtime.txt** - Python version
  ```bash
  cat runtime.txt
  # Should contain: python-3.11.6
  ```

- [ ] **Procfile** - Deployment config
  ```bash
  cat Procfile
  # Should contain: web: gunicorn app:app
  ```

- [ ] **plant_data.py** - Plant database
  ```bash
  ls -lh plant_data.py
  ```

- [ ] **Model_Mobilenet.h5** - ML model (~500MB)
  ```bash
  ls -lh Model_Mobilenet.h5
  # Should be large file (350-500MB)
  ```

- [ ] **templates/index.html** - Main UI
  ```bash
  ls -lh templates/
  ```

- [ ] **templates/style.css** - Styling
  ```bash
  ls -lh templates/style.css
  ```

- [ ] **templates/script.js** - Frontend logic
  ```bash
  ls -lh templates/script.js
  ```

- [ ] **static/** - Static assets
  ```bash
  ls -lh static/
  # Should contain plant images and assets
  ```

- [ ] **.gitignore** - Git exclusions
  ```bash
  ls -lh .gitignore
  ```

## 🔍 Git Status Check

```bash
# See what will be pushed
git status

# Expected: Clean working tree or only modified files ready to commit
# All required files should be tracked

# Check file sizes
git ls-files -s | sort -k4 -rn | head -20
```

## 📦 Dependencies Verification

```bash
# Verify all dependencies are listed
pip freeze > current_requirements.txt
cat requirements.txt

# Check that these are included:
# - Flask==3.1.2
# - tensorflow==2.13.0
# - numpy==1.24.3
# - Pillow==11.3.0
# - gunicorn==21.2.0
# - keras==2.13.1
```

## 🧪 Local Test Before Deployment

```bash
# 1. Create fresh virtual environment
python -m venv test_env
source test_env/bin/activate  # Windows: test_env\Scripts\activate

# 2. Install from requirements.txt
pip install -r requirements.txt

# 3. Run app locally
python app.py

# 4. Test on http://localhost:5000
# - Open browser
# - Upload/capture test image
# - Verify identification works
# - Test download report

# 5. Deactivate when done
deactivate
```

## 📤 Pre-Push Checklist

```bash
# 1. Add all files
git add .

# 2. Check what will be committed
git status

# 3. Commit with message
git commit -m "Ready for Render deployment"

# 4. Verify remote is set
git remote -v
# Should show: origin https://github.com/YOUR_USERNAME/Medicinal-Plant-Detection.git

# 5. Push to GitHub
git push origin main
```

## 🚀 Final Render Deployment Steps

### Step 1: Verify on GitHub
- [ ] Go to your GitHub repository
- [ ] Verify all files are there
- [ ] Verify Model_Mobilenet.h5 is uploaded (not blocked by size)

### Step 2: Create Render Service
- [ ] Go to render.com
- [ ] Click "New Web Service"
- [ ] Connect GitHub repo
- [ ] Configure:
  - Name: medicinal-plant-detector
  - Region: Select closest region
  - Branch: main
  - Runtime: Python 3
  - Build: `pip install -r requirements.txt`
  - Start: `gunicorn app:app`

### Step 3: Environment Variables
- [ ] Add `FLASK_ENV` = `production`
- [ ] Add `PYTHONUNBUFFERED` = `1`

### Step 4: Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build (10-15 minutes)
- [ ] Check logs for errors

### Step 5: Verify Deployment
- [ ] Get live URL from Render
- [ ] Test upload functionality
- [ ] Test camera functionality
- [ ] Verify plant identification
- [ ] Test report download

## ⚠️ Common Issues & Fixes

| Issue | Check | Fix |
|-------|-------|-----|
| Build fails | runtime.txt | Ensure `python-3.11.6` exists |
| Start fails | Procfile | Ensure `web: gunicorn app:app` |
| Model not found | Git tracking | `git add Model_Mobilenet.h5` |
| Slow build | File size | Remove unnecessary files |
| 404 on start | app.py | Check gunicorn start command |

## 📊 File Size Reference

Expected file sizes:

```
Model_Mobilenet.h5:    ~500 MB
app.py:                ~2 KB
requirements.txt:      ~100 B
runtime.txt:           ~15 B
plant_data.py:         ~5-10 KB
templates/index.html:  ~50 KB
templates/style.css:   ~20 KB
templates/script.js:   ~30 KB
static/:               Variable (50 KB - 1 MB)
```

## ✨ Post-Deployment

- [ ] Save your Render URL
- [ ] Share with users
- [ ] Monitor logs for errors
- [ ] Set up auto-redeploy on GitHub push
- [ ] Monitor resource usage

---

**Ready to deploy?** Follow these steps in order and everything should work perfectly!

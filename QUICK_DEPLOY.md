# Quick Deployment Commands

Copy-paste these commands in sequence to deploy to Render.

## 1️⃣ Prepare Your Project

```bash
# Navigate to project directory
cd "d:\Git proj\Med Plant\Medicinal-Plant-Detection"

# Check git status
git status

# Add all files (excluding .gitignore items)
git add .

# Commit with deployment message
git commit -m "Prepare for Render deployment - production ready"

# Push to GitHub
git push origin main
```

## 2️⃣ Verify GitHub Upload

```bash
# Check that large files are uploaded
# Visit: https://github.com/YOUR_USERNAME/Medicinal-Plant-Detection
# Verify you can see:
# - app.py
# - Model_Mobilenet.h5 (should show file size)
# - requirements.txt
# - runtime.txt
# - Procfile
# - templates/ folder
# - static/ folder
```

## 3️⃣ Deploy on Render

1. **Open Render Dashboard**
   - Go to: https://render.com/dashboard

2. **Create New Web Service**
   - Click: **New** → **Web Service**

3. **Connect GitHub**
   - Click: **Connect account**
   - Select: **Medicinal-Plant-Detection** repo
   - Click: **Connect**

4. **Configure Service**
   ```
   Name:              medicinal-plant-detector
   Region:            Select your region
   Branch:            main
   Runtime:           Python 3
   Build Command:     pip install -r requirements.txt
   Start Command:     gunicorn app:app
   ```

5. **Add Environment Variables**
   - Click: **Advanced**
   - **Add Environment Variable**
     - Key: `FLASK_ENV`
     - Value: `production`
   - **Add Environment Variable**
     - Key: `PYTHONUNBUFFERED`
     - Value: `1`

6. **Deploy**
   - Click: **Create Web Service**
   - Wait 10-15 minutes
   - Monitor logs

## 4️⃣ After Deployment

```bash
# Get your live URL from Render (e.g., https://medicinal-plant-detector.onrender.com)

# Test the app in browser
# 1. Upload test image
# 2. Capture with camera
# 3. Click "Identify Plant"
# 4. Verify results show
# 5. Test download report

# Share your live URL
Your App URL: https://your-service-name.onrender.com
```

## 5️⃣ Future Updates

```bash
# Make code changes locally
# Edit files as needed

# Commit and push
git add .
git commit -m "Update: describe your changes"
git push origin main

# Render automatically redeploys
# Check logs on Render dashboard
```

## 🆘 If Build Fails

```bash
# Check Render logs for error message
# Common issues:

# 1. runtime.txt missing or wrong
cat runtime.txt
# Should show: python-3.11.6

# 2. Procfile missing or wrong
cat Procfile
# Should show: web: gunicorn app:app

# 3. requirements.txt incomplete
cat requirements.txt
# Should include Flask, tensorflow, gunicorn, etc.

# 4. Model file too large or not tracked
ls -lh Model_Mobilenet.h5
# If not showing, run:
git add Model_Mobilenet.h5
git commit -m "Add model file"
git push origin main
```

## 📊 File Upload Reference

Before pushing, verify:

```bash
# Check all files are tracked
git ls-files | grep -E "(app.py|requirements.txt|Procfile|runtime.txt|plant_data.py)"

# Check model is tracked
git ls-files | grep "Model_Mobilenet.h5"

# Check templates folder
git ls-files | grep "templates/"

# Check static folder
git ls-files | grep "static/"
```

## 🎯 Success Indicators

You'll know deployment succeeded when:

✅ Build logs show: "Build succeeded"
✅ App URL accessible: https://your-service-name.onrender.com
✅ Page loads without 404
✅ Upload button works
✅ Results display after identify
✅ Download report works

## 🔍 Monitoring After Deployment

```bash
# Render Logs
# Dashboard → Your Service → Logs

# Look for:
- "Running on http://0.0.0.0:10000" = Server started ✅
- Errors like:
  - "ModuleNotFoundError" = Missing dependency
  - "FileNotFoundError" = Missing file
  - "OutOfMemory" = Need paid plan

# Common log entries:
- "POST /predict" = Plant identification request
- "GET /" = Home page load
- "Failed to load image" = Invalid upload
```

## 💡 Pro Tips

1. **Free tier** works but may be slow (cold starts)
   - If slow, upgrade to **Starter** plan ($7/month)

2. **Large files** like Model_Mobilenet.h5:
   - GitHub has 100MB push limit
   - If fails, contact Render support
   - Or use Git LFS (Large File Storage)

3. **First deployment** is slower
   - Takes 10-15 minutes (TensorFlow download)
   - Subsequent deploys are faster (5-10 min)

4. **Auto-redeploy** on GitHub push
   - Just push and wait
   - No manual redeploy needed

## 📱 Share Your App

Once live, share:

```
Check out my Medicinal Plant Detector! 🌿
https://your-service-name.onrender.com

Upload or capture a plant image to identify it and learn about its medicinal properties!
```

---

**Need help?** Check DEPLOY.md for detailed troubleshooting.

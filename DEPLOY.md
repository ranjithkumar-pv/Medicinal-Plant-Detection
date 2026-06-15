# Render Deployment Guide

Complete step-by-step guide to deploy the Medicinal Plant Detection System on Render.com

## 📋 Prerequisites

1. **GitHub Account**: Your project must be pushed to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Project Files**: All files properly committed and pushed to GitHub

## 🔑 Important Files for Deployment

Your project should have these files configured:

```
✅ runtime.txt          → python-3.11.6
✅ Procfile             → web: gunicorn app:app
✅ requirements.txt     → All Python dependencies
✅ app.py              → Flask application (production-ready)
✅ Model_Mobilenet.h5  → Pre-trained model
✅ templates/          → HTML/CSS/JS files
✅ static/             → Static assets & plant images
```

## 📤 Step 1: Push Your Project to GitHub

If not already done:

```bash
cd "d:\Git proj\Med Plant\Medicinal-Plant-Detection"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for Render deployment"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/Medicinal-Plant-Detection.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🚀 Step 2: Create Render Web Service

### 2.1 Sign In to Render
1. Go to [render.com](https://render.com)
2. Click **Sign up** or **Sign in** with GitHub
3. Authorize Render to access your GitHub repositories

### 2.2 Create New Web Service
1. Click **New** → **Web Service**
2. Connect your GitHub repository:
   - Search for `Medicinal-Plant-Detection`
   - Click **Connect**

### 2.3 Configure Build Settings

Fill in the form with these values:

| Field | Value |
|-------|-------|
| **Name** | medicinal-plant-detector (or your preferred name) |
| **Region** | Select closest to your users |
| **Branch** | main |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app` |

**⚠️ Important**: Render will automatically detect `runtime.txt` and use Python 3.11.6. If it uses 3.14.3 instead, see the "Build fails - No matching distribution" troubleshooting below.

### 2.4 Configure Environment

**Free Plan or Paid Plan?**
- Choose based on your needs (Free has limitations)

**Environment Variables**
- Click **Advanced** → **Add Environment Variable**
- Add these variables:

```
Key: FLASK_ENV
Value: production

Key: PYTHONUNBUFFERED
Value: 1
```

### 2.5 Review & Deploy

- Scroll to bottom
- Click **Create Web Service**
- Render will start building automatically

## ⏳ Step 3: Monitor Deployment

1. **Build Phase**: Watch the build logs
   - Takes 10-15 minutes first time (TensorFlow is large)
   - You'll see messages like:
     ```
     Building Python project...
     Installing dependencies...
     Collecting tensorflow==2.13.0...
     ```

2. **If Build Succeeds** ✅
   - You'll see "Build succeeded"
   - Service will be deployed
   - Get your live URL: `https://your-service-name.onrender.com`

3. **If Build Fails** ❌
   - Check the error logs
   - Common issues:
     - Missing `runtime.txt` → Ensure it exists with `python-3.11.6`
     - Missing `Procfile` → Ensure it has `web: gunicorn app:app`
     - Memory limit → See "Troubleshooting" section

## 🧪 Step 4: Test Your Deployment

Once deployed successfully:

1. Visit your Render URL
2. Test the upload functionality
3. Test the camera (if available on your device)
4. Verify plant identification works
5. Test report download

## 🔍 Step 5: Monitor & Manage

### View Logs
- Click your service on Render dashboard
- Go to **Logs** tab
- See real-time application logs

### Redeploy
- Make changes locally
- `git add .` → `git commit -m "Update"` → `git push`
- Render auto-redeploys on push

### Update Environment
- Dashboard → **Environment**
- Add/modify variables as needed
- Changes take effect on next deploy

## 🆘 Troubleshooting

### Issue: Build fails - "No matching distribution found for tensorflow==2.13.0"
**Solution**: Python version mismatch (Render using 3.14.3 instead of 3.11.6)

**Steps to fix:**
1. Ensure `runtime.txt` contains exactly: `python-3.11.6`
2. Push to GitHub:
   ```bash
   git add runtime.txt
   git commit -m "Fix Python version to 3.11.6"
   git push origin main
   ```
3. **Delete the failed service on Render**:
   - Go to Render dashboard
   - Click your service
   - Scroll to bottom → **Delete Service**
   - Confirm deletion
4. **Create a new Web Service** (clean deploy):
   - Follow Step 2.2-2.5 above
   - This time Render will respect `runtime.txt`
5. Build should now succeed ✅

**Why this happens**: Sometimes Render caches build info. Deleting and redeploying clears the cache.

### Issue: Build fails with "Out of memory"
**Solution**: TensorFlow is large (~500MB)
- Use Render Paid tier for more RAM
- Or optimize model size locally

### Issue: "Port already in use"
**Solution**: Already handled in app.py
- Uses `PORT` environment variable from Render

### Issue: "Model file not found"
**Solution**: Ensure `Model_Mobilenet.h5` is committed to Git
```bash
git add Model_Mobilenet.h5
git commit -m "Add model file"
git push
```

### Issue: Static files or plant images not loading
**Solution**: Ensure `/static/` folder is committed with files
```bash
git add static/
git commit -m "Add static files"
git push
```

### Issue: "No module named 'plant_data'"
**Solution**: Ensure `plant_data.py` exists and is committed
```bash
git add plant_data.py
git commit -m "Add plant data"
git push
```

### Issue: Application runs but no results display
**Solution**: 
- Check browser console for errors (F12 → Console)
- Check Render logs for Python errors
- Verify `/static/plant_images/` contains reference images

### View Logs for Debugging
```bash
# In Render dashboard:
1. Select your service
2. Click "Logs" tab
3. Look for error messages
4. Common patterns to search:
   - "Error" → Shows failures
   - "Traceback" → Python errors
   - "404" → Missing files
```

## 🔒 Production Considerations

### Security Checklist
- [ ] Flask debug mode is OFF (set in app.py)
- [ ] Environment variables configured
- [ ] CORS properly configured if needed
- [ ] Input validation in place
- [ ] File upload size limits enforced

### Performance Tips
- [ ] Use Render's paid plan for better performance
- [ ] Consider image optimization
- [ ] Monitor response times in logs
- [ ] Cache static files with CDN (optional)

### Cost Optimization
- **Free Tier**: 
  - Good for testing/development
  - Spins down after 15 min inactivity
  - Limited to 0.5 GB RAM
  - ⚠️ May timeout with TensorFlow

- **Starter Plan** ($7/month):
  - Always running
  - 1 GB RAM (recommended for this app)
  - Better reliability

- **Standard Plan** ($12/month):
  - 2 GB RAM
  - Auto-scaling available

## 📈 Scaling (Future)

If your app grows:

1. **Database**: Add Render PostgreSQL
2. **Caching**: Add Redis for session management
3. **CDN**: Enable Render's built-in CDN
4. **Auto-scaling**: Available on paid plans

## 🔄 Continuous Updates

To update your deployed app:

```bash
# Make changes locally
# Test thoroughly

# Commit and push
git add .
git commit -m "Descriptive message"
git push origin main

# Render automatically redeploys
# Check logs to confirm deployment
```

## 📞 Support & Resources

- **Render Docs**: https://render.com/docs
- **Flask Deployment**: https://flask.palletsprojects.com/deployment/
- **TensorFlow Serving**: https://www.tensorflow.org/tfx/serving
- **GitHub**: https://docs.github.com/en/get-started

## ✅ Deployment Checklist

Before going live, verify:

- [ ] **`runtime.txt` contains exactly `python-3.11.6`** ⚠️ Critical!
- [ ] All files pushed to GitHub
- [ ] `Procfile` contains `web: gunicorn app:app`
- [ ] `requirements.txt` updated and committed
- [ ] `Model_Mobilenet.h5` in repository
- [ ] `/templates/` folder with all HTML files
- [ ] `/static/` folder with CSS, JS, and images
- [ ] `app.py` production-ready (debug=False)
- [ ] Environment variables configured on Render:
  - [ ] `FLASK_ENV` = `production`
  - [ ] `PYTHONUNBUFFERED` = `1`
- [ ] Build completes successfully
- [ ] App loads on live URL
- [ ] Upload/Camera functionality works
- [ ] Results display correctly
- [ ] Report download works

## 🎉 Success!

Once deployed, your app is live! Share the URL:
```
https://your-service-name.onrender.com
```

## 📝 Notes

- First deployment takes longer (downloading dependencies)
- Subsequent deployments are faster (cache)
- Free tier may experience cold starts (5-30 second delay)
- Paid tier = no cold starts

---

**Questions?** Check Render's support or GitHub issues.

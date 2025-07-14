# 🚨 Coinbase 500 Error Debug & Fix

## 🎯 **Problem**
**Error**: "Failed to create Coinbase charge" + 500 status  
**Location**: `/api/coinbase/create-charge`

## 🔍 **Debugging Steps Added**

### **1. Enhanced Error Logging**
Added detailed console logging to see:
- ✅ API key presence and preview
- ✅ Request data being sent
- ✅ Coinbase API response details
- ✅ Specific error messages

### **2. Debug Endpoint Created**
**New endpoint**: `/api/coinbase/debug`
- Check if `COINBASE_API_KEY` environment variable is set
- Show API key preview (first 8 characters)
- Verify environment configuration

## 🚨 **Most Likely Causes**

### **1. Environment Variable Not Set**
```bash
# Check in Netlify Environment Variables:
COINBASE_API_KEY = your-actual-api-key
```

### **2. Invalid API Key**
- Using test key instead of live key
- API key from wrong Coinbase Commerce account  
- API key doesn't have correct permissions

### **3. API Request Format**
- Coinbase Commerce expecting different data format
- Authentication header issue

## 🛠️ **Immediate Debug Steps**

### **Step 1: Deploy Enhanced Logging**
```bash
git add .
git commit -m "debug: Enhanced Coinbase error logging + debug endpoint"
git push origin main
```

### **Step 2: Check Environment Variables**
After deploy, visit: `https://theblockchain.ai/api/coinbase/debug`
Should show:
```json
{
  "hasApiKey": true,
  "keyPreview": "abcd1234...",
  "keyLength": 32,
  "environment": "production"
}
```

### **Step 3: Test Crypto Payment Again**
- Try $0.50 crypto payment
- Check browser console for detailed error logs
- Check Netlify function logs for server-side errors

### **Step 4: Verify API Key**
- Go to Coinbase Commerce dashboard
- Settings > API Keys
- Confirm the key you're using is:
  - ✅ Active/enabled
  - ✅ Has correct permissions (charges, checkouts)
  - ✅ From correct account (developer account you set up)

## 🎯 **Expected Debug Output**

### **If API Key Missing:**
```
Console: "COINBASE_API_KEY not found in environment variables"
```

### **If API Key Invalid:**
```
Coinbase response: {
  "error": {
    "type": "authentication_error",
    "message": "invalid api key"
  }
}
```

### **If Request Format Wrong:**
```
Coinbase response: {
  "error": {
    "type": "validation_error", 
    "message": "specific field error"
  }
}
```

## ✅ **Next Steps Based on Debug Results**

### **If Environment Variable Missing:**
1. Double-check Netlify environment variables
2. Ensure `COINBASE_API_KEY` is exactly spelled correctly
3. Re-deploy after fixing environment variable

### **If API Key Invalid:**
1. Go back to Coinbase Commerce
2. Generate new API key
3. Update Netlify environment variable
4. Test again

### **If Request Format Error:**
1. Check Coinbase Commerce API documentation
2. Compare request format with their examples
3. Adjust request structure as needed

---

**Deploy the enhanced logging first, then we can see exactly what's causing the 500 error!**

**Created**: July 14, 2025  
**Status**: Debug logging added - ready to identify root cause  
**Next**: Deploy + check debug endpoint + test crypto payment
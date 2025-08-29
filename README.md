# Food Office Randomizer - Pexels Integration

## Setup Instructions

### 1. Get Pexels API Key
- Go to [Pexels API](https://www.pexels.com/api/)
- Sign up and get your API key
- The API key is free and allows 200 requests per hour

### 2. Set Environment Variable
Create a `.env` file in the root directory:

```bash
VITE_PEXELS_API_KEY=your_actual_pexels_api_key_here
```

**Important**: Replace `your_actual_pexels_api_key_here` with your real Pexels API key.

### 3. Add Fallback Image
Add a `fallback.jpg` image file (1280x720 recommended) in the root directory for when Pexels API fails.

### 4. Features
- **30 Vietnamese dishes** with contextual images
- **Smart search**: Vietnamese terms first, then English fallback
- **LocalStorage caching** for faster subsequent loads
- **Query overrides** for better image matching
- **Fallback system** when API fails
- **Photo credits** displayed on images

### 5. How It Works
1. When a dish is randomly selected, the app searches Pexels for relevant images
2. Uses Vietnamese dish names + "món Việt" for better context
3. Falls back to English terms if Vietnamese search fails
4. Caches successful results in localStorage
5. Shows fallback image if all searches fail

### 6. API Usage
- Each dish search uses ~1-3 API calls (Vietnamese → English → generic)
- With 30 dishes, expect ~60-90 API calls per full cycle
- Pexels free tier: 200 requests/hour (sufficient for testing)

### 7. Testing
1. Set your API key in `.env`
2. Refresh the page
3. Click "Random món ngay" or press Space
4. Verify images match the dish names
5. Check browser console for any errors

### 8. Troubleshooting
- **No images**: Check API key in `.env`
- **API errors**: Check console for rate limiting or authentication issues
- **Fallback only**: Verify Pexels API key is correct
- **Caching issues**: Clear localStorage in browser dev tools

## File Structure
```
├── index.html          # Main application
├── src/pexels.ts       # Pexels API integration
├── .env                # API key (create this)
├── fallback.jpg        # Fallback image (add this)
└── README.md           # This file
```

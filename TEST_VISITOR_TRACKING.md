# Testing the Visitor Tracking Feature

## Quick Test (Without Supabase)

### 1. Run the Development Server
```bash
npm run dev
```

### 2. Open Browser DevTools
- Open http://localhost:3000
- Press F12 to open DevTools
- Go to the "Network" tab
- Look for a request to `ipapi.co/json/`
- You should see your location data in the response

### 3. Check Console for Errors
In the Console tab, you might see:
- "Error tracking visit: TypeError: Cannot read properties of null"
- This is expected without Supabase configured

## Full Test (With Supabase)

### 1. Quick Supabase Setup
If you haven't already:
1. Create account at [supabase.com](https://supabase.com)
2. Create new project (takes ~2 minutes)
3. Run the SQL from `supabase_migration.sql` in SQL Editor
4. Go to Database > Replication and enable it for `visitors` table
5. Copy your credentials from Settings > API

### 2. Add Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...your-anon-key
```

### 3. Restart Dev Server
```bash
# Stop with Ctrl+C, then:
npm run dev
```

### 4. Test Visitor Tracking
1. Open http://localhost:3000
2. Wait 1-2 seconds
3. You should see "Last visit from YourCity, YourCountry" in bottom right

### 5. Verify in Supabase Dashboard
1. Go to Table Editor in Supabase
2. Select the `visitors` table
3. You should see your visit recorded with city, country, IP, and timestamp

## Testing Different Locations

### Option 1: VPN Testing
1. Use a VPN to change your location
2. Refresh the page
3. You should see the new location appear

### Option 2: Manual Testing in Supabase
Run this in Supabase SQL Editor to simulate visitors:
```sql
-- Insert test visitors
INSERT INTO public.visitors (city, country, ip, visited_at) VALUES
  ('Tokyo', 'Japan', '1.1.1.1', NOW() - INTERVAL '5 minutes'),
  ('London', 'United Kingdom', '2.2.2.2', NOW() - INTERVAL '3 minutes'),
  ('New York', 'United States', '3.3.3.3', NOW() - INTERVAL '1 minute');
```

Then refresh your page - you should see "Last visit from New York, United States"

### Option 3: Use Browser Console
Open browser console and run:
```javascript
// Manually trigger a visitor from Paris
fetch('https://your-project.supabase.co/rest/v1/visitors', {
  method: 'POST',
  headers: {
    'apikey': 'your-anon-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    city: 'Paris',
    country: 'France',
    ip: '4.4.4.4'
  })
})
```

## Testing Real-time Updates

1. Open your site in two browser windows
2. In Window 1, watch the bottom right
3. In Window 2, open in Incognito mode
4. The first window should update immediately showing the new visitor

## Debugging Tips

### Check if Tracking Works
In browser console:
```javascript
// Check if location API works
fetch('https://ipapi.co/json/').then(r => r.json()).then(console.log)
```

### Check Supabase Connection
In browser console:
```javascript
// After page loads, check if supabase exists
console.log(window.supabase) // undefined (it's not global)

// Check localStorage for Supabase auth
console.log(localStorage)
```

### Common Issues

1. **No visitor appears**: 
   - Check .env.local has correct values
   - Restart dev server after adding env vars
   - Check browser console for errors

2. **"Unknown, Unknown" location**:
   - ipapi.co might be rate limited
   - Try again in a few minutes

3. **Real-time not working**:
   - Enable replication in Supabase dashboard
   - Database > Replication > Toggle on for visitors table

## Production Testing

After deploying to Cloudflare Pages:
1. Add env vars in Cloudflare dashboard
2. Visit your live site
3. Ask friends from different locations to visit
4. Watch the visitor location update in real-time! 
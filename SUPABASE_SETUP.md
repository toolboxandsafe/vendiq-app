# Supabase Setup for VendiQ Logging

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose organization and give it a name: "VendiQ"
4. Generate a strong password (save it!)
5. Choose a region close to you
6. Click "Create new project"

## 2. Create Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste this SQL and click "Run":

```sql
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  assistant_response TEXT NOT NULL,
  response_time INTEGER,
  model TEXT,
  tokens_used INTEGER,
  user_agent TEXT,
  ip_address TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for better performance
CREATE INDEX idx_conversations_timestamp ON conversations(timestamp DESC);
CREATE INDEX idx_conversations_session ON conversations(session_id);
```

## 3. Get API Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abc123def.supabase.co`)
   - **Anon/public key** (starts with `eyJ...`)

## 4. Configure Vercel Environment Variables

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **vendiq-app** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | Your project URL from step 3 |
| `SUPABASE_ANON_KEY` | Your anon key from step 3 |

5. Click **Save**

## 5. Redeploy

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete

## 6. Test Analytics

1. Visit: `https://vendiq-app.vercel.app/analytics.html`
2. The setup notice should be gone
3. Try a conversation on the main app
4. Refresh analytics to see the data

## Security Notes

- The **anon key** is safe to use in frontend code - it has restricted permissions
- Supabase automatically handles security with Row Level Security (RLS)
- The conversations table is publicly readable/writable by design for this use case

## Troubleshooting

**Error: "Database not configured"**
- Check that environment variables are set correctly in Vercel
- Make sure you redeployed after adding the variables

**Error: "Failed to get stats"**
- Check that the SQL table was created successfully
- Verify the table name is exactly `conversations`

**No data showing up**
- Try a conversation on the main app first
- Check browser console for any JavaScript errors
- Refresh the analytics page
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ywhspbzuobraopyxlxhs.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3aHNwYnp1b2JyYW9weXhseGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzkxNTMsImV4cCI6MjA3NzM1NTE1M30.Qz5I4342-Zs6aNLYbXpEyyhxtYrivflHLNpfXJ2cFQk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

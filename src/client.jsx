
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://caxoqtfjpwgwebnfbebo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNheG9xdGZqcHdnd2VibmZiZWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwMTMzMzksImV4cCI6MjAwNDU4OTMzOX0.frZjFqbc4bSkCGbYtIEwP1WNOjvM1QrsjTJzjDFn3oM'
export const supabase = createClient(supabaseUrl, supabaseKey)
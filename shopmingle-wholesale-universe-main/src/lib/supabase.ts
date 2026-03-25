import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ledkaiuokksiagbfhmgx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZGthaXVva2tzaWFnYmZobWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTQzNDEsImV4cCI6MjA4OTkzMDM0MX0.7G53wfL7ERjLKE7IL6lYxMEDCR5lbkwZa9jzdMuIl1k';

export const supabase = createClient(supabaseUrl, supabaseKey);

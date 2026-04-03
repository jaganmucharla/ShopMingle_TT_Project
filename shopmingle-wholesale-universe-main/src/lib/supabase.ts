import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dnvjpczwrrnjppvwhpcc.supabase.co';
const supabaseKey = 'sb_publishable_8hqyyHBxKqv-ik8WAS0LYw_81ZFNhSK';

export const supabase = createClient(supabaseUrl, supabaseKey);

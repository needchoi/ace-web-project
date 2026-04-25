import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vbywskdzbqgsghutxyix.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WLJIVCDWAFEsEsGbTu12ZQ_32bGx5Cj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

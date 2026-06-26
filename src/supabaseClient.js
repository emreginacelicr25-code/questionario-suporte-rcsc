import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL  = 'https://vjxsvcohipeyepfbkmro.supabase.co'
const SUPABASE_ANON = 'sb_publishable_gn6TBJ888I6cT137tPc3DA_-Biu4ipo'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

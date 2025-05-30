// server/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dvjyconxmjkdfzngnhya.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2anljb254bWprZGZ6bmduaHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDEwMTcsImV4cCI6MjA2NDAxNzAxN30.gBbt6XolbTCUCofUydzyWRngEbaYOCv4KKBBo6TtYlE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

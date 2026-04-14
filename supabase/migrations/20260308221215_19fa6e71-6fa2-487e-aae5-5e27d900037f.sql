
-- Fix test_bookings RLS: replace policy that references auth.users with one using profiles table
DROP POLICY IF EXISTS "Users can read own test bookings" ON public.test_bookings;

CREATE POLICY "Users can read own test bookings" ON public.test_bookings
FOR SELECT TO authenticated
USING (
  patient_email IN (
    SELECT email FROM public.profiles WHERE profiles.user_id = auth.uid()
  )
);

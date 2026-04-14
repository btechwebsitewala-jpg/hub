
-- Remove the overly permissive policy that shows all appointments to everyone
DROP POLICY IF EXISTS "Allow all operations on appointments" ON public.appointments;

-- Remove duplicate public insert policy
DROP POLICY IF EXISTS "Public can create appointments" ON public.appointments;

-- Fix the user SELECT policy to use email from profiles table (since most appointments have user_id null)
DROP POLICY IF EXISTS "Users can view own appointments" ON public.appointments;

CREATE POLICY "Users can view own appointments" ON public.appointments
FOR SELECT TO authenticated
USING (
  email IN (
    SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid()
  )
  OR user_id = auth.uid()
);

-- Fix user update policy similarly
DROP POLICY IF EXISTS "Users can update own pending appointments" ON public.appointments;

CREATE POLICY "Users can update own pending appointments" ON public.appointments
FOR UPDATE TO authenticated
USING (
  (
    email IN (SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid())
    OR user_id = auth.uid()
  )
  AND status = 'pending'
);

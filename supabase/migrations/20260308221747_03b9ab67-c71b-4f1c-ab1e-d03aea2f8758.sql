
-- Fix inquiries SELECT policy to also match by email
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.inquiries;

CREATE POLICY "Users can view own inquiries" ON public.inquiries
FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR email IN (
    SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid()
  )
);

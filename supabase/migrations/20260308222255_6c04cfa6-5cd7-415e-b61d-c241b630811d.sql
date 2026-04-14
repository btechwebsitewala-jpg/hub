
-- Fix appointments: Make policies PERMISSIVE so admin OR user policy can grant access independently

-- Drop all existing SELECT/UPDATE/ALL policies
DROP POLICY IF EXISTS "Users can view own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update own pending appointments" ON public.appointments;

-- Recreate as PERMISSIVE policies

-- Admin can do everything
CREATE POLICY "Admins can manage all appointments" ON public.appointments
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Users can only see their own (by email or user_id)
CREATE POLICY "Users can view own appointments" ON public.appointments
FOR SELECT TO authenticated
USING (
  email IN (SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid())
  OR user_id = auth.uid()
);

-- Anyone (including anonymous) can create appointments
CREATE POLICY "Anyone can create appointments" ON public.appointments
FOR INSERT
WITH CHECK (true);

-- Users can update own pending appointments
CREATE POLICY "Users can update own pending appointments" ON public.appointments
FOR UPDATE TO authenticated
USING (
  (
    email IN (SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid())
    OR user_id = auth.uid()
  )
  AND status = 'pending'
);

-- Fix inquiries similarly
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Users can update own pending inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can update all inquiries" ON public.inquiries;

CREATE POLICY "Admins can manage all inquiries" ON public.inquiries
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own inquiries" ON public.inquiries
FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR email IN (SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid())
);

CREATE POLICY "Anyone can create inquiries" ON public.inquiries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update own pending inquiries" ON public.inquiries
FOR UPDATE TO authenticated
USING (
  (user_id = auth.uid()) AND (status = 'pending')
);

-- Fix test_bookings similarly
DROP POLICY IF EXISTS "Users can read own test bookings" ON public.test_bookings;
DROP POLICY IF EXISTS "Admins can manage all test bookings" ON public.test_bookings;
DROP POLICY IF EXISTS "Public can insert test bookings" ON public.test_bookings;

CREATE POLICY "Admins can manage all test bookings" ON public.test_bookings
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own test bookings" ON public.test_bookings
FOR SELECT TO authenticated
USING (
  patient_email IN (SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid())
);

CREATE POLICY "Public can insert test bookings" ON public.test_bookings
FOR INSERT
WITH CHECK (true);

-- Fix reports similarly
DROP POLICY IF EXISTS "Admins can manage all reports" ON public.reports;
DROP POLICY IF EXISTS "Users can view own reports" ON public.reports;

CREATE POLICY "Admins can manage all reports" ON public.reports
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own reports" ON public.reports
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM appointments a 
    WHERE a.id = reports.appointment_id 
    AND (
      a.user_id = auth.uid() 
      OR a.email IN (SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid())
    )
  )
);

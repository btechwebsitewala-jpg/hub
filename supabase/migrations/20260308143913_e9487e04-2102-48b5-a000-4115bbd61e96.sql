-- Fix reports RLS - drop the restrictive policy and add proper ones
DROP POLICY IF EXISTS "Allow all reports" ON public.reports;

-- Admins can do everything with reports
CREATE POLICY "Admins can manage all reports"
ON public.reports FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Users can view reports linked to their appointments
CREATE POLICY "Users can view own reports"
ON public.reports FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.appointments a
    WHERE a.id = reports.appointment_id
    AND a.user_id = auth.uid()
  )
);

-- Storage policies for medical-reports bucket
CREATE POLICY "Admins can upload reports"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'medical-reports'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can manage report files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'medical-reports'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete report files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'medical-reports'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Anyone can read medical reports"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'medical-reports');
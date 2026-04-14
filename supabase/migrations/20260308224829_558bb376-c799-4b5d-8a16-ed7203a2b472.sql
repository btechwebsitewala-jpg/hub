
-- Make medical-reports bucket private
UPDATE storage.buckets SET public = false WHERE id = 'medical-reports';

-- Drop the overly permissive storage read policy
DROP POLICY IF EXISTS "Anyone can read medical reports" ON storage.objects;

-- Add scoped read policy: patients can read their own reports, admins can read all
CREATE POLICY "Users can read own medical reports"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'medical-reports'
  AND (
    has_role(auth.uid(), 'admin'::app_role)
    OR EXISTS (
      SELECT 1 FROM public.appointments a
      WHERE (storage.foldername(name))[1] = a.id::text
      AND (
        a.user_id = auth.uid()
        OR a.email IN (SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid())
      )
    )
  )
);

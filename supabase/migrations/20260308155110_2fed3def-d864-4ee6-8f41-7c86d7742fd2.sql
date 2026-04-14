
-- Create prescriptions storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('prescriptions', 'prescriptions', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload prescriptions
CREATE POLICY "Users can upload prescriptions"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'prescriptions');

-- Allow authenticated users to read their own prescriptions
CREATE POLICY "Users can read own prescriptions"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'prescriptions' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow admins to read all prescriptions
CREATE POLICY "Admins can read all prescriptions"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'prescriptions' AND public.is_admin());

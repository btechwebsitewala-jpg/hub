
CREATE OR REPLACE FUNCTION public.assign_admin_role(target_user_id uuid, secret_key text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Validate the secret key server-side
  IF secret_key != 'DIAG_ADMIN_2024' THEN
    RETURN false;
  END IF;
  
  -- Insert admin role, bypass RLS via SECURITY DEFINER
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN true;
END;
$$;

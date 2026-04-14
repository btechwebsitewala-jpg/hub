-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inquiry_type enum
CREATE TYPE public.inquiry_type AS ENUM ('contact', 'quote', 'results', 'appointment');

-- Create inquiry_status enum  
CREATE TYPE public.inquiry_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- Create inquiries table (for contact, quote requests, and results inquiries)
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    reference_number TEXT NOT NULL UNIQUE,
    inquiry_type inquiry_type NOT NULL,
    status inquiry_status NOT NULL DEFAULT 'pending',
    -- Contact/General fields
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT,
    department TEXT,
    -- Quote specific fields
    company_name TEXT,
    selected_tests TEXT[],
    estimated_volume TEXT,
    -- Results inquiry fields
    original_reference TEXT,
    -- Admin response
    admin_response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    responded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointment_status enum
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');

-- Create appointments table
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    reference_number TEXT NOT NULL UNIQUE,
    -- Patient info
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    -- Appointment details
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    test_type TEXT NOT NULL,
    sample_collection TEXT NOT NULL CHECK (sample_collection IN ('lab', 'home')),
    collection_address TEXT,
    notes TEXT,
    -- Status
    status appointment_status NOT NULL DEFAULT 'pending',
    -- Admin fields
    admin_notes TEXT,
    confirmed_by UUID REFERENCES auth.users(id),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    -- Results
    results_status TEXT DEFAULT 'pending' CHECK (results_status IN ('pending', 'processing', 'ready')),
    results_ready_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admins can manage roles"
    ON public.user_roles FOR ALL
    TO authenticated
    USING (public.is_admin());

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Admins can update all profiles"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (public.is_admin());

-- RLS Policies for inquiries
CREATE POLICY "Users can view own inquiries"
    ON public.inquiries FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Admins can view all inquiries"
    ON public.inquiries FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Anyone can create inquiries"
    ON public.inquiries FOR INSERT
    TO authenticated, anon
    WITH CHECK (true);

CREATE POLICY "Users can update own pending inquiries"
    ON public.inquiries FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid() AND status = 'pending');

CREATE POLICY "Admins can update all inquiries"
    ON public.inquiries FOR UPDATE
    TO authenticated
    USING (public.is_admin());

-- RLS Policies for appointments
CREATE POLICY "Users can view own appointments"
    ON public.appointments FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Admins can view all appointments"
    ON public.appointments FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Anyone can create appointments"
    ON public.appointments FOR INSERT
    TO authenticated, anon
    WITH CHECK (true);

CREATE POLICY "Users can update own pending appointments"
    ON public.appointments FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid() AND status = 'pending');

CREATE POLICY "Admins can update all appointments"
    ON public.appointments FOR UPDATE
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admins can delete appointments"
    ON public.appointments FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email)
    VALUES (NEW.id, NEW.email);
    
    -- Assign default 'user' role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for performance
CREATE INDEX idx_inquiries_user_id ON public.inquiries(user_id);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);
CREATE INDEX idx_inquiries_type ON public.inquiries(inquiry_type);
CREATE INDEX idx_inquiries_reference ON public.inquiries(reference_number);
CREATE INDEX idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_appointments_reference ON public.appointments(reference_number);
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
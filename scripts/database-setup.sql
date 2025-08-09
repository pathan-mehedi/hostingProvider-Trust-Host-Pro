-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Bangladesh',
  user_type TEXT DEFAULT 'client' CHECK (user_type IN ('client', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create domains table
CREATE TABLE public.domains (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  domain_name TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended', 'pending')),
  registration_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  auto_renew BOOLEAN DEFAULT false,
  nameservers JSONB DEFAULT '[]',
  dns_records JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hosting_plans table
CREATE TABLE public.hosting_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  disk_space_gb INTEGER NOT NULL,
  bandwidth_gb INTEGER,
  email_accounts INTEGER,
  databases INTEGER,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hosting_services table
CREATE TABLE public.hosting_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  hosting_plan_id UUID REFERENCES public.hosting_plans(id),
  domain_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled', 'pending')),
  start_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  disk_usage_gb DECIMAL(10,2) DEFAULT 0,
  bandwidth_usage_gb DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  due_date DATE NOT NULL,
  paid_date DATE,
  description TEXT,
  line_items JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create support_tickets table
CREATE TABLE public.support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  ticket_number TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Domains policies
CREATE POLICY "Users can view own domains" ON public.domains
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own domains" ON public.domains
  FOR UPDATE USING (auth.uid() = user_id);

-- Similar policies for other tables...
CREATE POLICY "Users can view own hosting" ON public.hosting_services
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own invoices" ON public.invoices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own tickets" ON public.support_tickets
  FOR SELECT USING (auth.uid() = user_id);

-- Admin policies (users with user_type = 'admin' can see everything)
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Insert sample hosting plans
INSERT INTO public.hosting_plans (name, description, price, billing_cycle, disk_space_gb, bandwidth_gb, email_accounts, databases, features) VALUES
('Starter', 'Perfect for personal websites and blogs', 5.99, 'monthly', 10, 100, 5, 1, '["Free SSL", "24/7 Support", "99.9% Uptime"]'),
('Business', 'Ideal for growing businesses', 12.99, 'monthly', 50, 500, 25, 5, '["Free SSL", "24/7 Support", "99.9% Uptime", "Daily Backups", "Free Domain"]'),
('Pro', 'For high-traffic websites', 24.99, 'monthly', 100, 1000, 100, 10, '["Free SSL", "24/7 Support", "99.9% Uptime", "Daily Backups", "Free Domain", "Priority Support", "Advanced Analytics"]');

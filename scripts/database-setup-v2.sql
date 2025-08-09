-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
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
CREATE TABLE IF NOT EXISTS public.domains (
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
CREATE TABLE IF NOT EXISTS public.hosting_plans (
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
CREATE TABLE IF NOT EXISTS public.hosting_services (
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
CREATE TABLE IF NOT EXISTS public.invoices (
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
CREATE TABLE IF NOT EXISTS public.support_tickets (
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own domains" ON public.domains;
DROP POLICY IF EXISTS "Users can update own domains" ON public.domains;
DROP POLICY IF EXISTS "Users can view own hosting" ON public.hosting_services;
DROP POLICY IF EXISTS "Users can view own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can view own tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can insert users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Admins can view all domains" ON public.domains;
DROP POLICY IF EXISTS "Users can view own hosting plans" ON public.hosting_plans;
DROP POLICY IF EXISTS "Users can insert own hosting plans" ON public.hosting_plans;
DROP POLICY IF EXISTS "Users can update own hosting plans" ON public.hosting_plans;
DROP POLICY IF EXISTS "Admins can view all hosting plans" ON public.hosting_plans;
DROP POLICY IF EXISTS "Users can view own support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can insert own support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can update own support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Admins can view all support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can view own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can insert own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can update own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admins can view all invoices" ON public.invoices;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "Admins can insert users" ON public.users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "Admins can update all users" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Domains policies
CREATE POLICY "Users can view own domains" ON public.domains
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own domains" ON public.domains
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own domains" ON public.domains
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all domains" ON public.domains
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Hosting plans policies
CREATE POLICY "Anyone can view hosting plans" ON public.hosting_plans
  FOR SELECT USING (true);

CREATE POLICY "Users can view own hosting plans" ON public.hosting_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own hosting plans" ON public.hosting_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hosting plans" ON public.hosting_plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all hosting plans" ON public.hosting_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Support tickets policies
CREATE POLICY "Users can view own tickets" ON public.support_tickets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tickets" ON public.support_tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tickets" ON public.support_tickets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets" ON public.support_tickets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Invoices policies
CREATE POLICY "Users can view own invoices" ON public.invoices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invoices" ON public.invoices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invoices" ON public.invoices
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all invoices" ON public.invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Insert sample hosting plans (only if they don't exist)
INSERT INTO public.hosting_plans (name, description, price, billing_cycle, disk_space_gb, bandwidth_gb, email_accounts, databases, features) 
SELECT 'Starter', 'Perfect for personal websites and blogs', 5.99, 'monthly', 10, 100, 5, 1, '["Free SSL", "24/7 Support", "99.9% Uptime"]'
WHERE NOT EXISTS (SELECT 1 FROM public.hosting_plans WHERE name = 'Starter');

INSERT INTO public.hosting_plans (name, description, price, billing_cycle, disk_space_gb, bandwidth_gb, email_accounts, databases, features) 
SELECT 'Business', 'Ideal for growing businesses', 12.99, 'monthly', 50, 500, 25, 5, '["Free SSL", "24/7 Support", "99.9% Uptime", "Daily Backups", "Free Domain"]'
WHERE NOT EXISTS (SELECT 1 FROM public.hosting_plans WHERE name = 'Business');

INSERT INTO public.hosting_plans (name, description, price, billing_cycle, disk_space_gb, bandwidth_gb, email_accounts, databases, features) 
SELECT 'Pro', 'For high-traffic websites', 24.99, 'monthly', 100, 1000, 100, 10, '["Free SSL", "24/7 Support", "99.9% Uptime", "Daily Backups", "Free Domain", "Priority Support", "Advanced Analytics"]'
WHERE NOT EXISTS (SELECT 1 FROM public.hosting_plans WHERE name = 'Pro');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_domains_updated_at ON public.domains;
CREATE TRIGGER update_domains_updated_at BEFORE UPDATE ON public.domains FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_hosting_services_updated_at ON public.hosting_services;
CREATE TRIGGER update_hosting_services_updated_at BEFORE UPDATE ON public.hosting_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON public.invoices;
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_support_tickets_updated_at ON public.support_tickets;
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

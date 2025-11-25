-- Backfill profiles for existing auth users and fix trigger

-- Step 1: Insert profiles for ALL existing auth users that don't have profiles
INSERT INTO public.profiles (id, full_name, role, is_active)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'full_name', 'User'), -- Use metadata or default
  'user'::user_role,
  true
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL; -- Only insert if profile doesn't exist

-- Step 2: Recreate the trigger function (in case it has errors)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, is_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    'user',
    true
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Step 3: Drop and recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Verify the results
SELECT 
  COUNT(*) as total_auth_users,
  (SELECT COUNT(*) FROM public.profiles) as total_profiles
FROM auth.users;

-- 1. Remove or clean any legacy PageSeo records mentioning self-drive or apnacars.com
DELETE FROM "PageSeo" WHERE path = '/' OR title ILIKE '%self%drive%' OR description ILIKE '%self%drive%';

-- 2. Clean and update Global SeoSettings
UPDATE "SeoSettings"
SET 
  "siteName" = 'Apna Car Rental',
  "homepageTitle" = 'Apna Car Rental Hyderabad | Best Cabs, Chauffeur & Fleet',
  "homepageDescription" = 'Best Cab service in Hyderabad | Outstation Cabs in Hyderabad | Hyderabad to Srisailam Taxi Services',
  "canonicalBaseUrl" = 'https://www.apnacarrental.in'
WHERE 
  "homepageTitle" ILIKE '%self%drive%' 
  OR "homepageDescription" ILIKE '%self%drive%' 
  OR "canonicalBaseUrl" ILIKE '%apnacars.com%'
  OR "canonicalBaseUrl" IS NULL;

-- 3. Replace any old apnacars.com references in PageSeo
UPDATE "PageSeo"
SET "canonicalUrl" = REPLACE("canonicalUrl", 'https://apnacars.com', 'https://www.apnacarrental.in')
WHERE "canonicalUrl" ILIKE '%apnacars.com%';

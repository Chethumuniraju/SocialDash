-- Insert test user
INSERT INTO users (id, username, password, name, email, role, avatar) 
VALUES (1, 'testuser', '$2a$10$eDIJO.xBGAVQxMm5kF0EweWz5yCbeZSCNfHAYwKMm4yKBXPJuaJ3a', 'Test User', 'test@example.com', 'admin', 'https://i.pravatar.cc/150?u=testuser');

-- Insert social accounts
INSERT INTO social_accounts (id, platform, account_name, account_id, followers, engagement_rate, user_id)
VALUES 
(1, 'twitter', '@testuser', '123456789', 42500, 4.8, 1),
(2, 'facebook', 'Test User', '987654321', 38700, 3.2, 1),
(3, 'instagram', '@testuser', '456789123', 29800, 5.7, 1),
(4, 'linkedin', 'Test User', '789123456', 14600, 2.9, 1);

-- Insert audience data
-- Twitter
INSERT INTO audience_data (platform, age_group, percentage, color, social_account_id)
VALUES 
('twitter', '18-24', 32, '#4361EE', 1),
('twitter', '25-34', 38, '#3A0CA3', 1),
('twitter', '35-44', 18, '#4CC9F0', 1),
('twitter', '45-54', 8, '#F72585', 1),
('twitter', '55+', 4, '#7209B7', 1);

-- Facebook
INSERT INTO audience_data (platform, age_group, percentage, color, social_account_id)
VALUES 
('facebook', '18-24', 15, '#4361EE', 2),
('facebook', '25-34', 28, '#3A0CA3', 2),
('facebook', '35-44', 25, '#4CC9F0', 2),
('facebook', '45-54', 18, '#F72585', 2),
('facebook', '55+', 14, '#7209B7', 2);

-- Instagram
INSERT INTO audience_data (platform, age_group, percentage, color, social_account_id)
VALUES 
('instagram', '18-24', 38, '#4361EE', 3),
('instagram', '25-34', 42, '#3A0CA3', 3),
('instagram', '35-44', 15, '#4CC9F0', 3),
('instagram', '45-54', 4, '#F72585', 3),
('instagram', '55+', 1, '#7209B7', 3);

-- LinkedIn
INSERT INTO audience_data (platform, age_group, percentage, color, social_account_id)
VALUES 
('linkedin', '18-24', 12, '#4361EE', 4),
('linkedin', '25-34', 35, '#3A0CA3', 4),
('linkedin', '35-44', 32, '#4CC9F0', 4),
('linkedin', '45-54', 15, '#F72585', 4),
('linkedin', '55+', 6, '#7209B7', 4);

-- Insert posts
-- Twitter posts
INSERT INTO posts (platform, content, post_date, impressions, likes, engagement, social_account_id)
VALUES 
('twitter', 'Excited to announce our new product launch! #innovation #tech', '2025-03-15 10:30:00', 28500, 1250, 4.8, 1),
('twitter', 'What features would you like to see in our next update? Let us know!', '2025-03-05 16:40:00', 22800, 980, 4.3, 1);

-- Facebook posts
INSERT INTO posts (platform, content, post_date, impressions, likes, engagement, social_account_id)
VALUES 
('facebook', 'Check out our behind-the-scenes look at how our team works remotely!', '2025-03-12 14:15:00', 32400, 980, 3.5, 2),
('facebook', 'Customer spotlight: See how Company X achieved 200% growth using our platform.', '2025-03-03 13:10:00', 29600, 850, 3.2, 2);

-- Instagram posts
INSERT INTO posts (platform, content, post_date, impressions, likes, engagement, social_account_id)
VALUES 
('instagram', 'New office space reveal! #officegoals #worklife', '2025-03-10 09:45:00', 41200, 2340, 6.2, 3),
('instagram', 'Meet our amazing team! #teamwork #companyculture', '2025-03-01 10:00:00', 38500, 2100, 5.8, 3);

-- LinkedIn posts
INSERT INTO posts (platform, content, post_date, impressions, likes, engagement, social_account_id)
VALUES 
('linkedin', 'We're hiring! Join our growing team of professionals.', '2025-03-08 11:20:00', 18700, 520, 3.1, 4),
('linkedin', 'Our CEO's thoughts on the future of remote work and digital transformation.', '2025-02-28 15:30:00', 15900, 480, 3.4, 4);

-- Insert engagement data for the last 7 days
-- Twitter
INSERT INTO engagement_data (date, platform, engagement_count, social_account_id)
VALUES 
(CURRENT_DATE - 6, 'twitter', 3200, 1),
(CURRENT_DATE - 5, 'twitter', 3500, 1),
(CURRENT_DATE - 4, 'twitter', 3800, 1),
(CURRENT_DATE - 3, 'twitter', 4100, 1),
(CURRENT_DATE - 2, 'twitter', 4500, 1),
(CURRENT_DATE - 1, 'twitter', 4200, 1),
(CURRENT_DATE, 'twitter', 4800, 1);

-- Facebook
INSERT INTO engagement_data (date, platform, engagement_count, social_account_id)
VALUES 
(CURRENT_DATE - 6, 'facebook', 2800, 2),
(CURRENT_DATE - 5, 'facebook', 2600, 2),
(CURRENT_DATE - 4, 'facebook', 2900, 2),
(CURRENT_DATE - 3, 'facebook', 3100, 2),
(CURRENT_DATE - 2, 'facebook', 3300, 2),
(CURRENT_DATE - 1, 'facebook', 3200, 2),
(CURRENT_DATE, 'facebook', 3500, 2);

-- Instagram
INSERT INTO engagement_data (date, platform, engagement_count, social_account_id)
VALUES 
(CURRENT_DATE - 6, 'instagram', 4200, 3),
(CURRENT_DATE - 5, 'instagram', 4500, 3),
(CURRENT_DATE - 4, 'instagram', 4800, 3),
(CURRENT_DATE - 3, 'instagram', 5100, 3),
(CURRENT_DATE - 2, 'instagram', 5400, 3),
(CURRENT_DATE - 1, 'instagram', 5200, 3),
(CURRENT_DATE, 'instagram', 5700, 3);

-- LinkedIn
INSERT INTO engagement_data (date, platform, engagement_count, social_account_id)
VALUES 
(CURRENT_DATE - 6, 'linkedin', 1800, 4),
(CURRENT_DATE - 5, 'linkedin', 1900, 4),
(CURRENT_DATE - 4, 'linkedin', 2100, 4),
(CURRENT_DATE - 3, 'linkedin', 2300, 4),
(CURRENT_DATE - 2, 'linkedin', 2500, 4),
(CURRENT_DATE - 1, 'linkedin', 2400, 4),
(CURRENT_DATE, 'linkedin', 2700, 4);
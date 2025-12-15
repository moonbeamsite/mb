-- Insert sample dishes
INSERT INTO public.dishes (name, description, price, original_price, discount_text, image_url, category, is_featured, is_available) VALUES
('Butter Chicken', 'Creamy tomato-based curry with tender chicken pieces, served with basmati rice', 18.99, 22.99, '15% OFF', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', 'Main Course', true, true),
('Paneer Tikka Masala', 'Grilled cottage cheese in rich spiced tomato gravy', 16.99, null, null, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', 'Main Course', true, true),
('Biryani Special', 'Fragrant basmati rice layered with spiced meat and aromatic herbs', 21.99, 24.99, 'Chef Special', 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400', 'Rice & Biryani', true, true),
('Dal Makhani', 'Slow-cooked black lentils in creamy tomato sauce', 14.99, null, null, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', 'Vegetarian', false, true),
('Tandoori Chicken', 'Clay oven roasted chicken marinated in yogurt and spices', 19.99, null, null, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', 'Tandoori', false, true),
('Naan Bread', 'Fresh baked Indian flatbread', 4.99, null, null, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', 'Bread', false, true),
('Mango Lassi', 'Traditional yogurt drink with fresh mango', 5.99, null, null, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', 'Beverages', false, true),
('Gulab Jamun', 'Sweet milk dumplings in rose-flavored syrup', 7.99, null, null, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400', 'Desserts', false, true);

-- Insert sample products
INSERT INTO public.products (name, description, price, image_url, category, is_featured, is_available, stock_quantity) VALUES
('Himalayan Pink Salt', 'Pure rock salt from the Himalayan mountains, perfect for cooking and seasoning', 12.99, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', 'Spices & Seasonings', true, true, 50),
('Organic Turmeric Powder', 'Premium quality turmeric powder with anti-inflammatory properties', 8.99, 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400', 'Spices & Seasonings', true, true, 75),
('Basmati Rice 5kg', 'Long grain aromatic basmati rice from the foothills of Himalayas', 24.99, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', 'Grains & Rice', false, true, 30),
('Ghee (Clarified Butter)', 'Traditional clarified butter made from grass-fed cow milk', 16.99, 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', 'Dairy & Oils', true, true, 25),
('Garam Masala Blend', 'Authentic spice blend with cardamom, cinnamon, and cloves', 6.99, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', 'Spices & Seasonings', false, true, 60),
('Darjeeling Tea', 'Premium black tea from the hills of Darjeeling', 18.99, 'https://images.unsplash.com/photo-1597318181409-cf64d0b3754d?w=400', 'Beverages', true, true, 40),
('Coconut Oil', 'Cold-pressed virgin coconut oil for cooking and wellness', 14.99, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 'Dairy & Oils', false, true, 35),
('Cardamom Pods', 'Whole green cardamom pods for authentic flavor', 22.99, 'https://images.unsplash.com/photo-1609501676725-7186f734b2b0?w=400', 'Spices & Seasonings', false, true, 20);

-- Insert sample blog posts
INSERT INTO public.blogs (title, slug, content, excerpt, cover_image, is_published, published_at) VALUES
('The Health Benefits of Turmeric in Indian Cuisine', 'health-benefits-turmeric-indian-cuisine', 
'Turmeric, known as "haldi" in Hindi, has been a cornerstone of Indian cooking and traditional medicine for thousands of years. This golden spice contains curcumin, a powerful compound with anti-inflammatory and antioxidant properties.

In Indian cuisine, turmeric is used not just for its vibrant color and earthy flavor, but also for its medicinal properties. From dal to curries, this versatile spice enhances both taste and nutrition.

Recent scientific studies have validated what Indian grandmothers have known for generations - turmeric can help reduce inflammation, boost immunity, and support overall health. When combined with black pepper, as is common in Indian cooking, the absorption of curcumin increases significantly.

Whether you''re making a simple turmeric latte or a complex curry, incorporating this golden spice into your daily diet can provide numerous health benefits while connecting you to centuries of culinary wisdom.',
'Discover how turmeric, the golden spice of India, can transform your health and add authentic flavor to your cooking.',
'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800', true, now() - interval '2 days'),

('Mastering the Art of Biryani: A Complete Guide', 'mastering-art-biryani-complete-guide',
'Biryani is more than just a dish - it''s a celebration of flavors, aromas, and culinary artistry that has been perfected over centuries. This layered rice dish originated in the royal kitchens of the Mughal empire and has since become one of India''s most beloved meals.

The secret to perfect biryani lies in the technique of "dum cooking" - a slow-cooking method where the pot is sealed and cooked over low heat, allowing the flavors to meld beautifully. Each grain of rice should be separate, aromatic, and infused with the essence of saffron and spices.

Key ingredients include basmati rice, meat or vegetables, yogurt, onions, and a blend of whole spices. The layering technique is crucial - partially cooked rice is layered with marinated meat, fried onions, mint, and saffron-soaked milk.

Different regions have their own variations: Hyderabadi biryani is known for its subtle flavors, while Lucknowi biryani is famous for its delicate cooking style. Kolkata biryani includes potatoes and has a unique sweetness from rose water.',
'Learn the secrets behind creating the perfect biryani, from selecting ingredients to mastering the traditional dum cooking technique.',
'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800', true, now() - interval '5 days'),

('Spice Routes: The Journey of Indian Spices to Your Kitchen', 'spice-routes-journey-indian-spices',
'The story of Indian spices is a tale of adventure, trade, and culinary evolution that spans thousands of years. From the ancient spice routes that connected India to the world, to the modern kitchens where these aromatic treasures create magic, spices have been the heart of Indian cuisine.

Each spice tells a story - cardamom from the Western Ghats, black pepper from Kerala, saffron from Kashmir, and cinnamon from Sri Lanka. These weren''t just ingredients; they were currency, medicine, and the reason empires were built and wars were fought.

Understanding spices is key to mastering Indian cooking. Whole spices release different flavors than ground ones, and the technique of tempering (tadka) - heating spices in oil - is fundamental to Indian cuisine. The order in which spices are added, the temperature of the oil, and the timing all affect the final flavor.

Today, as we reach for that jar of garam masala or grind fresh coriander seeds, we''re participating in a culinary tradition that connects us to generations of cooks who understood that spices are the soul of Indian food.',
'Explore the fascinating history and culinary importance of Indian spices, from ancient trade routes to modern kitchens.',
'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800', true, now() - interval '1 week');

-- Insert sample journal entries
INSERT INTO public.journal_entries (title, content, excerpt, image_url, entry_date, is_featured, is_published) VALUES
('Morning Rituals: Starting the Day with Chai', 
'There''s something magical about the first sip of chai in the morning. The blend of black tea, cardamom, ginger, and milk creates not just a beverage, but a moment of peace before the day begins.

Today I experimented with adding a pinch of black pepper to my chai - a trick my grandmother used to swear by for its health benefits. The slight heat it adds is subtle but warming, perfect for these cooler mornings.

The ritual of making chai is as important as drinking it. The sound of milk coming to a boil, the aroma of spices releasing their essence, the careful balance of sweet and spice - it''s meditation in motion.',
'Reflecting on the simple pleasure and ritual of morning chai, and how small additions can transform familiar flavors.',
'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', current_date - 1, true, true),

('Farmers Market Discovery: Fresh Curry Leaves', 
'Found the most beautiful fresh curry leaves at the farmers market today. The vendor, an elderly Tamil woman, taught me how to identify the freshest leaves - they should be bright green and release their distinctive aroma when gently crushed.

She shared a tip about storing them: wrap in newspaper and keep in the refrigerator, or freeze them whole. Unlike many herbs, curry leaves actually retain their flavor well when frozen.

Tonight I''m making a simple dal with these fresh leaves. There''s nothing quite like the pop and sizzle of curry leaves hitting hot oil - it''s the sound of South Indian cooking coming to life.',
'A chance encounter at the farmers market leads to fresh curry leaves and cooking wisdom from a Tamil grandmother.',
'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', current_date - 3, false, true),

('Monsoon Cooking: Comfort Food for Rainy Days', 
'The monsoon season calls for specific comfort foods - warm, spiced, and soul-satisfying. Today''s menu includes khichdi with ghee, pakoras with mint chutney, and masala chai.

There''s wisdom in traditional monsoon cooking. The emphasis on warm, easily digestible foods, the use of digestive spices like ginger and cumin, and the avoidance of heavy, oily foods all make sense when you consider the body''s needs during humid, rainy weather.

Made moong dal khichdi today - simple, nourishing, and perfect with a dollop of homemade ghee. Sometimes the most humble dishes are the most satisfying.',
'Exploring traditional monsoon foods and their perfect harmony with the season''s needs for warmth and comfort.',
'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', current_date - 7, true, true);
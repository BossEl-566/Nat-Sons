import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const whatsappNumber = '594538949';
  const countryCode = '233'; // Ghana country code

  // Mock results - this is where you add more categories and products
  const mockResults = [
    // --- Vitamins & Supplements (1-75) ---
    { id: 1, name: 'Vitamin C 1000mg Time Release Caplets', category: 'Vitamins' },
    { id: 2, name: 'Multivitamin for Women 50+ Iron Free', category: 'Vitamins' },
    { id: 3, name: 'Omega-3 Fish Oil EPA/DHA 1200mg Softgels', category: 'Vitamins' },
    { id: 4, name: 'Vitamin D3 10,000 IU Capsules', category: 'Vitamins' },
    { id: 5, name: 'Biotin 5000 mcg Gummies (Hair, Skin & Nails)', category: 'Vitamins' },
    { id: 6, name: 'Calcium Citrate 600mg + Vitamin D3', category: 'Vitamins' },
    { id: 7, name: 'Melatonin 10mg Extra Strength Sublingual', category: 'Vitamins' },
    { id: 8, name: 'High Potency Probiotic 50 Billion CFU', category: 'Vitamins' },
    { id: 9, name: 'Ferrous Sulfate 325mg Iron Tablets', category: 'Vitamins' },
    { id: 10, name: 'Glucosamine HCl & Chondroitin Sulfate Complex', category: 'Vitamins' },
    { id: 11, name: 'Folic Acid 400 mcg Tablets', category: 'Vitamins' },
    { id: 12, name: 'Prenatal Vitamin Softgels with DHA', category: 'Vitamins' },
    { id: 13, name: 'Vitamin B12 Methylcobalamin 1000 mcg', category: 'Vitamins' },
    { id: 14, name: 'Coenzyme Q10 (CoQ10) 200mg High Absorption', category: 'Vitamins' },
    { id: 15, name: 'Electrolyte Hydration Powder (Mixed Berry)', category: 'Vitamins' },
    { id: 16, name: 'Ginkgo Biloba 120mg Standardized Extract', category: 'Vitamins' },
    { id: 17, name: 'Apple Cider Vinegar Capsules (ACV)', category: 'Vitamins' },
    { id: 18, name: 'Magnesium Oxide 400mg Tablets', category: 'Vitamins' },
    { id: 19, name: 'Turmeric Curcumin with Black Pepper 1500mg', category: 'Vitamins' },
    { id: 20, name: 'L-Arginine & L-Citrulline Complex', category: 'Vitamins' },
    { id: 21, name: 'Zinc Picolinate 30mg Capsules', category: 'Vitamins' },
    { id: 22, name: 'Vitamin E 400 IU Softgels (D-Alpha Tocopherol)', category: 'Vitamins' },
    { id: 23, name: 'Ashwagandha KSM-66 Stress & Mood Support', category: 'Vitamins' },
    { id: 24, name: 'Hydrolyzed Bovine Collagen Peptides', category: 'Vitamins' },
    { id: 25, name: 'St. John\'s Wort Extract 300mg', category: 'Vitamins' },
    { id: 26, name: 'Selenium 100 mcg Tablets', category: 'Vitamins' },
    { id: 27, name: 'L-Theanine 200mg Capsules', category: 'Vitamins' },
    { id: 28, name: 'Alpha Lipoic Acid (ALA) 600mg', category: 'Vitamins' },
    { id: 29, name: 'Milk Thistle Standardized Extract', category: 'Vitamins' },
    { id: 30, name: 'Red Yeast Rice Extract 600mg', category: 'Vitamins' },
    { id: 31, name: 'Creatine Monohydrate Powder (Unflavored)', category: 'Vitamins' },
    { id: 32, name: 'Whey Protein Concentrate (Chocolate)', category: 'Vitamins' },
    { id: 33, name: 'Garcinia Cambogia Extract Capsules', category: 'Vitamins' },
    { id: 34, name: 'Resveratrol 500mg Antioxidant', category: 'Vitamins' },
    { id: 35, name: 'Green Tea Extract EGCG Capsules', category: 'Vitamins' },
    { id: 36, name: 'Inositol Powder (Myo & D-Chiro)', category: 'Vitamins' },
    { id: 37, name: 'Psyllium Husk Fiber Powder (Orange Flavor)', category: 'Vitamins' },
    { id: 38, name: 'Elderberry Immune Support Syrup', category: 'Vitamins' },
    { id: 39, name: 'GABA 750mg Calming Support', category: 'Vitamins' },
    { id: 40, name: 'Chasteberry (Vitex) Capsules', category: 'Vitamins' },
    { id: 41, name: 'DHEA 50mg Tablets', category: 'Vitamins' },
    { id: 42, name: 'L-Carnitine 500mg Tartrate', category: 'Vitamins' },
    { id: 43, name: 'Cranberry Extract PACs Capsules', category: 'Vitamins' },
    { id: 44, name: 'Lactase Enzyme Tablets (Dairy Digestion)', category: 'Vitamins' },
    { id: 45, name: 'Saccharomyces Boulardii Probiotic', category: 'Vitamins' },
    { id: 46, name: 'Quercetin 500mg with Bromelain', category: 'Vitamins' },
    { id: 47, name: 'N-Acetyl Cysteine (NAC) 1000mg', category: 'Vitamins' },
    { id: 48, name: 'Boron 3mg Tablets', category: 'Vitamins' },
    { id: 49, name: 'Silymarin Milk Thistle Extract', category: 'Vitamins' },
    { id: 50, name: 'DIM Diindolylmethane 200mg', category: 'Vitamins' },
    { id: 51, name: 'Super Enzyme Complex with Betaine HCl', category: 'Vitamins' },
    { id: 52, name: 'Spirulina Powder (Blue-Green Algae)', category: 'Vitamins' },
    { id: 53, name: 'Flaxseed Oil Softgels (Cold Pressed)', category: 'Vitamins' },
    { id: 54, name: 'Krill Oil Red Softgels', category: 'Vitamins' },
    { id: 55, name: 'Evening Primrose Oil (EPO) 1300mg', category: 'Vitamins' },
    { id: 56, name: 'Licorice Root Extract Capsules', category: 'Vitamins' },
    { id: 57, name: 'Cayenne Pepper Extract Capsules', category: 'Vitamins' },
    { id: 58, name: 'Astragalus Root Extract', category: 'Vitamins' },
    { id: 59, name: 'Maca Root Powder (Organic)', category: 'Vitamins' },
    { id: 60, name: 'Echinacea & Goldenseal Drops', category: 'Vitamins' },
    { id: 61, name: 'Bee Pollen Granules', category: 'Vitamins' },
    { id: 62, name: 'Royal Jelly Capsules', category: 'Vitamins' },
    { id: 63, name: 'Garlic Supplement (Odorless)', category: 'Vitamins' },
    { id: 64, name: 'Chlorophyll Liquid Drops (Mint)', category: 'Vitamins' },
    { id: 65, name: 'Potassium Gluconate 99mg Tablets', category: 'Vitamins' },
    { id: 66, name: 'Magnesium Citrate Drink Mix (Raspberry)', category: 'Vitamins' },
    { id: 67, name: 'Super B-Complex Time-Release Tablets', category: 'Vitamins' },
    { id: 68, name: 'Probiotic Gummy for Kids', category: 'Vitamins' },
    { id: 69, name: 'Iron Liquid Supplement (Cherry Flavor)', category: 'Vitamins' },
    { id: 70, name: 'Vitamin A 8,000 IU Softgels', category: 'Vitamins' },
    { id: 71, name: 'Biotin & Collagen Liquid Drops', category: 'Vitamins' },
    { id: 72, name: 'Multivitamin for Men 50+', category: 'Vitamins' },
    { id: 73, name: 'Tart Cherry Extract Capsules', category: 'Vitamins' },
    { id: 74, name: 'Activated Charcoal Capsules', category: 'Vitamins' },
    { id: 75, name: 'Hydrolyzed Marine Collagen Powder', category: 'Vitamins' },
  
    // --- Medications (76-200) ---
    // Pain Relief / Fever / Anti-inflammatory
    { id: 76, name: 'Acetaminophen 325mg Tablets', category: 'Medications' },
    { id: 77, name: 'Acetaminophen 650mg Extended Release Caplets', category: 'Medications' },
    { id: 78, name: 'Ibuprofen 400mg Prescription Strength Tablets', category: 'Medications' },
    { id: 79, name: 'Ibuprofen 100mg/5ml Suspension (Children\'s)', category: 'Medications' },
    { id: 80, name: 'Naproxen Sodium 220mg Liquid Gels', category: 'Medications' },
    { id: 81, name: 'Aspirin 325mg Tablets (Uncoated)', category: 'Medications' },
    { id: 82, name: 'Aspirin 81mg Chewable Tablets (Low Dose)', category: 'Medications' },
    { id: 83, name: 'Topical Pain Relief Cream with Trolamine Salicylate', category: 'Medications' },
    { id: 84, name: 'Lidocaine 5% Topical Patch', category: 'Medications' },
    { id: 85, name: 'Capsaicin 0.025% Cream', category: 'Medications' },
    { id: 86, name: 'Migraine Relief Caplets (Triptan Class, Generic Name)', category: 'Medications' },
  
    // Cold, Cough, Allergy & Sinus
    { id: 87, name: 'Loratadine 10mg Non-Drowsy Tablets', category: 'Medications' },
    { id: 88, name: 'Cetirizine 10mg HCL Tablets', category: 'Medications' },
    { id: 89, name: 'Diphenhydramine 50mg Capsules', category: 'Medications' },
    { id: 90, name: 'Fexofenadine 180mg Non-Drowsy Tablets', category: 'Medications' },
    { id: 91, name: 'Dextromethorphan HBr 30mg Extended Release Capsules', category: 'Medications' },
    { id: 92, name: 'Guaifenesin 1200mg Extended Release Tablets', category: 'Medications' },
    { id: 93, name: 'Pseudoephedrine 30mg Tablets', category: 'Medications' },
    { id: 94, name: 'Saline Nasal Spray (Preservative Free)', category: 'Medications' },
    { id: 95, name: 'Oxymetazoline HCl Nasal Decongestant Spray', category: 'Medications' },
    { id: 96, name: 'Hydrocodone/Acetaminophen (Mock Rx Only)', category: 'Medications' },
    { id: 97, name: 'Amoxicillin 500mg Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 98, name: 'Azithromycin 250mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 99, name: 'Ciprofloxacin 500mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 100, name: 'Cold & Flu Severe Multi-Symptom Relief Tablets', category: 'Medications' },
    { id: 101, name: 'Cough Suppressant Drops (Menthol)', category: 'Medications' },
    { id: 102, name: 'Fluticasone Propionate 50mcg Nasal Spray', category: 'Medications' },
    { id: 103, name: 'Triamcinolone Acetonide Nasal Spray', category: 'Medications' },
  
    // Gastrointestinal & Digestive
    { id: 104, name: 'Omeprazole 20mg Delayed Release Capsules (42ct)', category: 'Medications' },
    { id: 105, name: 'Famotidine 20mg Acid Reducer Tablets', category: 'Medications' },
    { id: 106, name: 'Lansoprazole 15mg Capsules (PPI)', category: 'Medications' },
    { id: 107, name: 'Calcium Carbonate Antacid 750mg Chewables', category: 'Medications' },
    { id: 108, name: 'Bismuth Subsalicylate 525mg Caplets (Anti-Diarrheal)', category: 'Medications' },
    { id: 109, name: 'Loperamide HCl 2mg Anti-Diarrheal Tablets', category: 'Medications' },
    { id: 110, name: 'Polyethylene Glycol 3350 Osmotic Laxative Powder', category: 'Medications' },
    { id: 111, name: 'Docusate Sodium 250mg Liquid Gels (Stool Softener)', category: 'Medications' },
    { id: 112, name: 'Glycerin Suppositories (Adult)', category: 'Medications' },
    { id: 113, name: 'Simethicone 180mg Ultra Strength Softgels', category: 'Medications' },
    { id: 114, name: 'Meclizine 25mg Anti-Nausea/Motion Sickness', category: 'Medications' },
    { id: 115, name: 'Phenylephrine HCl/Bismuth Subgallate Hemorrhoidal Ointment', category: 'Medications' },
    { id: 116, name: 'Fiber Laxative Gummies', category: 'Medications' },
  
    // Dermatology / Topicals
    { id: 117, name: 'Hydrocortisone 1% Anti-Itch Cream (Maximum Strength)', category: 'Medications' },
    { id: 118, name: 'Benzoyl Peroxide 10% Acne Treatment Gel', category: 'Medications' },
    { id: 119, name: 'Salicylic Acid 2% Acne Face Wash', category: 'Medications' },
    { id: 120, name: 'Clotrimazole 1% Antifungal Cream', category: 'Medications' },
    { id: 121, name: 'Terbinafine HCl 1% Antifungal Cream (Foot)', category: 'Medications' },
    { id: 122, name: 'Docosanol 10% Cold Sore Treatment Cream', category: 'Medications' },
    { id: 123, name: 'Povidone-Iodine Antiseptic Solution', category: 'Medications' },
    { id: 124, name: 'Silver Sulfadiazine Cream (Mock Rx Only)', category: 'Medications' },
    { id: 125, name: 'Mupirocin 2% Ointment (Mock Rx Only)', category: 'Medications' },
    { id: 126, name: 'A&D Original Ointment (Skin Protectant)', category: 'Medications' },
    { id: 127, name: 'Petroleum Jelly Skin Protectant', category: 'Medications' },
    { id: 128, name: 'Eczema Therapy Moisturizing Cream (Colloidal Oatmeal)', category: 'Medications' },
    { id: 129, name: 'Anti-Itch Calamine Lotion', category: 'Medications' },
  
    // Other Medications / Rx
    { id: 130, name: 'Sildenafil 100mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 131, name: 'Tadalafil 20mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 132, name: 'Levonorgestrel Emergency Contraceptive Tablet', category: 'Medications' },
    { id: 133, name: 'Smoking Cessation Nicotine Transdermal Patch (Step 1)', category: 'Medications' },
    { id: 134, name: 'Minoxidil 5% Topical Solution (Hair Regrowth)', category: 'Medications' },
    { id: 135, name: 'Diphenhydramine 25mg Sleep Aid Caplets', category: 'Medications' },
    { id: 136, name: 'Doxylamine Succinate 25mg Sleep Aid Tablets', category: 'Medications' },
    { id: 137, name: 'Finasteride 5mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 138, name: 'Insulin Glargine Pen (Mock Rx Only)', category: 'Medications' },
    { id: 139, name: 'Metformin 500mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 140, name: 'Atorvastatin 20mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 141, name: 'Lisinopril 10mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 142, name: 'Gabapentin 300mg Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 143, name: 'Alprazolam 0.5mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 144, name: 'Sertraline 50mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 145, name: 'Levothyroxine 100mcg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 146, name: 'Montelukast 10mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 147, name: 'Ophthalmic Sodium Chloride 5% Ointment', category: 'Medications' },
    { id: 148, name: 'Polymyxin B/Bacitracin Zinc Ophthalmic Ointment', category: 'Medications' },
    { id: 149, name: 'Ear Wax Removal Drops (Carbamide Peroxide)', category: 'Medications' },
    { id: 150, name: 'Pinworm Treatment Liquid (Pyrantel Pamoate)', category: 'Medications' },
    { id: 151, name: 'Metronidazole 500mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 152, name: 'Amoxicillin/Clavulanate 875mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 153, name: 'Prednisone 10mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 154, name: 'Hydrochlorothiazide 25mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 155, name: 'Losartan 50mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 156, name: 'Furosemide 20mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 157, name: 'Fluoxetine 20mg Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 158, name: 'Duloxetine 30mg Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 159, name: 'Buspirone 10mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 160, name: 'Clonazepam 1mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 161, name: 'Warfarin 5mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 162, name: 'Clopidogrel 75mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 163, name: 'Omeprazole 40mg Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 164, name: 'Ranitidine 150mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 165, name: 'Diclofenac 50mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 166, name: 'Cyclobenzaprine 10mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 167, name: 'Tizanidine 4mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 168, name: 'Oxybutynin 5mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 169, name: 'Tolterodine 2mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 170, name: 'Propranolol 40mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 171, name: 'Amlodipine 5mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 172, name: 'Carvedilol 6.25mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 173, name: 'Spironolactone 25mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 174, name: 'Allopurinol 300mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 175, name: 'Colchicine 0.6mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 176, name: 'Benazepril 10mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 177, name: 'Diltiazem 120mg Extended Release Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 178, name: 'Hydroxyzine 25mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 179, name: 'Dramamine (Dimenhydrinate) 50mg Tablets', category: 'Medications' },
    { id: 180, name: 'Tums (Calcium Carbonate) Chewy Bites', category: 'Medications' },
    { id: 181, name: 'Nexium (Esomeprazole) 20mg Capsules', category: 'Medications' },
    { id: 182, name: 'Pepcid AC (Famotidine) 10mg Tablets', category: 'Medications' },
    { id: 183, name: 'Imodium (Loperamide) A-D Caplets', category: 'Medications' },
    { id: 184, name: 'Dulcolax (Bisacodyl) Stool Softener', category: 'Medications' },
    { id: 185, name: 'Monistat (Miconazole) 7-Day Vaginal Cream', category: 'Medications' },
    { id: 186, name: 'Plan B One-Step (Levonorgestrel) Tablet', category: 'Medications' },
    { id: 187, name: 'Nix (Permethrin) Lice Treatment Kit', category: 'Medications' },
    { id: 188, name: 'Benadryl (Diphenhydramine) Children\'s Elixir', category: 'Medications' },
    { id: 189, name: 'Robitussin DM (Dextromethorphan/Guaifenesin) Syrup', category: 'Medications' },
    { id: 190, name: 'Abreva (Docosanol) Cold Sore Cream', category: 'Medications' },
    { id: 191, name: 'Preparation H Ointment (Hemorrhoid Relief)', category: 'Medications' },
    { id: 192, name: 'Urinary Pain Relief Tablets (Phenazopyridine)', category: 'Medications' },
    { id: 193, name: 'Bumetanide 1mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 194, name: 'Tramadol 50mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 195, name: 'Pregabalin 75mg Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 196, name: 'Gabapentin 100mg Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 197, name: 'Insulin Detemir Pen (Mock Rx Only)', category: 'Medications' },
    { id: 198, name: 'Rosuvastatin 10mg Tablets (Mock Rx Only)', category: 'Medications' },
    { id: 199, name: 'Clindamycin 300mg Capsules (Mock Rx Only)', category: 'Medications' },
    { id: 200, name: 'Baclofen 10mg Tablets (Mock Rx Only)', category: 'Medications' },
  
    // --- Personal Care & Hygiene (201-250) ---
    { id: 201, name: 'Anti-Gingivitis Mouthwash (Alcohol-Free)', category: 'Personal Care' },
    { id: 202, name: 'Whitening Toothpaste (Peroxide Formula)', category: 'Personal Care' },
    { id: 203, name: 'Sonicare Toothbrush Replacement Heads (Sensitive)', category: 'Personal Care' },
    { id: 204, name: 'Water Flosser Jet Tips (4-pack)', category: 'Personal Care' },
    { id: 205, name: 'Interdental Brushes (Assorted Sizes)', category: 'Personal Care' },
    { id: 206, name: 'Floss Threaders for Braces (50-pack)', category: 'Personal Care' },
    { id: 207, name: 'Clinical Strength Antiperspirant Stick (Unscented)', category: 'Personal Care' },
    { id: 208, name: 'Exfoliating Body Wash (Salicylic Acid)', category: 'Personal Care' },
    { id: 209, name: 'Foaming Hand Soap Refill (Citrus Scent)', category: 'Personal Care' },
    { id: 210, name: 'Body Lotion for Sensitive Skin (Fragrance-Free)', category: 'Personal Care' },
    { id: 211, name: 'Dandruff Shampoo (Selenium Sulfide)', category: 'Personal Care' },
    { id: 212, name: 'Conditioner (Color-Safe, Sulfate-Free)', category: 'Personal Care' },
    { id: 213, name: 'Minoxidil 2% Topical Solution for Women', category: 'Personal Care' },
    { id: 214, name: 'Ingrown Hair Treatment Serum', category: 'Personal Care' },
    { id: 215, name: 'Antifungal Foot Powder', category: 'Personal Care' },
    { id: 216, name: 'Callus Shaver Kit', category: 'Personal Care' },
    { id: 217, name: 'Alcohol Wipes (Individual Packets)', category: 'Personal Care' },
    { id: 218, name: 'Lip Balm SPF 15 (Mint)', category: 'Personal Care' },
    { id: 219, name: 'Reading Glasses (+1.75 Diopter, Blue Light Blocking)', category: 'Personal Care' },
    { id: 220, name: 'Contact Lens Rewetting Drops', category: 'Personal Care' },
    { id: 221, name: 'Hearing Aid Wax Guards', category: 'Personal Care' },
    { id: 222, name: 'Cotton Balls (Sterile, 200 count)', category: 'Personal Care' },
    { id: 223, name: 'Astringent (Witch Hazel)', category: 'Personal Care' },
    { id: 224, name: 'Hair Comb (Wide-Toothed)', category: 'Personal Care' },
    { id: 225, name: 'Hair Brush (Detangling Wet Brush)', category: 'Personal Care' },
    { id: 226, name: 'Shaving Oil (Pre-Shave)', category: 'Personal Care' },
    { id: 227, name: 'Disposable Shaving Razors (5-Blade, Mens)', category: 'Personal Care' },
    { id: 228, name: 'Feminine Deodorant Spray', category: 'Personal Care' },
    { id: 229, name: 'Tampons (Regular Absorbency, Applicator Free)', category: 'Personal Care' },
    { id: 230, name: 'Incontinence Pads (Moderate Absorbency)', category: 'Personal Care' },
    { id: 231, name: 'Overnight Incontinence Underwear (Large)', category: 'Personal Care' },
    { id: 232, name: 'Bedside Urinal Bottle (Male)', category: 'Personal Care' },
    { id: 233, name: 'Bedside Urinal Bottle (Female)', category: 'Personal Care' },
    { id: 234, name: 'Hand Sanitizer Gel (Aloe Vera, Pump Bottle)', category: 'Personal Care' },
    { id: 235, name: 'Surgical Face Masks (Disposable, 100 count)', category: 'Personal Care' },
    { id: 236, name: 'Disposable Nitrile Exam Gloves (Large, 100 count)', category: 'Personal Care' },
    { id: 237, name: 'Disinfecting Wipes (Hospital Grade)', category: 'Personal Care' },
    { id: 238, name: 'Shoe Insoles (Memory Foam, Arch Support)', category: 'Personal Care' },
    { id: 239, name: 'Heel Cushions (Silicone Gel)', category: 'Personal Care' },
    { id: 240, name: 'Sleep Mask (Contoured)', category: 'Personal Care' },
    { id: 241, name: 'Vaporizer (Warm Mist)', category: 'Personal Care' },
    { id: 242, name: 'Humidifier (Cool Mist, 1 Gallon)', category: 'Personal Care' },
    { id: 243, name: 'Diffuser Refill Pads', category: 'Personal Care' },
    { id: 244, name: 'Aromatherapy Essential Oil (Peppermint)', category: 'Personal Care' },
    { id: 245, name: 'Hot/Cold Therapy Eye Mask', category: 'Personal Care' },
    { id: 246, name: 'Hair Dye Kit (Black)', category: 'Personal Care' },
    { id: 247, name: 'Lice & Nit Removal Comb (Metal)', category: 'Personal Care' },
    { id: 248, name: 'Permethrin 1% Lice Treatment Shampoo', category: 'Personal Care' },
    { id: 249, name: 'Teeth Whitening Strips (14-Day Treatment)', category: 'Personal Care' },
    { id: 250, name: 'Denture Cleansing Tablets', category: 'Personal Care' },
  
    // --- Skin Care (251-300) ---
    { id: 251, name: 'Hyaluronic Acid 2% + B5 Hydrating Serum', category: 'Skin Care' },
    { id: 252, name: 'Retinol 1% Cream (Wrinkle Reduction)', category: 'Skin Care' },
    { id: 253, name: 'Vitamin C Serum (L-Ascorbic Acid 15%)', category: 'Skin Care' },
    { id: 254, name: 'Niacinamide 10% + Zinc 1% Serum', category: 'Skin Care' },
    { id: 255, name: 'Tinted Mineral Sunscreen SPF 30 (Zinc Oxide)', category: 'Skin Care' },
    { id: 256, name: 'Acne Spot Treatment with Sulfur', category: 'Skin Care' },
    { id: 257, name: 'Oil-Free Mattifying Moisturizer', category: 'Skin Care' },
    { id: 258, name: 'Cream Cleanser for Dry Skin', category: 'Skin Care' },
    { id: 259, name: 'Gentle Micellar Water Cleanser (Large Bottle)', category: 'Skin Care' },
    { id: 260, name: 'Facial Toner (Salicylic Acid)', category: 'Skin Care' },
    { id: 261, name: 'Clay Detox Mask (Kaolin & Bentonite)', category: 'Skin Care' },
    { id: 262, name: 'Eye Cream with Caffeine (Depuffing)', category: 'Skin Care' },
    { id: 263, name: 'Body Sunscreen Spray SPF 50 (Water Resistant)', category: 'Skin Care' },
    { id: 264, name: 'Psoriasis Relief Ointment (Coal Tar)', category: 'Skin Care' },
    { id: 265, name: 'Diabetic Foot Cream', category: 'Skin Care' },
    { id: 266, name: 'Heavy Duty Hand Repair Balm (Cracked Skin)', category: 'Skin Care' },
    { id: 267, name: 'Stretch Mark Oil (Bio-Oil formulation)', category: 'Skin Care' },
    { id: 268, name: 'Silicone Scar Sheets (Reusable)', category: 'Skin Care' },
    { id: 269, name: 'After Sun Aloe Vera Gel with Lidocaine', category: 'Skin Care' },
    { id: 270, name: 'Lactic Acid 10% Exfoliating Serum', category: 'Skin Care' },
    { id: 271, name: 'Glycolic Acid 7% Toning Solution', category: 'Skin Care' },
    { id: 272, name: 'Azelaic Acid Suspension 10%', category: 'Skin Care' },
    { id: 273, name: 'Squalane Oil (100% Plant-Derived)', category: 'Skin Care' },
    { id: 274, name: 'Rosehip Seed Oil (Organic)', category: 'Skin Care' },
    { id: 275, name: 'Eye Make-up Remover (Oil-Free)', category: 'Skin Care' },
    { id: 276, name: 'Facial Cleansing Wipes (Cucumber)', category: 'Skin Care' },
    { id: 277, name: 'Night Cream (Thick, Restorative)', category: 'Skin Care' },
    { id: 278, name: 'Tinted Lip Balm SPF 30 (Berry)', category: 'Skin Care' },
    { id: 279, name: 'Sunless Tanning Lotion', category: 'Skin Care' },
    { id: 280, name: 'Tattoo Aftercare Balm', category: 'Skin Care' },
    { id: 281, name: 'Body Powder (Corn Starch Base)', category: 'Skin Care' },
    { id: 282, name: 'Ingrown Toenail Relief Drops', category: 'Skin Care' },
    { id: 283, name: 'Wound Closure Strips (Sterile, 1/4 inch)', category: 'Skin Care' },
    { id: 284, name: 'Surgical Skin Prep Swabs (Chlorhexidine)', category: 'Skin Care' },
    { id: 285, name: 'Disposable Facial Razors (Dermaplaning)', category: 'Skin Care' },
    { id: 286, name: 'Blemish Patches (Tea Tree Infused)', category: 'Skin Care' },
    { id: 287, name: 'Facial Roller (Jade Stone)', category: 'Skin Care' },
    { id: 288, name: 'Chemical Peel Solution (Salicylic/Glycolic Mix)', category: 'Skin Care' },
    { id: 289, name: 'Body Acne Spray (Back & Chest)', category: 'Skin Care' },
    { id: 290, name: 'Shaving Bump Treatment Solution', category: 'Skin Care' },
    { id: 291, name: 'Anti-Pollution Face Mist', category: 'Skin Care' },
    { id: 292, name: 'Thermal Water Spray (Soothing)', category: 'Skin Care' },
    { id: 293, name: 'Calamine Lotion for Poison Ivy', category: 'Skin Care' },
    { id: 294, name: 'Anti-Fungal Nail Lacquer', category: 'Skin Care' },
    { id: 295, name: 'Intense Moisturizing Gloves (Overnight)', category: 'Skin Care' },
    { id: 296, name: 'Lip Plumping Gloss', category: 'Skin Care' },
    { id: 297, name: 'Self-Tanner Mitt Applicator', category: 'Skin Care' },
    { id: 298, name: 'Facial Steamer Device', category: 'Skin Care' },
    { id: 299, name: 'Collagen Sheet Mask (Hydrating)', category: 'Skin Care' },
    { id: 300, name: 'Dermatologist-Recommended Cleansing Brush', category: 'Skin Care' },
  
    // --- Medical Equipment & Health Monitors (301-350) ---
    { id: 301, name: 'Automatic Blood Pressure Monitor (Upper Arm, XL Cuff)', category: 'Medical Equipment' },
    { id: 302, name: 'Bluetooth Smart Scale (Body Composition)', category: 'Health Monitors' },
    { id: 303, name: 'Forehead/Ear Thermometer (Dual Mode)', category: 'Health Monitors' },
    { id: 304, name: 'Continuous Glucose Monitoring (CGM) Sensor Kit', category: 'Health Monitors' },
    { id: 305, name: 'Lancet Device (Adjustable Depth)', category: 'Medical Equipment' },
    { id: 306, name: 'Diabetic Test Strips (50 count)', category: 'Health Monitors' },
    { id: 307, name: 'Kinesiology Tape (Black, 2-inch roll)', category: 'Medical Equipment' },
    { id: 308, name: 'Adjustable Wrist Brace (Carpal Tunnel)', category: 'Medical Equipment' },
    { id: 309, name: 'Ankle Stirrup Brace (Post-Injury)', category: 'Medical Equipment' },
    { id: 310, name: 'Lumbar Support Belt (Heat/Cold Pocket)', category: 'Medical Equipment' },
    { id: 311, name: 'Compression Stockings (30-40 mmHg, Knee High)', category: 'Medical Equipment' },
    { id: 312, name: 'Reusable Hot/Cold Gel Pack (Shoulder Wrap)', category: 'Medical Equipment' },
    { id: 313, name: 'Mobility Walker (Folding, Wheels)', category: 'Medical Equipment' },
    { id: 314, name: 'Quad Cane Tip Replacement (Rubber)', category: 'Medical Equipment' },
    { id: 315, name: 'Portable Oxygen Concentrator (Mock Rx Only)', category: 'Medical Equipment' },
    { id: 316, name: 'Inhaler Spacer with Mask (Child Size)', category: 'Medical Equipment' },
    { id: 317, name: 'CPAP Machine Filter Replacements (6-pack)', category: 'Medical Equipment' },
    { id: 318, name: 'Tracheostomy Care Kit', category: 'Medical Equipment' },
    { id: 319, name: 'Urinary Catheter Kit (Foley, 16 Fr)', category: 'Medical Equipment' },
    { id: 320, name: 'Colostomy Bag System (2-Piece)', category: 'Medical Equipment' },
    { id: 321, name: 'Pill Splitter (V-Grip)', category: 'Medical Equipment' },
    { id: 322, name: 'Pill Crusher/Grinder with Pouch', category: 'Medical Equipment' },
    { id: 323, name: '7-Day AM/PM Pill Organizer (Large Compartments)', category: 'Medical Equipment' },
    { id: 324, name: 'Sharps Disposal Container (1 Quart)', category: 'Medical Equipment' },
    { id: 325, name: 'Alcohol Prep Pads (Large, Sterile, 200 count)', category: 'Medical Equipment' },
    { id: 326, name: 'Tongue Depressors (Non-Sterile, 100-pack)', category: 'Medical Equipment' },
    { id: 327, name: 'Stethoscope (Dual Head, Black)', category: 'Medical Equipment' },
    { id: 328, name: 'Otoscope Kit (Diagnostic Ear Scope)', category: 'Medical Equipment' },
    { id: 329, name: 'Reflex Hammer (Taylor Style)', category: 'Medical Equipment' },
    { id: 330, name: 'Medical Penlight (Reusable)', category: 'Medical Equipment' },
    { id: 331, name: 'CPR Barrier Mask (Keyring Pouch)', category: 'Medical Equipment' },
    { id: 332, name: 'Disposable Shoe Covers (Non-Skid, 50-pair)', category: 'Medical Equipment' },
    { id: 333, name: 'Biohazard Waste Bags (Red, 10 Gallon)', category: 'Medical Equipment' },
    { id: 334, name: 'Patient Lift Sling (Universal)', category: 'Medical Equipment' },
    { id: 335, name: 'Transfer Bench for Bathtub', category: 'Medical Equipment' },
    { id: 336, name: 'Grab Bar (Suction Cup, Removable)', category: 'Medical Equipment' },
    { id: 337, name: 'Electric Wheelchair (Folding, Lightweight)', category: 'Medical Equipment' },
    { id: 338, name: 'Diabetic Socks (Non-Binding, White)', category: 'Medical Equipment' },
    { id: 339, name: 'Needle Disposal Kit (Portable)', category: 'Medical Equipment' },
    { id: 340, name: 'Urine Test Strips (pH/Ketone/Protein)', category: 'Health Monitors' },
    { id: 341, name: 'Home Drug Test Kit (5-Panel)', category: 'Health Monitors' },
    { id: 342, name: 'Sleep Apnea Monitoring Ring', category: 'Health Monitors' },
    { id: 343, name: 'Digital Peak Flow Meter (Asthma)', category: 'Health Monitors' },
    { id: 344, name: 'Baby Safety Gate (Pressure Mounted)', category: 'Medical Equipment' },
    { id: 345, name: 'Therapy Putty (Extra Soft)', category: 'Medical Equipment' },
    { id: 346, name: 'Reusable Ice Bag (Fabric)', category: 'Medical Equipment' },
    { id: 347, name: 'Instant Hand Warmers (10-pack)', category: 'Medical Equipment' },
    { id: 348, name: 'Pillow Case (Hypoallergenic)', category: 'Medical Equipment' },
    { id: 349, name: 'Magnifying Glass with LED Light', category: 'Medical Equipment' },
    { id: 350, name: 'Syringe for Oral Medication (5mL)', category: 'Medical Equipment' },
  
    // --- First Aid (351-400) ---
    { id: 351, name: 'Emergency First Aid Kit (150-Piece)', category: 'First Aid' },
    { id: 352, name: 'Adhesive Fabric Bandages (Assorted Sizes, 250 count)', category: 'First Aid' },
    { id: 353, name: 'Heavy-Duty Waterproof Bandages', category: 'First Aid' },
    { id: 354, name: 'Butterfly Wound Closures (10-pack)', category: 'First Aid' },
    { id: 355, name: 'Sterile Gauze Pads (4x4 inch, 100 count)', category: 'First Aid' },
    { id: 356, name: 'Non-Adherent Dressings (3x4 inch)', category: 'First Aid' },
    { id: 357, name: 'Roller Gauze Bandage (2 inch wide)', category: 'First Aid' },
    { id: 358, name: 'Surgical Adhesive Tape (Cloth, 2 inch)', category: 'First Aid' },
    { id: 359, name: 'Elastic Cohesive Bandage (3 inch, Blue)', category: 'First Aid' },
    { id: 360, name: 'Trauma Dressing Pad (Large, Sterile)', category: 'First Aid' },
    { id: 361, name: 'Burn Gel Dressing (4x4 inch)', category: 'First Aid' },
    { id: 362, name: 'Antiseptic Towelettes (Benzalkonium Chloride)', category: 'First Aid' },
    { id: 363, name: 'Triple Antibiotic Ointment (Single Use Packets)', category: 'First Aid' },
    { id: 364, name: 'Hydrogel Wound Dressing', category: 'First Aid' },
    { id: 365, name: 'Liquid Bandage Spray (Flexible Seal)', category: 'First Aid' },
    { id: 366, name: 'Sting Relief Swabs (Hydrocortisone)', category: 'First Aid' },
    { id: 367, name: 'Instant Cold Pack (Large, Disposable)', category: 'First Aid' },
    { id: 368, name: 'Poison Ivy/Oak Relief Spray', category: 'First Aid' },
    { id: 369, name: 'Tick Removal Kit (Fine-tipped Tweezers)', category: 'First Aid' },
    { id: 370, name: 'Mouth Guard (Boil & Bite, Sport)', category: 'First Aid' },
    { id: 371, name: 'Eye Wash Cup and Solution Kit', category: 'First Aid' },
    { id: 372, name: 'Medical Scissors (Blunt-Tip)', category: 'First Aid' },
    { id: 373, name: 'Tweezers (Slanted Tip, Stainless Steel)', category: 'First Aid' },
    { id: 374, name: 'Splinter Removal Kit', category: 'First Aid' },
    { id: 375, name: 'Moleskin Padding Roll (4.5 inch wide)', category: 'First Aid' },
    { id: 376, name: 'Blister Cushions (Hydrocolloid)', category: 'First Aid' },
    { id: 377, name: 'First Aid Manual (Pocket Guide)', category: 'First Aid' },
    { id: 378, name: 'Hemostatic Gauze (Mock Trauma Kit Item)', category: 'First Aid' },
    { id: 379, name: 'Emergency Thermal Blanket', category: 'First Aid' },
    { id: 380, name: 'Biofreeze Pain Relief Gel', category: 'First Aid' },
    { id: 381, name: 'Isopropyl Alcohol 70% (Pint Bottle)', category: 'First Aid' },
    { id: 382, name: 'Hydrogen Peroxide Solution (Large Bottle)', category: 'First Aid' },
    { id: 383, name: 'Epsom Salt (Magnesium Sulfate)', category: 'First Aid' },
    { id: 384, name: 'Saline Wound Wash Spray', category: 'First Aid' },
    { id: 385, name: 'Dental First Aid Kit (Temporary Filling)', category: 'First Aid' },
    { id: 386, name: 'Antiseptic Skin Cleanser (Chlorhexidine Gluconate)', category: 'First Aid' },
    { id: 387, name: 'Sunburn Relief Spray (Benzocaine)', category: 'First Aid' },
    { id: 388, name: 'Medical Tourniquet (Quick Release)', category: 'First Aid' },
    { id: 389, name: 'Wound Dressing Change Tray (Sterile)', category: 'First Aid' },
    { id: 390, name: 'Non-Woven Sponges (2x2 inch, 200 count)', category: 'First Aid' },
    { id: 391, name: 'Gauze Wrap (Stretched, 6 inch)', category: 'First Aid' },
    { id: 392, name: 'Zinc Oxide Tape (Strong Adhesive)', category: 'First Aid' },
    { id: 393, name: 'Adhesive Remover Wipes', category: 'First Aid' },
    { id: 394, name: 'First Aid Burn Cream (Water-Based)', category: 'First Aid' },
    { id: 395, name: 'Iodine Solution (Tincture)', category: 'First Aid' },
    { id: 396, name: 'Sterile Water for Irrigation (Single Use)', category: 'First Aid' },
    { id: 397, name: 'Finger Splints (Assorted Sizes)', category: 'First Aid' },
    { id: 398, name: 'Cold Sore Patch (Healing)', category: 'First Aid' },
    { id: 399, name: 'Eye Shield (Plastic, Vented)', category: 'First Aid' },
    { id: 400, name: 'Non-Latex Gloves (Medium, 100 count)', category: 'First Aid' },
  
    // --- Baby Care (401-410) ---
    { id: 401, name: 'Infant Gas Relief Drops (Simethicone)', category: 'Baby Care' },
    { id: 402, name: 'Pediatric Oral Rehydration Solution (Grape)', category: 'Baby Care' },
    { id: 403, name: 'Baby Zinc Oxide Diaper Rash Ointment (Max Strength)', category: 'Baby Care' },
    { id: 404, name: 'Baby Bath Tub (Folding)', category: 'Baby Care' },
    { id: 405, name: 'Infant Digital Forehead Thermometer', category: 'Baby Care' },
    { id: 406, name: 'Baby Nail Clippers with Safety Guard', category: 'Baby Care' },
    { id: 407, name: 'Pacifiers (Orthodontic, 2-pack)', category: 'Baby Care' },
    { id: 408, name: 'Bottle Warmer (Electric)', category: 'Baby Care' },
    { id: 409, name: 'Gripe Water for Colic and Hiccups (Natural)', category: 'Baby Care' },
    { id: 410, name: 'Teething Gel (Non-Medicated, Benzocaine-Free)', category: 'Baby Care' }
  ];

  // Extract unique categories from mockResults
  const popularCategories = useMemo(() => {
    const categories = [...new Set(mockResults.map(item => item.category))];
    return categories.slice(0, 8); // Show first 8 categories
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    }
    
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [location.search]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const filteredResults = mockResults.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const openWhatsAppForProduct = (productName) => {
    const message = `Hello! I would like to purchase ${productName}.`;
    const url = `https://wa.me/${countryCode}${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const openWhatsAppForInquiry = () => {
    const message = searchQuery 
      ? `Hello! I'm looking for ${searchQuery}. Can you help me find it?`
      : `Hello! I need help finding a product.`;
    const url = `https://wa.me/${countryCode}${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Check if search query exists but no results found
  const hasNoResults = searchQuery && !isLoading && searchResults.length === 0;
  // Check if search query matches any item name (not just category)
  const isExactProductSearch = searchQuery && mockResults.some(item => 
    item.name.toLowerCase() === searchQuery.toLowerCase()
  );
  // Check if search query matches any category
  const isCategorySearch = searchQuery && popularCategories.some(category => 
    category.toLowerCase() === searchQuery.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 animate-gradient">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-medium"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow"></div>
      </div>

      {/* Search Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search products, vitamins, healthcare items..."
                  className="w-full px-6 py-4 pl-14 rounded-xl border-2 border-blue-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base bg-white/90 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  onClick={() => searchInputRef.current?.focus()}
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                >
                  <svg className="w-6 h-6 text-blue-500 hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200 hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </form>
            </div>

            {/* Back Button */}
            <Link 
              to="/"
              className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform animate-pulse-slow"
            >
              ← Back Home
            </Link>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {searchQuery && (
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Search Results for "{searchQuery}"
              {searchResults.length > 0 && (
                <span className="text-gray-600 text-lg font-normal ml-2">
                  ({searchResults.length} items found)
                </span>
              )}
            </h1>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-16 animate-pulse">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
              Searching for products...
            </p>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <button
                    onClick={() => openWhatsAppForProduct(item.name)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.02] animate-bounce-slow"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                    Purchase on WhatsApp
                  </button>
                </div>
              ))}
            </div>

            {/* Show WhatsApp inquiry button if search query doesn't match any exact product name */}
            {searchQuery && !isExactProductSearch && (
              <div className="mt-12 text-center animate-fade-in-up">
                <div className="inline-block p-4 bg-yellow-50 rounded-2xl mb-6 border border-yellow-200">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Note:</span> Couldn't find exact product "{searchQuery}"?
                  </p>
                  <p className="text-gray-600 text-sm">
                    We can check availability and pricing for you on WhatsApp
                  </p>
                </div>
                <button
                  onClick={openWhatsAppForInquiry}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.05] animate-pulse"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  Ask about "{searchQuery}" on WhatsApp
                </button>
              </div>
            )}
          </>
        ) : hasNoResults ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No products found for "{searchQuery}"</h3>
            <p className="text-gray-600 mb-8 text-lg">This product isn't in our catalog yet, but we can help you find it!</p>
            <button
              onClick={openWhatsAppForInquiry}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.05] animate-pulse"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              Ask for "{searchQuery}" on WhatsApp
            </button>
            
            {/* Suggest categories based on search */}
            <div className="mt-12 max-w-2xl mx-auto">
              <p className="text-gray-700 mb-4">You might be looking for:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {popularCategories
                  .filter(category => 
                    category.toLowerCase().includes(searchQuery.toLowerCase().substring(0, 3))
                  )
                  .slice(0, 4)
                  .map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSearchQuery(category);
                        navigate(`/search?q=${encodeURIComponent(category)}`);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-600 font-medium rounded-full hover:from-blue-200 hover:to-blue-100 transition-all duration-300 border border-blue-200"
                    >
                      {category}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-gradient-text">
              What are you looking for today?
            </h2>
            <p className="text-gray-600 mb-10 text-lg">Search for healthcare products, vitamins, medical equipment, and more</p>
            
            {/* Show categories from mockResults */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Browse by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                {popularCategories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSearchQuery(category);
                      navigate(`/search?q=${encodeURIComponent(category)}`);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium p-5 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 animate-slide-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                Showing {popularCategories.length} categories from our catalog
              </p>
            </div>

            {/* General WhatsApp button */}
            <div className="animate-fade-in-up">
              <p className="text-gray-600 mb-4 text-lg">Can't find what you're looking for?</p>
              <button
                onClick={() => {
                  const message = `Hello! I need help finding healthcare products.`;
                  const url = `https://wa.me/${countryCode}${whatsappNumber}?text=${encodeURIComponent(message)}`;
                  window.open(url, '_blank');
                }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.05] animate-pulse-slow"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                <span className="text-lg">Chat with us on WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(-15px); }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
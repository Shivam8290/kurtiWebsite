const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: "women Round Neck Cotton Top",
    description: "Comfortable cotton top for daily wear",
    price: 100,
    image: ["https://example.com/product2.webp"], // Placeholder
    category: "women",
    subcategory: "topwear",
    sizes: ["S","M","L"],
    bestseller: true
  },
  {
    name: "women Printed Kurti",
    description: "Stylish printed kurti for casual wear",
    price: 120,
    image: ["https://example.com/product2.webp"],
    category: "women",
    subcategory: "ethnic",
    sizes: ["S","M","L","XL"],
    bestseller: false
  },
  {
    name: "women Casual T-Shirt",
    description: "Soft cotton t-shirt for women",
    price: 150,
    image: ["https://example.com/product2.webp"],
    category: "women",
    subcategory: "topwear",
    sizes: ["M","L","XL"],
    bestseller: true
  },
  {
    name: "women Denim Jeans",
    description: "Slim fit blue denim jeans",
    price: 400,
    image: ["https://example.com/product2.webp"],
    category: "women",
    subcategory: "bottomwear",
    sizes: ["30","32","34","36"],
    bestseller: false
  },
  {
    name: "women Summer Dress",
    description: "Lightweight summer dress",
    price: 250,
    image: ["https://example.com/product2.webp"],
    category: "women",
    subcategory: "dress",
    sizes: ["S","M","L"],
    bestseller: true
  },
  {
    name: "women Formal Shirt",
    description: "Perfect shirt for office wear",
    price: 350,
    image: ["https://example.com/product2.webp"],
    category: "women",
    subcategory: "topwear",
    sizes: ["M","L","XL"],
    bestseller: false
  },
  {
    name: "Kids Cartoon T-Shirt",
    description: "Cute cartoon printed t-shirt for kids",
    price: 120,
    image: ["https://example.com/product2.webp"],
    category: "kids",
    subcategory: "topwear",
    sizes: ["S","M","L"],
    bestseller: true
  }
];

const seedDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/kurtiwebsite');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded');
  mongoose.connection.close();
};

seedDB();
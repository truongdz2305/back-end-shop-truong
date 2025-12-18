import express from "express";
import products from "./data/Products.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import User from "./Models/UserModel.js";
import Category from "./Models/CategoryModel.js";
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
    "/user",
    asyncHandler(async (req, res) => {
        await User.deleteMany({});
        const importUser = await User.insertMany(users);
        res.send({ importUser });
    })
);

ImportData.post(
    "/products",
    asyncHandler(async (req, res) => {
        await Product.deleteMany({});
        const importProducts = await Product.insertMany(products);
        res.send({ importProducts });
    })
);

// Seed categories
ImportData.post(
    "/categories",
    asyncHandler(async (req, res) => {
        await Category.deleteMany({});
        const categories = [
            { name: "Shoes", description: "All types of shoes" },
            { name: "Sneakers", description: "Sports and casual sneakers" },
            { name: "Slippers", description: "Comfortable slippers" },
            { name: "Boots", description: "Boots for all occasions" },
            { name: "Heels", description: "High heels and sandals" },
        ];
        const importCategories = await Category.insertMany(categories);
        res.send({ importCategories });
    })
);

// Seed all data
ImportData.post(
    "/all",
    asyncHandler(async (req, res) => {
        // Seed users
        await User.deleteMany({});
        const importUser = await User.insertMany(users);
        
        // Seed categories
        await Category.deleteMany({});
        const categories = [
            { name: "Shoes", description: "All types of shoes" },
            { name: "Sneakers", description: "Sports and casual sneakers" },
            { name: "Slippers", description: "Comfortable slippers" },
            { name: "Boots", description: "Boots for all occasions" },
            { name: "Heels", description: "High heels and sandals" },
        ];
        const importCategories = await Category.insertMany(categories);
        
        // Seed products
        await Product.deleteMany({});
        const importProducts = await Product.insertMany(products);
        
        res.send({
            message: "All data imported successfully",
            users: importUser,
            categories: importCategories,
            products: importProducts,
        });
    })
);

export default ImportData;

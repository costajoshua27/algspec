const { Module } = require('../models/module.model');
const { Category } = require('../models/category.model');

const createCategory = async (req, res) => {
  let {
    name
  } = req.body;

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    return res.status(200).send(newCategory);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const updateCategory = async (req, res) => {
  let {
    id,
    name
  } = req.body;

  try {
    // First check if the category doesn't exist, if so just create it
    const category = await Category.findById(id).exec();
    if (!category) {
      return createCategory(req, res);
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true }).exec();

    return res.status(200).send(updatedCategory);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const deleteCategory = async (req, res) => {
  let {
    name
  } = req.body;

  try {
    // First check if the category doesn't exist, if so, return 400
    const category = await Category.findOne({ name }).exec();
    if (!category) {
      return res.status(400).send({ message: `Category with name ${name} does not exist` });
    }

    // Save the original category id
    const originalId = category._id;

    const deletedCategory = await Category.findByIdAndDelete(category._id).exec();

    // Remove the category within all modules that have this category
    const modulesWithCategory = await Module.find({ categories: { $all: [originalId] } }).exec();
    for (let module of modulesWithCategory) {
      module.categories = module.categories.filter(val => val !== originalId);
      module.markModified('categories');
      await module.save();
    }

    return res.status(200).send(deletedCategory);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}).exec();
    return res.status(200).send(allCategories);
  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getCategory = async (req, res) => {
  let {
    id
  } = req.params;

  try {
    const category = await Category.findById(id).exec();
    if (!category) {
      return res.status(400).send({ message: `Category with id ${id} does not exist` });
    }

    return res.status(200).send(category);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error} `});
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategory
};
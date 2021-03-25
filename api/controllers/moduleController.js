const { Module } = require('../models/module.model');
const { Category } = require('../models/category.model');

const createModule = async (req, res) => {
  let {
    name,
    categories,
    description,
    introduction,
    solutions
  } = req.body;

  try {
    const newModule = new Module({ name, categories, description, introduction, solutions });
    await newModule.save();
    return res.status(200).send(newModule);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const updateModule = async (req, res) => {
  let {
    id,
    name,
    categories,
    description,
    introduction,
    solutions
  } = req.body;

  try {
    // First check if the module doesn't exist, if so just create it
    const module = await Module.findById(id).exec();
    if (!module) {
      return createModule(req, res);
    }

    const updatedModule = await Module.findByIdAndUpdate(module.id, 
                            { name, categories, description, introduction, solutions }, 
                            { new: true }).exec();
    return res.status(200).send(updatedModule);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const deleteModule = async (req, res) => {
  let {
    name
  } = req.body;

  try {
    // First check if the module doesn't exist, if so, return 400
    const module = await Module.findOne({ name }).exec();
    if (!module) {
      res.status(400).send({ message: `Module with name ${name} does not exist` });
    }

    const deletedModule = await Module.findByIdAndDelete(module.id).exec();
    return res.status(200).send(deletedModule);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getAllModules = async (req, res) => {
  try {
    const allModules = await Module.find({}).exec();
    return res.status(200).send(allModules);
  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getModule = async (req, res) => {
  let {
    id
  } = req.params;

  try {
    const module = await Module.findById(id).exec();
    if (!module) {
      res.status(400).send({ message: `Module with id ${id} does not exist` });
    }

    return res.status(200).send(module);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getModulesByCategories = async (req, res) => {
  let {
    categories
  } = req.params;

  try {
    // Validate that all provided categories are valid
    const allCategoryIds = categories.split(',');
    for (let categoryId of allCategoryIds) {
      const category = await Category.findById(categoryId).exec();
      if (!category) {
        return res.status(400).send({ message: `Catgegory with id ${categoryId} does not exist` });
      }
    }

    const selectedModules = await Module.find({ categories: { $all: categories  } });
    return res.status(200).send(selectedModules);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }

};

module.exports = {
  createModule,
  updateModule,
  deleteModule,
  getAllModules,
  getModule,
  getModulesByCategories
};
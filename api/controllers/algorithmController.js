const { Algorithm } = require('../models/algorithm.model');
const { Tag } = require('../models/tag.model');

const createAlgorithm = async (req, res) => {
  let {
    name,
    tags,
    introduction,
    overview,
    visualization,
    pseudocode,
    solutions
  } = req.body;

  try {
    const newAlg = new Algorithm({ name, tags, introduction, overview, visualization, pseudocode, solutions });
    await newAlg.save();
    return res.status(200).send(newAlg);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const updateAlgorithm = async (req, res) => {
  let {
    id,
    name,
    tags,
    introduction,
    overview,
    visualization,
    pseudocode,
    solutions
  } = req.body;

  try {
    // First check if the algorithm doesn't exist, if so just create it
    const alg = await Algorithm.findById({ _id: id }).exec();
    if (!alg) {
      return createAlgorithm(req, res);
    }

    const updatedAlg = await Algorithm.findByIdAndUpdate(alg.id, 
                            { name, tags, introduction, overview, visualization, pseudocode, solutions }, 
                            { new: true }).exec();
    return res.status(200).send(updatedAlg);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const deleteAlgorithm = async (req, res) => {
  let {
    name
  } = req.body;

  try {
    // First check if the algorithm doesn't exist, if so, return 400
    const alg = await Algorithm.findOne({ name }).exec();
    if (!alg) {
      res.status(400).send({ message: `Algorithm with name ${name} does not exist` });
    }

    const deletedAlg = await Algorithm.findByIdAndDelete(alg.id).exec();
    return res.status(200).send(deletedAlg);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getAlgorithm = async (req, res) => {
  let {
    name
  } = req.params;

  try {
    const alg = await Algorithm.findOne({ name }).exec();
    if (!alg) {
      res.status(400).send({ message: `Algorithm with name ${name} does not exist` });
    }

    return res.status(200).send(alg);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getAlgorithmsByTags = async (req, res) => {
  let {
    tagNames
  } = req.params;

  try {
    const allTagNames = tagNames.split(',');

    // Validate that all provided tag names are valid
    for (let tagName of tagNames) {
      const tag = await Tag.findOne({ name: tagName }).exec();
      if (!tag) {
        res.status(400).send({ message: `Tag with name ${tagName} does not exist` });
      }
    }

    const selectedAlgorithms = await Algorithm.find({ tags: { $all: allTagNames  } }); //algs must have all tags
    return res.status(200).send(selectedAlgorithms);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }

};

const getAllAlgorithms = async (req, res) => {
  try {
    const allAlgs = await Algorithm.find({}).exec();
    return res.status(200).send(allAlgs);
  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

module.exports = {
  createAlgorithm,
  updateAlgorithm,
  deleteAlgorithm,
  getAlgorithm,
  getAlgorithmsByTags,
  getAllAlgorithms,
};
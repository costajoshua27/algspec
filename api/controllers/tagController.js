const Algorithm = require('../models/algorithm.model');
const Tag = require('../models/tag.model');

const createTag = async (req, res) => {
  let {
    name
  } = req.body;

  try {
    const newTag = new Tag({ name });
    await newTag.save();
    return res.status(200).send(newTag);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const updateTag = async (req, res) => {
  let {
    id,
    name
  } = req.body;

  try {
    // First check if the tag doesn't exist, if so just create it
    const tag = await Tag.findById({ _id: id }).exec();
    if (!tag) {
      return createTag(req, res);
    }

    // Save the original tag name
    const originalName = tag.name;

    const updatedTag = await Tag.findByIdAndUpdate(tag.id, { name }, { new: true });

    // Change the tags within all algorithms that have this tag
    if (updatedTag.name !== originalName) {
      const algorithmsWithTag = await Algorithm.find({ tags: { $all: [originalName] } });
      console.log(`found algs: ${algorithmsWithTag}`);
      for (let alg of algorithmsWithTag) {
        console.log(alg.name, alg.tags);
        alg.tags[alg.tags.indexOf(originalName)] = updatedTag.name;
        console.log(alg.name, alg.tags);
        alg.markModified('tags');
        await alg.save();
      }
    }

    return res.status(200).send(updatedTag);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const deleteTag = async (req, res) => {
  let {
    name
  } = req.body;

  try {
    // First check if the tag doesn't exist, if so, return 400
    const tag = await Tag.findOne({ name }).exec();
    if (!tag) {
      res.status(400).send({ message: `Tag with name ${name} does not exist` });
    }

    // Save the original tag name
    const originalName = tag.name;

    const deletedTag = await Tag.findByIdAndDelete(tag.id);

    // Remove the tags within all algorithms that have this tag
    const algorithmsWithTag = await Algorithm.find({ tags: { $all: [originalName] } });
    console.log(`found algs: ${algorithmsWithTag}`);
    for (let alg of algorithmsWithTag) {
      alg.tags = alg.tags.filter(val => val !== originalName);
      alg.markModified('tags');
      await alg.save();
    }

    return res.status(200).send(deletedTag);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({});
    return res.status(200).send(allTags);
  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getTag = async (req, res) => {
  let {
    name
  } = req.params;

  try {
    const tag = await Tag.findOne({ name }).exec();
    if (!tag) {
      res.status(400).send({ message: `Tag with name ${name} does not exist` });
    }

    return res.status(200).send(tag);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error} `});
  }
};

module.exports = {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
  getTag
};
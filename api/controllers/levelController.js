const { Level } = require('../models/level.model');

const createLevel = async (req, res) => {
  const {
    number,
    experienceNeeded
  } = req.body;
  try {
    const newLevel = new Level({ number, experienceNeeded });
    await newLevel.save();
    return res.status(200).send(newLevel);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const updateLevel = async (req, res) => {
  const {
    id,
    number,
    experienceNeeded
  } = req.body;
  try {
    // First check if the level doesn't exist, if so just create it
    const level = await Level.findById(id).exec();
    if (!level) {
      return createLevel(req, res);
    }

    const updatedLevel = await Level.findByIdAndUpdate(level.id,
                                { number, experienceNeeded },
                                { new: true }).exec();
    return res.status(200).send(updatedLevel);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const deleteLevel = async (req, res) => {
  let {
    number
  } = req.body;

  try {
    // First check if the level doesn't exist, if so, return 400
    const level = await Level.findOne({ number }).exec();
    if (!level) {
      return res.status(400).send({ message: `Level ${number} does not exist` });
    }

    const deletedLevel = await Level.findByIdAndDelete(level.id).exec();
    return res.status(200).send(deletedLevel);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const getLevel = async (req, res) => {
  let {
    number
  } = req.params;

  try {
    const level = await Level.findOne({ number }).exec();
    if (!level) {
      return res.status(400).send({ message: `Level ${number} does not exist` });
    }

    return res.status(200).send(level);

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error} `});
  }
};

const getAllLevels = async (req, res) => {
  try {
    const allLevels = await Level.find({}).exec();
    return res.status(200).send(allLevels);
  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

module.exports = {
  createLevel,
  updateLevel,
  deleteLevel,
  getLevel,
  getAllLevels
}
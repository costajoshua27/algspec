const Algorithm = require('../models/algorithm.model');

{ Myname, tags, visualationCode, pseudoCode, solutions, blah, blah1, blah2, ...}

const createAlgorithm = async (req, res) => {
  let {
    name,
    tags,
    // visualizationCode,
    pseudocode,
    solutions
  } = req.body;

  try {
    const newAlg = new Algorithm({ name, tags, pseudocode, solutions });
    await newAlg.save();
    return res.status(200).json(newAlg);

  } catch (error) {
    return res.status(400).send({ message: `Database error: ${error}` });
  }
}

const updateAlgorithm = async (req, res) => {
  let {
    name,
    tags,
    // visualizationCode,
    pseudocode,
    solutions
  } = req.body;

  
  try {
    // First check if the algorithm doesn't exist, if so just create it
    const alg = await Algorithm.findOne({ name }).exec();
    if (!alg) {
      return createAlgorithm(req, res);
    }

    const updatedAlg = await Algorithm.findByIdAndUpdate(alg.id, { name, tags, pseudocode, solutions }, { new: true });
    return res.status(200).send(updatedAlg);

  } catch (error) {
    return res.status(400).send({ message: `Database error: ${error}` });
  }

}

module.exports = {
  createAlgorithm,
  updateAlgorithm
}
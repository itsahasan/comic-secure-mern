const Comic = require('../models/comic.model');
const { errorHandler } = require('../utils/error');

async function listComics(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const search = (req.query.search || '').trim();

    const query = search
      ? {
          $or: [
            { serie: { $regex: search, $options: 'i' } },
            { title: { $regex: search, $options: 'i' } },
            { number: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const comics = await Comic.find(query).sort({ createdAt: -1 }).limit(limit);
    res.status(200).json(comics);
  } catch (error) {
    next(error);
  }
}

async function getComic(req, res, next) {
  try {
    const comic = await Comic.findById(req.params.id);
    if (!comic) return next(errorHandler(404, 'Comic not found'));
    res.status(200).json(comic);
  } catch (error) {
    next(error);
  }
}

async function createComic(req, res, next) {
  try {
    const comic = await Comic.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ message: 'Comic created successfully', comic });
  } catch (error) {
    next(error);
  }
}

async function updateComic(req, res, next) {
  try {
    const comic = await Comic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!comic) return next(errorHandler(404, 'Comic not found'));
    res.status(200).json({ message: 'Comic updated successfully', comic });
  } catch (error) {
    next(error);
  }
}

async function deleteComic(req, res, next) {
  try {
    const comic = await Comic.findByIdAndDelete(req.params.id);
    if (!comic) return next(errorHandler(404, 'Comic not found'));
    res.status(200).json({ message: 'Comic deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = { listComics, getComic, createComic, updateComic, deleteComic };

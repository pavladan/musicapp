const Music = require("../model/Music");
const fs = require("fs/promises");

exports.getAllMusics = async (req, res) => {
  try {
    let music = await Music.find();
    res.status(200).json(music);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.addNewMusic = async (req, res) => {
  try {
    const music = new Music({
      title: req.body.title,
      artist: req.body.artist,
      music: req.file,
    });

    let newMusic = await music.save();
    res.status(200).json({ data: newMusic });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.deleteMusic = async (req, res) => {
  try {
    const id = req.params.musicId;
    const found = await Music.findOne({ _id: id });
    if (!found) return res.status(202).json({ message: "File not found" });
    await fs.unlink(found.music.path);
    const result = await Music.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

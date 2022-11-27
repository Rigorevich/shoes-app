const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const { Shoes, ShoesInfo } = require("../models/models");

class ShoesController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info, sizes } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      await img.mv(path.resolve(__dirname, "..", "static", fileName));
      const shoes = await Shoes.create({
        name,
        price,
        brandId,
        typeId,
        sizes,
        img: fileName,
      });
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ShoesInfo.create({
            title: i.title,
            description: i.description,
            shoId: shoes.id,
          })
        );
      }

      return res.json(shoes);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    let shoes;
    if (!brandId && !typeId) {
      shoes = await Shoes.findAndCountAll({ limit, offset });
    }
    if (!brandId && typeId) {
      shoes = await Shoes.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (brandId && !typeId) {
      shoes = await Shoes.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      shoes = await Shoes.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(shoes);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const shoes = await Shoes.findOne({
      where: { id },
      include: [{ model: ShoesInfo, as: "info" }],
    });
    return res.json(shoes);
  }
}

module.exports = new ShoesController();

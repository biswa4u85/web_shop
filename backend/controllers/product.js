const product = require("../model/product");

const getAll = async (req, res) => {
  try {
    const { skip, take } = req.query;
    const count = await product.countDocuments();
    const data = await product.find({})
      .skip(skip ?? 0)
      .limit(take ?? 100);
    res.status(200).json({ count, data });
  } catch (error) {
    res.status(500).json({ errMsg: "Something Went Wrong" });
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const list = await product.findById(id);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ errMsg: "Something Went Wrong" });
  }
};

const addNew = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required for product' });
    }
    const list = new product(req.body);
    await list.save();

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ errMsg: "Something Went Wrong" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const list = await product.findByIdAndUpdate(id, {
      title, description
    })
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ errMsg: "Something Went Wrong" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await product.findByIdAndDelete(id);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ errMsg: "Something Went Wrong" });
  }
};

const importData = async (req, res) => {
  try {

    const file = req.files;
    const rawJsonData = await toJson(file.files.path, res);
    const [rawJsonDataRes] = await Promise.allSettled([rawJsonData]);
    const jsonData = rawJsonDataRes.value.map((obj) => obj);
    if (jsonData.length > 1500) {
      throw new Error(`Max Records Upload Limit is 1500`);
    }

    const finalData = [];

    for (let i in jsonData) {
      try {
        let obj = jsonData[i];

        let finalObj = {};

        // mapping the description field
        if (obj.name) {
          finalObj.name = obj.name;
        }
        if (obj.address) {
          finalObj.address = obj.address;
        }
        if (obj.city) {
          finalObj.city = obj.city;
        }
        if (obj.code) {
          finalObj.code = obj.code;
        }
        if (obj.country) {
          let countrys = await countrysSchema.find({ "name.en": obj.country });
          finalObj.countryId = countrys[0] ? (countrys[0]._id).toString() : "";
        }
        if (obj.region) {
          let regions = await statesSchema.find({ "name.en": obj.region });
          finalObj.stateId = regions[0] ? (regions[0]._id).toString() : "";
        }
        if (finalObj.countryId && finalObj.stateId) {
          finalData.push(await convertLanguage(finalObj, ["name"]))
        }
      } catch (err) {
        console.log("error", err);
        console.log(i);
        console.log("json data", jsonData[Number(i) - 1]);
        throw new Error(`Error : Row no. ${parseInt(i) + 2} : ${err}`);
      }
    }
    let response = await product.createMany(finalData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ errMsg: "Something Went Wrong" });
  }
};

module.exports = {
  getAll,
  getSingle,
  addNew,
  update,
  remove,
  importData
};
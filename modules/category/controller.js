import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addCategory = async (req, res) => {
  const { title, name, order, isActive, heroImage, mobileImage } = req.body;

  try {
    let category = await Service.addCategory(
      title,
      name,
      order,
      isActive,
      heroImage, 
      mobileImage
    );

    return res.json({
      status: true,
      category,
    });
  } catch (error) {
    console.log(error.message, "addCategory error");
    return res.json({ status: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { category } = req.body;
  const { categoryId } = req.params;

  try {
    let updatedCategory = await Service.updateCategory(categoryId, category);

    return res.json({
      status: true,
      updatedCategory,
    });
  } catch (error) {
    console.log(error.message, "updateCategory error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    await Service.deleteCategory(categoryId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteCategory error");
    return res.json({ status: false, message: error.message });
  }
};

const getCategories = async (req, res) => {
  const { limit, skip, startDate, endDate } = req.query;

  try {
    const categoriesQuery = _.omitBy(
      {
        created_at:
          startDate || endDate
            ? {
                $gte: startDate
                  ? new Date(startDate)
                  : moment().startOf("day").toDate(),
                $lte: endDate
                  ? new Date(endDate)
                  : moment().endOf("day").toDate(),
              }
            : undefined,
      },
      (a) => a === undefined
    );
    let categories = await Service.getCategories(categoriesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...categories });
  } catch (error) {
    console.log(error.message, "getCategories error");
    return res.json({ status: false, message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const CategoryQuery = _.omitBy(
      {
        _id: req.params.categoryId,
      },
      (a) => a === undefined
    );

    let category = await Service.getCategory(CategoryQuery);
    return res.json({ status: true, category });
  } catch (error) {
    console.log(error.message, "getCategory error");
    return res.json({ status: false, message: error.message });
  }
};
const getCategoryViaPerma = async (req, res) => {
  const { categoryPerma, lang } = req.params;
  try {
    let category = await Service.getCategoryViaPerma(categoryPerma, lang);
    return res.json({ status: true, category });
  } catch (error) {
    console.log(error.message, "getCategory error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategory,
  getCategoryViaPerma,
};

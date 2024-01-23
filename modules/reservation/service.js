import Mail from "../mail/mail.js";
import { Treatment } from "../treatment/model.js";
import emailResTemplate from "./emailResTemplate.js";
import Model from "./model.js";


const getReservations = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const reservations = await Model.Reservation.find(query, {}, queryOptions).sort({
    order: 1,
  })
  const count = await Model.Reservation.countDocuments(query);

  return { reservations, count };
};

const getReservation = async (query) => {
  console.log(query, "servis query")
  return Model.Reservation.findOne(query);
};

const addReservation = async (
  lang,
  name,
  phone,
  date,
  email,
  image,
  treatment,
  message,
) => {
  let treatmentName
  if (treatment != "Genel") {
    const _treatment = await Treatment.findById(treatment)
    treatmentName = _treatment.title
    console.log(treatmentName, "treatment")
  } else {
    treatmentName = "Genel"
    treatment = undefined
  }

  try {
    await Mail.sendMail(

      "info@sideshinedental.com",
      "Yeni Mesaj",
      undefined,
      emailResTemplate(
        lang,
        name,
        phone,
        date,
        email,
        treatmentName,
        message,
        image,)
  
    )
    return new Model.Reservation({
      lang,
      name,
      phone,
      date,
      email,
      image,
      treatment,
      message,
    }).save();

    
  } catch (error) {
    console.log("addReservation service error", error);
    throw new Error(error.message);
  }
};

const updateReservation = async (reservationId, reservation) => {
  try {
    let isExistReservation = await Model.Reservation.findById(reservationId);

    if (!isExistReservation) {
      throw new Error(
        JSON.stringify({
          en: "Reservation is not found.",
          tr: "Reservation bulunamadı.",
        })
      );
    }

    return Model.Reservation.findOneAndUpdate(
      { _id: isExistReservation._id },
      { ...reservation },
      { new: true }
    );
  } catch (error) {
    console.log("updateReservation service error", error);
    throw new Error(error.message);
  }
};

const deleteReservation = async (reservationId) => {
  try {
    return Model.Reservation.deleteOne({ _id: reservationId });
  } catch (error) {
    console.log("deleteReservation service error", error);
    throw new Error(error.message);
  }
};

export default {
  addReservation,
  updateReservation,
  deleteReservation,
  getReservations,
  getReservation
};

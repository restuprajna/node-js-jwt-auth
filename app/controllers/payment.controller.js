const Payment = require("../models/payment.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Payment
  const product = new Payment({
    location: req.body.location,
    date_in: req.body.date_in,
    date_out: req.body.date_out,
    name: req.body.name,
    licence: req.body.licence,
    street: req.body.street,
    city: req.body.city,
    province: req.body.province,
    regional: req.body.regional,
    phone: req.body.phone,
    email: req.body.email,
    note: req.body.note,
    total: req.body.total,
    status: req.body.status
  });

  // Save Payment in the database
  Payment.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payment."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  Payment.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Payment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Payment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Payment.updateById(
    req.params.id,
    new Payment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Payment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Payment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Payment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Payment with id " + req.params.id
        });
      }
    } else res.send({ message: `Payment was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Payment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Payments were deleted successfully!` });
  });
};
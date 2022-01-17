const sql = require("./db.js");

// constructor
const Payment = function(payment) {

  this.location = payment.location;
  this.date_in = payment.date_in;
  this.date_out = payment.date_out;
  this.name = payment.name;
  this.licence = payment.licence;
  this.street = payment.street;
  this.city = payment.city;
  this.province = payment.province;
  this.regional = payment.regional;
  this.phone = payment.phone;
  this.email = payment.email;
  this.note = payment.note;
  this.total = payment.total;
  this.status = payment.status;
  
};

Payment.create = (newPayment, result) => {
  sql.query("INSERT INTO payments SET ?", newPayment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created payment: ", { id: res.insertId, ...newPayment });
    result(null, { id: res.insertId, ...newPayment });
  });
};

Payment.findById = (id, result) => {
  sql.query(`SELECT * FROM payments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found payment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Payment with the id
    result({ kind: "not_found" }, null);
  });
};

Payment.getAll = (name, result) => {
  let query = "SELECT * FROM payments";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("payments: ", res);
    result(null, res);
  });
};

Payment.getAllPublished = result => {
  sql.query("SELECT * FROM payments WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("payments: ", res);
    result(null, res);
  });
};

Payment.updateById = (id, payment, result) => {
  sql.query(
    "UPDATE payments SET location = ?, date_in = ?,date_out = ?, name = ?, licence = ?, city = ?, street = ?, province = ?,regional = ?,phone = ?,email = ?, note = ?,total = ?,status = ?, WHERE id = ?",
    [payment.location, payment.date_in, payment.date_out, payment.name, payment.licence, payment.city, payment.street, payment.province, payment.regional,payment.phone, payment.email, payment.note, payment.total, payment.status ,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Payment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated payment: ", { id: id, ...payment });
      result(null, { id: id, ...payment });
    }
  );
};

Payment.remove = (id, result) => {
  sql.query("DELETE FROM payments WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Payment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted payment with id: ", id);
    result(null, res);
  });
};

Payment.removeAll = result => {
  sql.query("DELETE FROM payments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} payments`);
    result(null, res);
  });
};

module.exports = Payment;
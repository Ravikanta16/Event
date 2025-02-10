const { json } = require("express");

const fakeEncoder = (data) => {
  return json.stringify(data);
};

module.exports = { fakeEncoder };

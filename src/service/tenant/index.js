const { BASE_DB_URI } = require("../../config/env.json");

const getAllTenants = async managerDbConnection => {
  try {
    const Tenant = await managerDbConnection.model("Tenant");
    const tenants = await Tenant.find({});
    return tenants;

  } catch (error) {
    throw error;
  }
};

const createTenant = async (managerDbConnection, body) => {
  try {
    const Tenant = await managerDbConnection.model("Tenant");
    const name = body.name;
    const _tenant = await Tenant.findOne({name});

    if (_tenant) {
      throw new Error("Tenant Already Present");
    }

    const newTenant = await new Tenant({
      name,
      dbURI: `${BASE_DB_URI}/${name}`
    }).save();

    return newTenant;

  } catch (error) {
    throw error;
  }
};

module.exports = { getAllTenants, createTenant };
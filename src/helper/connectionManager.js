const { getNamespace } = require("continuation-local-storage");

const { BASE_DB_URI, MANAGER_DB_NAME } = require("../config/env.json");
const { initManagerDbConnection } = require("../db/manager");

const { initTenantDbConnection } = require("../db/tenant");

const tenantService = require("../service/tenant");

let connectionMap = {};
let managerDbConnection;

const connectAllDb = async () => {
  let tenants;
  const MANAGER_DB_URI = `${BASE_DB_URI}/${MANAGER_DB_NAME}`;
  managerDbConnection = initManagerDbConnection(MANAGER_DB_URI);

  try {
    tenants = await tenantService.getAllTenants(managerDbConnection);
  } catch (e) {
    console.log("connectAllDb error", e);
    return;
  }

  await setConMapp(tenants);
  
};

setConMapp =  async (tenants) => {
  connectionMap = await tenants
    .map(tenant => {
      return {
        [tenant.name]: initTenantDbConnection(tenant.dbURI)
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});

  return connectionMap;
}

const getConnectionByTenant = tenantName => {
  if (connectionMap) {
    return connectionMap[tenantName];
  }
};

const getManagerConnection = () => {
  if (managerDbConnection) {
    return managerDbConnection;
  }
};

const getConnection = () => {
  const nameSpace = getNamespace("unique context");
  const conn = nameSpace.get("connection");

  if (!conn) {
    throw new Error("Connection is not set for any tenant database");
  }

  return conn;
};

module.exports = {
  connectAllDb,
  getManagerConnection,
  getConnection,
  getConnectionByTenant
};
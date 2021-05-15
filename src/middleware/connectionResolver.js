const { createNamespace } = require("continuation-local-storage");
const { getConnectionByTenant, getManagerConnection } = require("../helper/connectionManager");

let nameSpace = createNamespace("unique context");

const resolveTenant = (req, res, next) => {
  const tenant = req.headers.tenant || req.query.tenant;

  if (!tenant)
    return res.status(500).json({ error: `Please provide tenant's name to connect` });

  nameSpace.run(() => {
    const tenantDbConnection = getConnectionByTenant(tenant);
    nameSpace.set("connection", tenantDbConnection);
    next();
  });
};

const setManagerDb = (req, res, next) => {
  nameSpace.run(() => {
    const managerDbConnection = getManagerConnection();
    nameSpace.set("connection", managerDbConnection);
    next();
  });
};

module.exports = { resolveTenant, setManagerDb };
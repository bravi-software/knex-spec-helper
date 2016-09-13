var fs = require('fs');
var path = require('path');
var knex = require('knex');
var knextancy = require('knextancy');

var knexConnection;
var truncateTablesSQL;

exports.setup = function (options) {
  var knexConfig = options.knexConfig;
  var knextancyEnabled = options.knextancyEnabled || false;
  var tenantId = options.tenantId || 1;
  var truncateEnabled = options.truncateEnabled || false;

  if (truncateEnabled && !truncateTablesSQL) {
    var filename = 'spec-helper-' + knexConfig.client + '.sql';
    truncateTablesSQL = fs.readFileSync(path.join(__dirname, filename), { encoding: 'utf8' });
  }

  if (!knexConnection) {
    knexConnection = knex(knexConfig);
  }

  if (!truncateEnabled) {
    return knexConnection;
  }

  return truncateAllTables(knexConnection, truncateTablesSQL).then(function () {
    if (!knextancyEnabled) {
      return knexConnection;
    }

    return knextancy.tenant(knexConnection, tenantId || 1);
  });
};


function truncateAllTables () {
  return knexConnection
    .raw(truncateTablesSQL)
    .then(function (sqlQuery) {
      var query = sqlQuery.rows.map(function (sql) { return sql.trucate_table_cmd; }).join('');
      return knexConnection.raw(query);
    });
}

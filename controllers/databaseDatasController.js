import database from "../infra/database.js";

const infos = async () => {
  const result = await database.query(
    "SELECT name, setting FROM pg_settings WHERE name IN ('server_version', 'server_encoding', 'TimeZone', 'DateStyle', 'config_file', 'hba_file');",
  );

  const postgresInfo = {};

  const order = [
    "server_version",
    "server_encoding",
    "client_encoding",
    "TimeZone",
    "DateStyle",
    "config_file",
    "hba_file",
  ];

  order.forEach((key) => {
    const setting = result.rows.find((element) => element.name === key);
    if (!!setting) {
      postgresInfo[setting.name] = setting.setting;
    }
  });

  return postgresInfo;
};

const connection = async () => {
  const result = await database.query(
    "SELECT name, setting FROM pg_settings WHERE name IN ('listen_addresses', 'port', 'ssl', 'max_connections', 'superuser_reserved_connections', 'reserved_connections', 'tcp_user_timeout', 'tcp_keepalives_count', 'tcp_keepalives_idle', 'tcp_keepalives_interval', 'statement_timeout', 'idle_in_transaction_session_timeout');",
  );

  const connectionConfigs = {};

  const order = [
    "listen_addresses",
    "port",
    "ssl",
    "max_connections",
    "superuser_reserved_connections",
    "reserved_connections",
    "tcp_user_timeout",
    "tcp_keepalives_count",
    "tcp_keepalives_idle",
    "tcp_keepalives_interval",
    "statement_timeout",
    "idle_in_transaction_session_timeout",
  ];

  order.forEach((key) => {
    const setting = result.rows.find((element) => element.name === key);
    if (!!setting) {
      connectionConfigs[setting.name] = setting.setting;
    }
  });

  return connectionConfigs;
};

const logs = async () => {
  const resultFiles = await database.query(
    "SELECT name, setting FROM pg_settings WHERE name IN ('log_directory', 'log_destination');",
  );
  const resultContent = await database.query(
    "SELECT name, setting FROM pg_settings WHERE name IN ('log_duration', 'log_line_prefix', 'log_lock_waits', 'log_min_messages', 'log_statement');",
  );

  const logFiles = {};
  const logContent = {};

  const order = [
    "log_min_messages",
    "log_line_prefix",
    "log_statement",
    "log_duration",
    "log_lock_waits",
  ];

  resultFiles.rows.forEach((element) => {
    logFiles[element.name] = element.setting;
  });

  order.forEach((key) => {
    const setting = resultContent.rows.find((element) => element.name === key);
    if (!!setting) {
      logContent[setting.name] = setting.setting;
    }
  });

  return {
    log_files: logFiles,
    log_content: logContent,
  };
};

export const getAllData = async (req, res) => {
  res.status(200).json({
    postgres_configurations: {
      infos: await infos(),
      connection: await connection(),
      logs: await logs(),
    },
  });
};

export const getPostgresInfo = async (req, res) => {
  res.status(200).json({
    postgres_info: await infos(),
  });
};

export const getConnectionConfig = async (req, res) => {
  res.status(200).json({
    connection_configs: await connection(),
  });
};

export const getLogsConfig = async (req, res) => {
  res.status(200).json({
    logs_configs: await logs(),
  });
};

// export default getAllData;

// Paramentros que quero testar com o SHOW
//
// - Info
// -- client_encoding
// -- config_file
// -- DateStyle
// -- hba_file
// -- server_encoding
// -- server_version
// -- TimeZone
//
// - Connection
// -- idle_in_transaction_session_timeout
// -- max_connections
// -- listen_addresses
// -- port
// -- reserved_connections
// -- ssl
// -- statement_timeout
// -- superuser_reserved_connections
// -- tcp_user_timeout
// -- tcp_keepalives_count
// -- tcp_keepalives_idle
// -- tcp_keepalives_interval
//
// - Log
// -- Log Files
// ---- log_destination
// ---- log_directory
// -- Log Content
// ---- log_duration
// ---- log_line_prefix
// ---- log_lock_waits
// ---- log_min_messages
// ---- log_statement
//
// - Performance
// -- Autovacuum
// ---- autovacuum
// ---- autovacuum_analyze_scale_factor
// ---- autovacuum_max_workers
// ---- autovacuum_naptime
// ---- autovacuum_vacuum_scale_factor
// ---- autovacuum_vacuum_threshold
// -- WAL
// ---- effective_io_concurrency
// ---- synchronous_commit
// ---- wal_buffers
// ---- wal_writer_delay
// -- checkpoint_timeout
// -- effective_cache_size
// -- maintenance_work_mem
// -- max_locks_per_transaction
// -- max_parallel_maintenance_workers
// -- max_parallel_workers
// -- max_parallel_workers_per_gather
// -- max_worker_processes
// -- random_page_cost
// -- seq_page_cost
// -- shared_buffers
// -- work_mem
//
// - client_min_messages
// - geqo
// - idle_session_timeout
// - lc_messages
// - lc_monetary
// - lc_numeric
// - lc_time
// - max_files_per_process
// - password_encryption
// - restart_after_crash
// - unix_socket_group

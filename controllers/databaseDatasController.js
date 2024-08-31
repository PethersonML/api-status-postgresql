import database from "../infra/database";

async function info() {
  const infoServerVersion = database.query("SHOW server_version");
  const infoServerEncoding = database.query("SHOW server_encoding");
  const infoClientEncoding = database.query("SHOW client_encoding");
  const infoTimezone = database.query("SHOW TimeZone");
  const infoDateStyle = database.query("SHOW DateStyle");
  const infoConfigFile = database.query("SHOW config_file");
  const infoHbaFile = database.query("SHOW hba_file");

  return {
    server_version: infoServerVersion,
    server_encoding: infoServerEncoding,
    client_encoding: infoClientEncoding,
    timezone: infoTimezone,
    datestyle: infoDateStyle,
    config_file: infoConfigFile,
    hba_file: infoHbaFile,
  };
}

exports.getPostgresInfo = async (req, res) => {
  res.status(200).json(info());
};

// Paramentros que quero testar com o SHOW
//
// - Info
// - client_encoding
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
// -- ssl_ca_file
// -- ssl_cert_file
// -- ssl_key_file
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

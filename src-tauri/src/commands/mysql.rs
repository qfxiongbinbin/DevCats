use mysql2::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct MysqlConfig {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub database: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryResult {
    pub columns: Vec<String>,
    pub rows: Vec<Vec<String>>,
    pub affected_rows: u64,
    pub execution_time_ms: u64,
}

#[tauri::command]
pub async fn test_mysql_connection(config: MysqlConfig) -> Result<String, String> {
    let url = format!(
        "mysql://{}:{}@{}:{}/{}",
        config.username, config.password, config.host, config.port, config.database
    );

    match mysql2::Pool::new(url.as_str()) {
        Ok(_pool) => Ok("Connection successful".to_string()),
        Err(e) => Err(format!("Connection failed: {}", e)),
    }
}

#[tauri::command]
pub async fn execute_mysql_query(
    config: MysqlConfig,
    query: String,
) -> Result<QueryResult, String> {
    let start = std::time::Instant::now();

    let url = format!(
        "mysql://{}:{}@{}:{}/{}",
        config.username, config.password, config.host, config.port, config.database
    );

    let pool = mysql2::Pool::new(url.as_str())
        .map_err(|e| format!("Failed to create pool: {}", e))?;

    let mut conn = pool
        .get_conn()
        .map_err(|e| format!("Failed to get connection: {}", e))?;

    // Check if query is SELECT or INSERT/UPDATE/DELETE
    let query_lower = query.to_lowercase();
    let is_select = query_lower.trim().starts_with("select");

    let columns: Vec<String>;
    let rows: Vec<Vec<String>>;
    let affected_rows: u64;

    if is_select {
        let result: Vec<mysql2::Row> = conn
            .query(query.as_str())
            .map_err(|e| format!("Query failed: {}", e))?;

        if let Some(first_row) = result.first() {
            columns = first_row
                .columns()
                .iter()
                .map(|c| c.name().to_string())
                .collect();

            rows = result
                .iter()
                .map(|row| {
                    row.columns()
                        .iter()
                        .map(|col| {
                            match row.get(col.name()) {
                                Some(val: String) => val,
                                Some(val: i64) => val.to_string(),
                                Some(val: f64) => val.to_string(),
                                Some(val: Option<i64>) => val.map_or("NULL".to_string(), |v| v.to_string()),
                                None => "NULL".to_string(),
                                _ => String::new(),
                            }
                        })
                        .collect()
                })
                .collect();

            affected_rows = rows.len() as u64;
        } else {
            columns = vec![];
            rows = vec![];
            affected_rows = 0;
        }
    } else {
        let result = conn
            .query_drop(query.as_str())
            .map_err(|e| format!("Query failed: {}", e))?;

        affected_rows = result.affected_rows();
        columns = vec![];
        rows = vec![];
    }

    let execution_time = start.elapsed().as_millis() as u64;

    Ok(QueryResult {
        columns,
        rows,
        affected_rows,
        execution_time_ms: execution_time,
    })
}

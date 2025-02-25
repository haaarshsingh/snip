use std::time::{Duration, SystemTime};

use sqlx::{query, Pool, Postgres};

use crate::utils::get_time_as_unix_epoch;

pub(crate) async fn cleanup_db(con: &Pool<Postgres>) -> sqlx::Result<()> {
    let time_stamp = get_time_as_unix_epoch(SystemTime::now() - Duration::from_secs(1800));
    query!(
        "DELETE FROM message_content
        CASCADE
        WHERE at_time < $1",
        time_stamp
    )
    .execute(con)
    .await
    .map(|_| ())
}

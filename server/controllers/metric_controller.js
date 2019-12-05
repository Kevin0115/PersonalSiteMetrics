const connection = require('../config/db_config');
const moment = require('moment');

exports.get_session_ids = async (req, res) => {
  const session_query = {
    text: `select session_id, ts
            from (
              select distinct on (session_id) session_id, ts
              from metric
              where event_type = 'sessionStart'
              order by session_id
            ) t
            order by ts`
  }

  try {
    const sessions = (await connection.query(session_query)).rows;
    res.send(sessions);
  } catch (e) {
    console.error(e.detail);
    res.send(e);
  }
}

exports.get_metric_session_id = async (req, res) => {
  const session_id = req.params.session_id;

  const metric_query = {
    text: `select *
            from metric
            where session_id = $1`,
    values: [session_id]
  }

  try {
    const metrics = (await connection.query(metric_query)).rows;
    res.send(metrics);
  } catch (e) {
    console.error(e.detail);
    res.send(e);
  }
}

exports.post_session = async (req, res) => {
  const session_id = req.body.session_id; // Param because front-end localStorage item
  const event_type = req.body.event_type;
  const ts = moment.utc(); // Generate on the spot **UTC**
  insert_query = {
    text: `insert into metric
            values ($1, $2, $3)`,
    values: [session_id, event_type, ts]
  }

  try {
    const insert = (await connection.query(insert_query)).rows;
    res.send(insert_query);
  } catch (e) {
    console.error(e.detail);
    res.send(e);
  }
}
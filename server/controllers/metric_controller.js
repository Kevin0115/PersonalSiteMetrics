const connection = require('../config/db_config');
const moment = require('moment');

exports.get_session_ids = async (req, res) => {
  const session_query = {
    text: `select distinct session_id, min(ts) as ts, count(event_type) as event_count
            from metric
            group by session_id
            order by ts desc`
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

exports.get_chart_data = async(req, res) => {
  // Rename to x and y for React-Vis compatibility
  const count_query = {
    text: `select substring(event_type, '[^=]*$') as x, count(session_id) as y
            from metric
            where event_type != 'sessionStart'
            group by event_type
            order by count(session_id) desc`
  }

  const month_query = {
    text: `select to_char(ts, 'Mon YY') as x, count(session_id) as y
            from metric
            where event_type = 'sessionStart'
            group by x
            order by x`
  }

  const week_query = {
    text: `select to_char(ts, 'W-MM-YY') as x, count(session_id) as y
            from metric
            where event_type = 'sessionStart'
            group by x
            order by x`
  }

  const day_query = {
    text: `select to_char(ts, 'DD-MM-YY') as x, count(session_id) as y
            from metric
            where event_type = 'sessionStart'
            group by x
            order by x
            limit 30`
  }

  try {
    const event_count = (await connection.query(count_query)).rows;
    const month_count = (await connection.query(month_query)).rows;
    const week_count = (await connection.query(week_query)).rows;
    const day_count = (await connection.query(day_query)).rows;

    res.send({
      event_count: event_count,
      month_count: month_count,
      week_count: week_count,
      day_count: day_count,
    });
  } catch (e) {
    console.error(e.detail);
    res.send(e);
  }
}

exports.post_event = async (req, res) => {
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
    res.send(insert_query.values);
  } catch (e) {
    console.error(e.detail);
    res.send(e);
  }
}
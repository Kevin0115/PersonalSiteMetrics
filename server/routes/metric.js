var express = require('express');
var router = express.Router();

var metric_controller = require('../controllers/metric_controller');

router.get('/', metric_controller.get_session_ids);

router.get('/:session_id', metric_controller.get_metric_session_id);

router.post('/', metric_controller.post_event);

module.exports = router;
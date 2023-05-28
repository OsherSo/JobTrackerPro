const express = require('express');

const jobController = require('../controllers/jobController');

const router = express.Router();

router.route('/').get(jobController.getAllJobs).post(jobController.createJob);

router.route('/stats').get(jobController.showStats);

router
  .route('/:id')
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;

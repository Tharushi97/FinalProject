const express = require('express');
const router = express.Router();
const employee_contrller = require('../controllers/employee.controller');
// const employeeRoutes = require('./controllers/employeev2.controller');
router.get('/', employee_contrller.employees_details)
router.get('/:id', employee_contrller.employee_details)
  
router.put('/:id/update', employee_contrller.employee_update);
router.put('/:id/updatePerson', employee_contrller.employee_updatePerson);
router.delete('/:id/delete', employee_contrller.employee_delete);
router.post('/:id/:email/:date/send-email', employee_contrller.employee_send);
router.post('/:name/search-applicant', employee_contrller.employee_search);
router.get('/:id/confirm', employee_contrller.employee_confirm);
router.get('/:id/cancel-confirm', employee_contrller.employee_cancelConfirm);

module.exports = router;
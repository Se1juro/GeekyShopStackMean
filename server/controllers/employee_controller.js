const model_employee = require('../models/model_employee');
const employeController = {};

employeController.getEmployees = async (req, res, next) => {
  try {
    const employees = await model_employee.find();
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

employeController.getEmployee = async (req, res, next) => {
  try {
    const employee = await model_employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

employeController.createEmployee = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      position: req.body.position,
      officine: req.body.officine,
      salary: req.body.salary,
    };
    const employee = new model_employee(data);
    const resultado = await employee.save();
    res.json({
      resultado: resultado,
      status: 'Employee save',
    });
  } catch (error) {
    next(error);
  }
};

employeController.editEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = {
      name: req.body.name,
      position: req.body.position,
      officine: req.body.officine,
      salary: req.body.salary,
    };
    const resultado = await model_employee.findByIdAndUpdate(
      id,
      { $set: employee },
      { new: true }
    );
    res.json({
      resultado,
      status: 'Employee update',
    });
  } catch (error) {
    next(error);
  }
};
employeController.deleteEmployee = async (req, res, next) => {
  try {
    await model_employee.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      status: 'Employee delete',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = employeController;

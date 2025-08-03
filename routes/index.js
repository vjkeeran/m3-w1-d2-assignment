const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// GET form
router.get('/', (req, res) => {
  res.render('form', {
    title: 'Register',
    errors: [],
    data: {},
  });
});

// POST form with validation
router.post(
  '/',
  [
    check('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    check('email').trim().isEmail().withMessage('Valid email is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    const data = { name: req.body.name || '', email: req.body.email || '' };

    if (!errors.isEmpty()) {
      // re-render with errors and previous input
      return res.status(400).render('form', {
        title: 'Register',
        errors: errors.array(),
        data,
      });
    }

    // Success: could persist, but show thank you
    res.render('thankyou', {
      title: 'Thank You',
      name: data.name,
    });
  }
);

module.exports = router;

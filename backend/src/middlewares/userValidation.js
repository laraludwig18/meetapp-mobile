import { string, object, ref } from 'yup';

const validateUserCreation = async (req, res, next) => {
  const schema = object().shape({
    name: string().required('Name is required'),
    email: string()
      .email('Email invalid')
      .required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must have 6 characters'),
  });

  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
};

const validateUserUpdate = async (req, res, next) => {
  const schema = object().shape({
    name: string(),
    email: string().email('Email invalid'),
    oldPassword: string().min(6, 'Actual password must have 6 characters'),
    password: string()
      .min(6, 'New password must have 6 characters')
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required('New password is required') : field
      ),
    confirmPassword: string().when('password', (password, field) =>
      password
        ? field
            .required('Confirmation of password is required')
            .oneOf(
              [ref('password')],
              'New Password and confirmation does not match'
            )
        : field
    ),
  });

  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
};

export { validateUserCreation, validateUserUpdate };

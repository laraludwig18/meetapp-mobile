import { string, object } from 'yup';

export default async (req, res, next) => {
  const schema = object().shape({
    email: string()
      .email('Email invalid')
      .required('Email is required'),
    password: string().required('Password is required'),
  });

  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
};

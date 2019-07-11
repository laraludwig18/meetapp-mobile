import { string, object, number, date } from 'yup';

const validateMeetupCreation = async (req, res, next) => {
  const schema = object().shape({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    location: string().required('Location is required'),
    date: date().required('Date is required'),
    banner_id: number().required('Banner is required'),
  });

  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
};

const validateMeetupUpdate = async (req, res, next) => {
  const schema = object().shape({
    title: string(),
    description: string(),
    location: string(),
    date: date(),
    banner_id: number(),
  });

  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
};

export { validateMeetupCreation, validateMeetupUpdate };

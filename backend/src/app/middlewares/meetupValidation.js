import { string, object, number, date } from 'yup';

const validateMeetupCreation = async (req, res, next) => {
  const schema = object().shape({
    title: string().required('Título é obrigatório.'),
    description: string().required('Descrição é obrigatória.'),
    location: string().required('Localização é obrigatória.'),
    date: date().required('Data é obrigatória.'),
    banner_id: number().required('Banner é obrigatório.'),
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

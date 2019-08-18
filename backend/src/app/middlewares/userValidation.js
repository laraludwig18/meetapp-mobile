import { string, object, ref } from 'yup';

const validateUserCreation = async (req, res, next) => {
  const schema = object().shape({
    name: string().required('Nome é obrigatório.'),
    email: string()
      .email('Email inválido.')
      .required('Email é obrigatório.'),
    password: string()
      .required('Senha é obrigatória.')
      .min(6, 'Senha deve possuir, no mínimo, 6 caracteres.'),
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
    email: string().email('Email inválido.'),
    oldPassword: string().min(
      6,
      'Senha atual deve ter, no mínimo, 6 caracteres.'
    ),
    password: string()
      .min(6, 'Nova senha deve possuir, no mínimo, 6 caracteres.')
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required('Nova senha é obrigatória.') : field
      ),
    confirmPassword: string().when('password', (password, field) =>
      password
        ? field
            .required('Confirmação de senha é obrigatória.')
            .oneOf(
              [ref('password')],
              'Nova senha e sua confirmação não coincidem.'
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

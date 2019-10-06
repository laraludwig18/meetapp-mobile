export const user = {
  id: 9,
  name: 'Lara ludwig',
  email: 'laraludwig18@gmail.com',
};

export const login = {
  email: 'laraludwig18@gmail.com',
  password: '123456',
};

export const userCreated = {
  name: 'Lara ludwig',
  email: 'laraludwig18@gmail.com',
  password: '123456',
};

export const userUpdated = {
  id: 9,
  name: 'Lara',
  email: 'laraludwig18@gmail.com',
};

export const userPassUpdated = {
  name: 'Lara ludwig',
  email: 'laraludwig18@gmail.com',
  oldPassword: '123456',
  password: '212121',
  confirmPassword: '212121',
};

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6I1jiBYCr9GliBa4PAk';

export const error = {
  serverError: 'Houve um erro, tente novamente mais tarde!',
};

export const meetup = {
  id: 3,
  title: 'Conhecendo Node JS',
  description: 'Workshop sobre Node JS',
  date: '2019-07-20T20:00:00.000Z',
  location: 'Teste',
  dateFormatted: '20 de julho, às 17h',
  user: {
    id: 1,
    name: 'Thomas Martinez',
    email: 'thomasmartinez@gmail.com',
  },
  banner: {
    url: 'http://localhost:3333/files/f9dc001f0848b3c8d86bdd18e43d05e5.jpeg',
    id: 1,
    path: 'f9dc001f0848b3c8d86bdd18e43d05e5.jpeg',
  },
};

export const meetupRequest = {
  meetups: [
    {
      id: 3,
      title: 'Conhecendo Node JS',
      description: 'Workshop sobre Node JS',
      date: '2019-07-20T20:00:00.000Z',
      location: 'Teste',
      user: {
        id: 1,
        name: 'Thomas Martinez',
        email: 'thomasmartinez@gmail.com',
      },
      banner: {
        url:
          'http://localhost:3333/files/f9dc001f0848b3c8d86bdd18e43d05e5.jpeg',
        id: 1,
        path: 'f9dc001f0848b3c8d86bdd18e43d05e5.jpeg',
      },
    },
  ],
  numPages: 1,
};

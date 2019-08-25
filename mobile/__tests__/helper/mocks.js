import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

export const apiMock = new MockAdapter(api);

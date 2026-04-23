import api from './api';

export const getPublicDueDates = async () => {
  const response = await api.get('/due-dates');
  return response.data;
};

export const createDueDate = async (data) => {
  const response = await api.post('/due-dates', data);
  return response.data;
};

export const deleteDueDate = async (id) => {
  const response = await api.delete(`/due-dates/${id}`);
  return response.data;
};

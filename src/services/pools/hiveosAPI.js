// src/services/hiveosAPI.js
import axios from 'axios';

const BASE_URL = 'https://api2.hiveos.farm/api/v2';

export const getFarms = async (token) => {
  const response = await axios.get(`${BASE_URL}/farms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export const getRigs = async (token, farmId) => {
  const response = await axios.get(`${BASE_URL}/farms/${farmId}/workers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

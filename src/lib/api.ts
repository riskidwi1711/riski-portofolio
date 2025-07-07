
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    if (response.data.responseCode !== 200 && response.data.responseCode !== 201) {
      throw new Error(response.data.responseMessage || `API error: ${endpoint}`);
    }
    return response.data.data || {};
  } catch (error) {
    throw new Error(`Failed to fetch ${endpoint}: ${error.message}`);
  }
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchData('/projects'),
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchData('/profile'),
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => fetchData('/skills'),
  });
};

export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: () => fetchData('/experience'),
  });
};

export const useCertifications = () => {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: () => fetchData('/certifications'),
  });
};

export const useMatrix = () => {
  return useQuery({
    queryKey: ['matrix'],
    queryFn: () => fetchData('/matrix'),
  });
};

export const postContactForm = async (data: { name: string; email: string; message: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contact`, data);
    if (response.data.responseCode !== 200 && response.data.responseCode !== 201) {
      throw new Error(response.data.responseMessage || 'Failed to send contact form');
    }
    return response.data.Data || {};
  } catch (error) {
    throw new Error(`Failed to send contact form: ${error.message}`);
  }
};

import axios, {AxiosResponse} from 'axios';
import { API_URL } from '../constants';
import { applicationNames, resourcesNames, resources} from '../models/application'

/**
 * 
 * @returns All resources
 */
export async function allResources(): Promise<resources> {
  try {
    const response:AxiosResponse<resources> = await axios.get(`${API_URL}raw`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * @description Get all application names
 * @returns applicationNames
 */
export async function getApplications(): Promise<applicationNames> {
  try {
    const response:AxiosResponse<applicationNames> = await axios.get(`${API_URL}applications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * @description get resources by application name
 * @param name 
 * @returns List of resources
 */
export async function getResoucesByApplicationName(name:string): Promise<resources>{
  try {
    const response:AxiosResponse<resources> = await axios.get(`${API_URL}applications/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []
  }
}


/**
 * @description Get all resources
 * @returns resourcesNames
 */

export async function getResources(): Promise<resourcesNames> {
  try {
    const response:AxiosResponse<resourcesNames> = await axios.get(`${API_URL}resources`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * @description Get resources by resources name
 * @param name 
 * @returns List of resources
 */

export async function getResourcesByGroupName(name:string): Promise<resources> {
  try {
    const response: AxiosResponse<resources> = await axios.get(`${API_URL}resources/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
import axios from 'axios'

const SERVERADDRESS = 'http://localhost:8000/'

export async function postFormData(formData) {
  try {
    const response = await axios.post(SERVERADDRESS, formData)
    return response
  } catch(error) {
    throw error
  }
}
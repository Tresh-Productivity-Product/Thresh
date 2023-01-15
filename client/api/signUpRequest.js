import { API_URL } from "./config";

export default (email, password, firstName, lastName, userRole) => {
  return fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      userRole
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('invalid email/password')
      }
    })
}
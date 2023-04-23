import http from 'k6/http';
export const options = {
    vus: 10,
    duration: '30s',
  };
export default function () {
  const url = 'http://localhost:4001/api/user/login';
  const payload = JSON.stringify({
    email: 'romit@gmail.com',
    password: '123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}

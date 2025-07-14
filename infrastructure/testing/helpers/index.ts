import request from 'supertest';
import app from '&/main';

export const getMethod = (method: 'get' | 'post' | 'put' | 'patch' | 'delete', path: string): request.Test => {
  const requestApp = request(app);
  switch (method) {
    case 'post':
      return requestApp.post(path);
    case 'patch':
      return requestApp.patch(path);
    case 'put':
      return requestApp.put(path);
    case 'delete':
      return requestApp.delete(path);
    default:
      return requestApp.get(path);
  }
};

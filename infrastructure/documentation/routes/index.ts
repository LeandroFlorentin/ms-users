import usersRoutes from './users';

let paths: any = {};

usersRoutes.forEach((route) => (paths[route.path] = route.object));

export default paths;

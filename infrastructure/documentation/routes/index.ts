import usersRoutes from './users';

const paths: Record<string, object> = {};

usersRoutes.forEach((route) => (paths[route.path] = route.object));

export default paths;

import client from './graphqlClient';
import { 
  GET_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME,
  CREATE_USER,
  DELETE_USER,
  GET_ROLES,
  GET_USER_ROLES,
  GET_USER_ROLES_BY_USER_ID,
  GET_USER_ROLES_BY_ROLE_ID,
  GET_ALL_USER_ROLES_BY_USER_ID,
  CREATE_USER_ROLE,
  DELETE_USER_ROLE,
  GET_MOVIES, 
  GET_MOVIE_BY_ID, 
  LOAD_MOVIES,
  GET_MOVIE_REVIEWS,
  GET_MOVIE_REVIEW_BY_ID,
  GET_MOVIE_REVIEWS_BY_MOVIE_ID,
  CREATE_MOVIE_REVIEW,
} from '../queries/movieQueries';

export const executeQuery = async (query, variables = {}) => {
  try {
    const result = await client.query({
      query,
      variables,
      fetchPolicy: 'network-only'
    });
    return result.data;
  } catch (error) {
    console.error('GraphQL Query Error:', error);
    throw error;
  }
};

export const executeMutation = async (mutation, variables = {}) => {
  try {
    const result = await client.mutate({
      mutation,
      variables
    });
    return result.data;
  } catch (error) {
    console.error('GraphQL Mutation Error:', error);
    throw error;
  }
};

export const getMovies = (page = 1, pageSize = 10) => {
  return executeQuery(GET_MOVIES, { page, pageSize });
};

export const getMovieById = (movieId) => {
  return executeQuery(GET_MOVIE_BY_ID, { movieId });
};

export const loadMovies = () => {
  return executeMutation(LOAD_MOVIES);
};

export const getMovieReviews = (page = 1, pageSize = 10) => {
  return executeQuery(GET_MOVIE_REVIEWS, { page, pageSize });
};

export const getMovieReviewById = (movieReviewId) => {
  return executeQuery(GET_MOVIE_REVIEW_BY_ID, { movieReviewId });
};

export const getMovieReviewsByMovieId = (movieId, page = 1, pageSize = 10) => {
  return executeQuery(GET_MOVIE_REVIEWS_BY_MOVIE_ID, { movieId, page, pageSize });
};

export const createMovieReview = (movieReviewData) => {
  return executeMutation(CREATE_MOVIE_REVIEW, { movieReviewDTO: movieReviewData });
};

export const getRoles = () => {
  return executeQuery(GET_ROLES);
};

export const getUsers = (page = 1, pageSize = 10) => {
  return executeQuery(GET_USERS, { page, pageSize });
};

export const getUserById = (userId) => {
  return executeQuery(GET_USER_BY_ID, { userId });
};

export const getUserByUsername = (username) => {
  return executeQuery(GET_USER_BY_USERNAME, { username });
};

export const createUser = (userData) => {
  return executeMutation(CREATE_USER, { user: userData });
};

export const deleteUser = (userId) => {
  return executeMutation(DELETE_USER, { userId });
};

export const getUserRoles = (page = 1, pageSize = 10) => {
  return executeQuery(GET_USER_ROLES, { page, pageSize });
};

export const getUserRolesByUserId = (userId, page = 1, pageSize = 10) => {
  return executeQuery(GET_USER_ROLES_BY_USER_ID, { userId, page, pageSize });
};

export const getUserRolesByRoleId = (roleId, page = 1, pageSize = 10) => {
  return executeQuery(GET_USER_ROLES_BY_ROLE_ID, { roleId, page, pageSize });
};

export const getAllUserRolesByUserId = (userId) => {
  return executeQuery(GET_ALL_USER_ROLES_BY_USER_ID, { userId });
};

export const createUserRole = (userRoleData) => {
  return executeMutation(CREATE_USER_ROLE, { userRole: userRoleData });
};

export const deleteUserRole = (userRoleId) => {
  return executeMutation(DELETE_USER_ROLE, { userRoleId });
};
import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query GetMovieDetailsResponseDTO($page: Int = 1, $pageSize: Int = 10) {
    getMovieDetailsResponseDTO(page: $page, pageSize: $pageSize) {
      page
      totalPages
      totalResults
      results {
        id
        genreIds
        genres
        originalLanguage
        originalTitle
        overview
        popularity
        posterPath
        releaseDate
        title
        voteAverage
        voteCount
        createOn
      }
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($movieId: ID!) {
    getMovieById(movieId: $movieId) {
      id
      genreIds
      genres
      originalLanguage
      originalTitle
      overview
      popularity
      posterPath
      releaseDate
      title
      voteAverage
      voteCount
      createOn
    }
  }
`;

export const LOAD_MOVIES = gql`
  mutation LoadMovies {
    loadMovies
  }
`;

export const GET_MOVIE_REVIEWS = gql`
  query GetMovieReviewResponseDTO($page: Int = 1, $pageSize: Int = 10) {
    getMovieReviewResponseDTO(page: $page, pageSize: $pageSize) {
      page
      totalPages
      totalResults
      results {
        id
        review
        score
        movieId
        createOn
      }
    }
  }
`;

export const GET_MOVIE_REVIEW_BY_ID = gql`
  query GetMovieReviewResponseDTOByID($movieReviewId: ID!) {
    getMovieReviewResponseDTOByID(movieReviewId: $movieReviewId) {
      id
      review
      score
      movieId
      createOn
    }
  }
`;

export const GET_MOVIE_REVIEWS_BY_MOVIE_ID = gql`
  query GetMovieReviewResponseDTOByMovieID($movieId: ID!, $page: Int = 1, $pageSize: Int = 10) {
    getMovieReviewResponseDTOByMovieID(movieId: $movieId, page: $page, pageSize: $pageSize) {
      page
      totalPages
      totalResults
      results {
        id
        review
        score
        movieId
        createOn
      }
    }
  }
`;

export const CREATE_MOVIE_REVIEW = gql`
  mutation CreateMovieReview($movieReviewDTO: InputMovieReviewDTO!) {
    createMovieReview(movieReviewDTO: $movieReviewDTO)
  }
`;

export const GET_ROLES = gql`
  query GetRoleList {
    getRoleList {
      id
      role
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($page: Int = 1, $pageSize: Int = 10) {
    getUsers(page: $page, pageSize: $pageSize) {
      page
      totalPages
      totalResults
      results {
        id
        username
        fullname
        passwordChangeRequired
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      username
      fullname
      passwordChangeRequired
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      username
      fullname
      passwordChangeRequired
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: UserWithPasswordDTO!) {
    createUser(user: $user)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const GET_USER_ROLES = gql`
  query GetUserRoleList($page: Int = 1, $pageSize: Int = 10) {
    getUserRoleList(page: $page, pageSize: $pageSize) {
      page
      totalPages
      totalResults
      results {
        id
        user {
          id
          username
          fullname
          passwordChangeRequired
        }
        role {
          id
          role
        }
      }
    }
  }
`;

export const GET_USER_ROLES_BY_USER_ID = gql`
  query GetUserRoleListByUserId($userId: ID!, $page: Int = 1, $pageSize: Int = 10) {
    getUserRoleListByUserId(userId: $userId, page: $page, pageSize: $pageSize) {
      page
      totalPages
      totalResults
      results {
        id
        user {
          id
          username
          fullname
          passwordChangeRequired
        }
        role {
          id
          role
        }
      }
    }
  }
`;

export const GET_USER_ROLES_BY_ROLE_ID = gql`
  query GetUserRoleListByRoleId($roleId: ID!, $page: Int = 1, $pageSize: Int = 10) {
    getUserRoleListByRoleId(roleId: $roleId, page: $page, pageSize: $pageSize) {
      page
      totalPages
      totalResults
      results {
        id
        user {
          id
          username
          fullname
          passwordChangeRequired
        }
        role {
          id
          role
        }
      }
    }
  }
`;

export const GET_ALL_USER_ROLES_BY_USER_ID = gql`
  query GetAllUserRoleListByUserId($userId: ID!) {
    getAllUserRoleListByUserId(userId: $userId) {
      id
      user {
        id
        username
        fullname
        passwordChangeRequired
      }
      role {
        id
        role
      }
    }
  }
`;


export const CREATE_USER_ROLE = gql`
  mutation CreateUserRole($userRole: InputUserRoleDTO!) {
    createUserRole(userRole: $userRole)
  }
`;

export const DELETE_USER_ROLE = gql`
  mutation DeleteUserRole($userRoleId: ID!) {
    deleteUserRole(userRoleId: $userRoleId)
  }
`;
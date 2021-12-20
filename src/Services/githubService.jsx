import axios from "axios";
import gql from "graphql-tag";

const gitApiUrl = "https://api.github.com";
const baseUrl = "https://api.github.com/graphql";


export const GetRepositoriesByUser = async (user, per_page = 10) => {
    const GET_USER_REPOSITORIES = `
    query ($login: String!, $records: Int!) {
        user(login: $login) {
        name
        url
        avatarUrl
        repositories(first: $records) {
          totalCount
          nodes {
            id
            name
            url
            forks{
              totalCount
            }
          }
        }
      }
    }
    `;

  return await axios.post(baseUrl,{
    query: GET_USER_REPOSITORIES,
    variables: { login: user, records: per_page} },
    { headers: 
      {Authorization: `bearer ${process.env.REACT_APP_PERSONAL_TOKEN}`}
  });
};

export const GetFavoritesRepositoriesByUser = async (user, per_page = 10) => {
    const GET_USER_STARRED_REPOSITORIES = `
    query ($login: String!, $records: Int!) {
        user(login: $login) {
        name
        url
        avatarUrl
        starredRepositories(first: $records) {
          totalCount
          nodes {
            id
            name
            url
            forks{
              totalCount
            }
          }
        }
      }
    }
    `;

  return await axios.post(baseUrl,{
    query: GET_USER_STARRED_REPOSITORIES,
    variables: { login: user, records: per_page} },
    { headers: 
      {Authorization: `bearer ${process.env.REACT_APP_PERSONAL_TOKEN}`}
  });
};

export const GetUserRepos = async (
  GetRepositoriesByUser,
  GetFavoritesRepositoriesByUser
) => {
  return await axios.all([
    GetRepositoriesByUser,
    GetFavoritesRepositoriesByUser,
  ]);
};


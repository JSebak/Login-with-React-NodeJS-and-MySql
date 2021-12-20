import "./ProfileComponent.css";
import React, { useState, useEffect, useContext } from "react";
import {
  GetFavoritesRepositoriesByUser,
  GetRepositoriesByUser,
  GetUserRepos,
  GetPrivateRepositoriesByUser,
} from "../../Services/githubService";
import axios from "axios";
import RepoCardComponent from "./RepoCardComponent";
import { useNavigate, useHistory, useInRouterContext } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import LoginComponent from "../Login/loginComponent";
import Spinner from "../Common/Spinner";

const Profile = ({ handleLogin, handleLogout }) => {
  const [repositories, setRepositories] = useState([]);
  const [favRepos, setFavRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const modifyFavorites = (repo) => {
    let favs = [...favorites];
    const isFav = favorites.some((c) => c === repo);
    if (isFav) {
      const filteredFavs = favs.filter((c) => c !== repo);
      setFavorites(filteredFavs);
    } else {
      favs.push(repo);
      setFavorites(favs);
    }
  };

  const navigate = useNavigate();
  const user = useUser();
  console.log(user);

  const GetRepos = (user) => {
    setisLoading(true);
    GetUserRepos(
      GetRepositoriesByUser(user.username),
      GetFavoritesRepositoriesByUser(user.username)
    )
      .then(
        axios.spread((...result) => {
          setisLoading(false);
          const repos = result[0].data.data.user.repositories.nodes;
          const fav = result[1].data.data.user.starredRepositories.nodes;
          const avat = result[0].data.data.user.avatarUrl;
          setAvatar(avat);
          setRepositories(repos);
          setFavRepos(fav);
          setFavorites(fav);
          setFilteredRepos(repos);
        })
      )
      .catch((e) => {
        setisLoading(false);
        console.log(e);
      });
  };
  const Logout = (user) => {
    handleLogout(user);
    navigate("/login");
  };

  const Search = (event) => {
    setisLoading(true);
    const filtered = repositories.filter((r) => {
      return r.name.toLowerCase().match(event.toLowerCase());
    });
    setFilteredRepos(filtered);
    setisLoading(false);
  };

  useEffect(() => {
    if (user.username != undefined) GetRepos(user);
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div id="ContainsAll">
          {user.username != undefined ? (
            <div className="Pcontainer">
              <div className="ProfileHeader">
                <div className="Profile">
                  <img
                    className="Logo"
                    src={avatar.length > 0 ? avatar : "/TreeLogo.jpg"}
                    alt="github"
                  />
                  <h1 id="Username">{user.username}</h1>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Search for a Repo"
                    onChange={(event) => {
                      Search(event.target.value);
                    }}
                  />
                </div>
                <button id="logout" onClick={Logout}>
                  Logout
                </button>
              </div>

              {filteredRepos.length > 0 ? (
                <div className="RepoList">
                  {filteredRepos.map((rep) => (
                    <div className="item" key={"key" + rep.id}>
                      <RepoCardComponent
                        repo={rep}
                        modifyFavorites={modifyFavorites}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="RepoList">
                  <h1>No Repositories</h1>
                </div>

              )}
              {favorites.length > 0 ? (
                <div className="FavRepos">
                  <h1>Favorite repos</h1>
                  {favorites.map((frep) => (
                    <div className="Favitem" key={"key" + frep.id}>
                      <RepoCardComponent
                        repo={frep}
                        modifyFavorites={modifyFavorites}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="FavRepos">
                  <h1>No Favorites</h1>
                </div>
              )}
            </div>
          ) : (
            <LoginComponent handleLogin={handleLogin} />
          )}
        </div>
      )}
    </>
  );
};
export default Profile;

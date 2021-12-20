import React from "react";
import "./RepoCardComponent.css";

const RepoCardComponent = ({repo,modifyFavorites}) => {
  const repository = repo;

  return (
    <div className="Card">
      <h1 id="title">{repository.name}</h1>
      <a href={repository.url}>
        <img
          className="githubLogo"
          src="GitHublight.png"
          alt="github"
        />
      </a>

      <div>
        <div>No of Forks: {repository.forks.totalCount}</div>
        <button id="fav" onClick={()=>modifyFavorites(repo)}>Favorite</button>
      </div>
    </div>
  );
};
export default RepoCardComponent;

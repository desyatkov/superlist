import React from "react";

export default function(props) {
  const newArticle = JSON.parse(props.children);
  return <article>
      <ul>
        {newArticle.Sheet1.map(el => <li key={el.id}>
            <p>{el.title}</p>
            <p>{el.body}</p>
        </li>)}
      </ul>
    </article>;
};

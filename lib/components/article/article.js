import React from "react";

export default function(props) {
  console.log("props.pageCount", props.pageCount);
  return <article>
      <ul>
        {JSON.parse(props.children).map(el => <li key={el.id}>
            <p>{el.title}</p>
            <p>{el.body}</p>
          </li>)}
      </ul>
    </article>;
};

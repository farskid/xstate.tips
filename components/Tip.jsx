import * as React from "react";

export const Tip = ({ children, meta }) => {
  return (
    <>
      {meta.title && <h1>{meta.title}</h1>}
      {meta.pubDate && <date>{meta.pubDate}</date>}
      {meta.author && (
        <p>
          by <em>{meta.author}</em>
        </p>
      )}
      {meta.description && <p>{meta.description}</p>}
      <div className="break" />
      <article>{children}</article>
    </>
  );
};

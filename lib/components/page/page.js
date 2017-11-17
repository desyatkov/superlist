import React from "react";

export default function(props) {
  return <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,300i" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/styles.css" />
        <link rel="manifest" href="/assets/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <header>
          <div>Header</div>
        </header>
        <div>
          <div dangerouslySetInnerHTML={{ __html: props.children }} />
        </div>
      </body>
    </html>;
}
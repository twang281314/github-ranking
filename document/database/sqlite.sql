CREATE TABLE repositories ( 
    id               INTEGER         PRIMARY KEY,
    name             VARCHAR( 100 ),
    full_name        VARCHAR( 500 ),
    html_url         VARCHAR( 500 ),
    description      VARCHAR( 800 ),
    stargazers_count INTEGER,
    watchers_count   INTEGER,
    language         VARCHAR( 50 ),
    forks_count      INTEGER 
);

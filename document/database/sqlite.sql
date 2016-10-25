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

CREATE TABLE users ( 
    id               INTEGER         PRIMARY KEY,
    login            VARCHAR( 100 ),
    avatar_url       VARCHAR( 500 ),
    url              VARCHAR( 200 ),
    html_url         VARCHAR( 200 ),
    name             VARCHAR( 100 ),
    company          VARCHAR( 100 ),
    blog             VARCHAR( 100 ),
    location         VARCHAR( 100 ),
    email            VARCHAR( 50 ),
    public_repos     INTEGER,
    followers        INTEGER,
    following        INTEGER,
    created_at       DATETIME,
    updated_at       DATETIME,
    last_update_time DATETIME 
);

CREATE TABLE updateLog ( 
    id           INTEGER        PRIMARY KEY ASC AUTOINCREMENT,
    updateTime   DATETIME,
    updateType   VARCHAR( 50 ),
    updateResult VARCHAR( 20 ) 
);


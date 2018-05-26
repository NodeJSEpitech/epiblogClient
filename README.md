## EpiBlog Client : Overview
You can access this blog by going to this url : [https://nodejsepitech.github.io/epiblogClient/#/](https://nodejsepitech.github.io/epiblogClient/#/)

EpiBlog client is a simple blog written in react that showcases basics usages of the react library.
You can signin, signup, see posts, submit posts, comment on posts and chat with the users currently logged in the app.

The comments are using websockets and showcase actes as some kind of channeled chat, while the chat is completly global and acts more as a IRC chat, where no history is saved and every on the site can talk, even if they're not logged in.


## Architecture
Pretty straigh straightforward, the architecture is as follow :

 ├── components
├── libs
├── modules
├── pages
│   ├── home
│   ├── post_create
│   ├── post_detail
│   └── signin
└── redux
    ├── actions
    └── reducers

**Components** is where our low level components are stored
**Libs** is where our libs are stored (well only the api lib, really)
**Module** is where our websocket singleton is stored
**Pages** representes each pages of our project (each routes if you'd like)
**Redux** is where our controlers / reducers are stored

## Stores :

**Authentication** stores looks for the token in the local storage if it existe, and has some actions to signin and signup
** Comments** stores comments relative to the current post
**Messages** stores the received messages
**Posts** stores the posts fetched when the api is launched
**User** stores the user info

## Websockets :

Only one websockets channel is open for both the chat and the comments, our singletone process messages and decide what to do with them.

## Api Call Lib :
It's a simple lib that takes care of putting the necessary headers into the request, it has most of the REST functions implemented such as get, put, update and delete.


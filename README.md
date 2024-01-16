# FFrello 

FFrello, or 'Frank's Fake Trello', is a recreation of [Trello](https://trello.com/) written in ReactJs on the front end, and .NET core on the [back end](https://github.com/fmiskuly19/ffrello-api).

I started FFrello in late 2023 to brush up on my full stack web dev skills that I was not using in my career. I spent a lot of time trying to figure out a project to create that would let me practice these skills, but could not think of anything meaningful that I could commit to. Often times in software development, especially with personal projects, I have found myself stuck in the "ideas" phase. Too much time thinking of what to do, and not enough time thinking about how to do the thing. 

This is why I decided to recreate Trello. I didn't want to waste any more time thinking about what to build, and I just wanted to get to building. I am not sure if people will agree with this approach, some may say "why waste time building something that already exists?" I am not here to reinvent the wheel or create tomorrows next big idea, I just want to practice full stack web dev. This way, all my thought goes into how to create this, instead of what this thing should actually be.  

If you are viewing this page and have comments/suggestions/coding advice, please send it my way! (yluksim9@gmail.com)

## Goals

I would like to get this site to a point where a user could log in with a Google account, which would be used on the backend to authenticate a user and authorize api calls. Currently the website only operates in a 1 user 'local' mode. 

Overall goals for the website:
- Google OAuth integration for users (multiuser support)
- Near 1:1 replication of Trello's main functionality (boards, user highlights, workspaces, templates, etc.) and UI.
- Microsoft Azure data analytics
- Blazor front end for the web api

## Host

FFrello is hosted at https://ffrello.onrender.com/

The backend web api is hosted in [Microsoft Azure](https://ffrelloapiappservice.azurewebsites.net/). 

## Tech stack
- [vite](https://vitejs.dev/) (I am not using this to its potential so I may remove this dependency)
- [material-ui](https://mui.com/material-ui/) for UI kit and styling
- [react-redux](https://react-redux.js.org/) for state management
- [react-router-dom](https://reactrouter.com/en/main) for navigation
- [react-color](https://casesandberg.github.io/react-color/) for colorpicker elements
- [material-ui-popup-state](https://www.npmjs.com/package/material-ui-popup-state) helper library for material ui popups
- [notistack](https://www.npmjs.com/package/notistack) for user notifications

## Screenshots (WIP)

### Home Pages
![Home Page](https://github.com/fmiskuly19/ffrello/assets/33069374/f55e25f9-e096-4fc5-aadd-a9c08c103ebd)
![Home Boards Page](https://github.com/fmiskuly19/ffrello/assets/33069374/c5312185-dd20-4d32-932f-00e43dace3b1)

### Theming
![Theme Dropdown](https://github.com/fmiskuly19/ffrello/assets/33069374/dfcd88dd-fbe7-4462-8df5-9c3569e0f54e)
![Theme Editor](https://github.com/fmiskuly19/ffrello/assets/33069374/c65065bf-1303-4359-b85c-5fec9066ffb0)
![Theme Editor (Cats Theme)](https://github.com/fmiskuly19/ffrello/assets/33069374/30430793-f94e-4106-a32c-98920467dc18)
![Frutiger Aero Light Theme](https://github.com/fmiskuly19/ffrello/assets/33069374/01a1e870-c2c4-4cfb-a946-5176c78310d3)

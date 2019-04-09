## Simple Guestbook Application

Based on JetBrains RingUI components.

#Development 
Noting special. React and that's it.

Helpful commands:

npm start 
  to run a local development server

npm test 
  to launch karma tests

npm run lint 
  to lint your code

npm run build 
  to build a production bundle

npm run create-component 
  to create a new component template with styles and tests


#Production

1) run `npm run build` 

2) copy `dist` folder to the `docker` folder

3) run `docker build -t gb .`

4) run `docker run --name gb -e "API_URL=<endpoint>" -d -p 80:80 gb`

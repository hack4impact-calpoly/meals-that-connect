## Meals that Connect

Meals That Connect serves free nutritious noontime meals every weekday to 1,800 seniors throughout San Luis Obispo. Seniors gather together at dining rooms throughout the county to eat together, share stories and build friendships. For those who are unable to leave their homes, volunteers personally deliver meals, using those visits as opportunities to check in on the seniors.

## Running the website locally

- In the terminal, navigate to the folder you'd like the project to be in. 
- Run `git clone https://github.com/hack4impact-calpoly/meals-that-connect.git` to clone the repository.
- There are two files (.env and fire.js) that aren't included in this repo for security reasons. Contact the team to recieve those files.   
  - .env should go into the /backend folder
  - fire.js should go in the /frontend/src folder 
- Navigate to the frontend folder and run `npm install && npm start`
  - Now the frontend should be up and running on http://localhost:3000/
- Open a new terminal window and navigate to the backend folder
- Run `npm install && npm run dev`
  - Now the backend should be up and running on http://localhost:3001/
- Happy coding!

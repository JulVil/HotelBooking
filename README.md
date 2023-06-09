
# NOTBOOKING

Welcome to the [NotBooking App](https://notbooking.julianvilalta.com/) project! This web application aims to replicate some of the key features of booking.com. Users can search for destinations, select dates, and book rooms from a list of available options. The project is built using various technologies to ensure smooth functionality and security. Let's dive into the project and the techs used.## Technologies Used

#### Frontend
- [React](https://react.dev/): The frontend of the NotBooking App is built using React, a popular JavaScript library for building user interfaces. React allows for the creation of reusable UI components and provides efficient rendering through its virtual DOM.

- [Sass](https://sass-lang.com/): Sass (Syntactically Awesome Style Sheets) is used for styling the frontend. Sass is a CSS preprocessor that extends the functionality of CSS by introducing variables, mixins, and nested rules, making styling more modular and maintainable.

#### Backend
- [Node.js](https://nodejs.org/en/about): The NotBooking App's backend is powered by Node.js, a JavaScript runtime environment. It enables server-side scripting and allows the use of JavaScript on the server, making it possible to build scalable and efficient web applications.

- [Express](https://expressjs.com/): Express is a minimalistic web application framework for Node.js. It provides a robust set of features for building web APIs and handling HTTP requests, making it ideal for creating the backend infrastructure of the NotBooking App.

- [MongoDB](https://www.mongodb.com/): The project's database is implemented using MongoDB, a NoSQL document-oriented database. MongoDB allows for flexible data storage and retrieval, making it suitable for handling the dynamic nature of user and hotel information and booking details.

- [Mongoose](https://mongoosejs.com/): Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a simple and straightforward way to interact with the MongoDB database and define data models, making it easier to work with MongoDB within a Node.js environment.

- [Bcrypt](https://www.npmjs.com/package/bcrypt): Bcrypt is a password hashing function used for securely storing and comparing passwords. In the NotBooking App, Bcrypt is used to encrypt and verify user passwords before storing them in the database, enhancing the security of user accounts.

- [Cookies](https://www.npmjs.com/package/cookie-parser): Cookies are used for session management and user authentication in the Booking App. They allow the server to identify and authenticate users across multiple requests, providing a seamless and secure user experience.

- [JSON Web Token (JWT)](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token is a standard for securely transmitting information between parties as a JSON object. In the NotBooking App, JWT is used for user authentication and authorization. It generates a token upon successful login, which is then used for subsequent API requests to authenticate and authorize the user.
## Features

The NotBooking App provides the following features:

1. <ins>Search Destinations:</ins> Users can search for their desired destinations using the search functionality. They can enter the name of the destination and get a list of available hotels.
2. <ins>Pick Dates:</ins> Users can select check-in and check-out dates for their stay. The app will display the available rooms for the selected dates. 
3. <ins>Hotel Listings:</ins> The app presents a list of hotels available for booking. Each hotel listing includes information such as description, images, prices, and ratings, allowing users to compare and choose the most suitable option.
4. <ins>Room Booking:</ins> Users can book a room by selecting the desired hotel from the listings, then use the reserve option to see the available rooms with their information. If the room is already reserved on the same date by another user, it will not be available for booking.
5. <ins>User Authentication:</ins> The NotBooking App includes user authentication features. Users can create new accounts or log in with existing accounts to access their profile, view booking history, and manage their information securely.
## Screenshots

<img src="https://github.com/JulVil/HotelBooking/blob/master/.github/notBookinghome.png" width=75% height=75%>
<img src="https://github.com/JulVil/HotelBooking/blob/master/.github/search.png" width=75% height=75%>
<img src="https://github.com/JulVil/HotelBooking/blob/master/.github/single.png" width=75% height=75%>
<img src="https://github.com/JulVil/HotelBooking/blob/master/.github/rooms.png" width=75% height=75%>
<img src="https://github.com/JulVil/HotelBooking/blob/master/.github/profile.png" width=75% height=75%>

## License

[MIT](https://choosealicense.com/licenses/mit/)


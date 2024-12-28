# StackTruck

A web application designed to facilitate client and driver interactions for booking and updating truck transportation services. Built with **Node.js**, **Express**, and **MongoDB**, the app provides features for user registration, login, and managing transportation details.

## Features

- **Client and Driver Registration**: Users can register as clients or drivers.
- **Login System**: Secure login for clients and drivers.
- **Truck Booking**: Clients can search for and book available trucks based on criteria like capacity and route.
- **Driver Management**: Drivers can update their truck availability and other details.
- **Dynamic Views**: Rendering of various pages using EJS templates.

---

## Installation

Follow these steps to set up the application:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/purneshsv/StackTruck.git
   cd StackTruck


## Install dependencies:
npm install

## Set up the MongoDB connection:

mongoose.connect("your-mongodb-connection-string", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


## Start the application:

npm start


## Project Structure

- **`app.js`**: Main application file defining routes and logic.
- **`connect.js`**: MongoDB connection setup.
- **`db.js`**: Mongoose schemas for:
  - **`client`**: Client registration and details.
  - **`driver`**: Driver registration and details.
  - **`display`**: Truck availability and route information.
- **`views/`**: Contains EJS template files for rendering pages.
- **`public/`**: Static files like CSS and images.
- **`package.json`**: Manages project dependencies and metadata.


## Dependencies

The project uses the following Node.js packages:

- **[Express](https://www.npmjs.com/package/express)**: Web framework for Node.js.
- **[Mongoose](https://www.npmjs.com/package/mongoose)**: MongoDB object modeling tool.
- **[EJS](https://www.npmjs.com/package/ejs)**: Template engine for rendering dynamic HTML.
- **[Body-Parser](https://www.npmjs.com/package/body-parser)**: Middleware to parse incoming request bodies.
- **[Nodemon](https://www.npmjs.com/package/nodemon)**: Automatically restarts the server during development.



## Usage

### Client Features
- **Register**: Create a client account with details like name, email, and phone number.
- **Login**: Access your profile and manage bookings.
- **Book Trucks**: Search for trucks based on route and capacity and confirm bookings.

### Driver Features
- **Register**: Create a driver account with details like license number, truck type, and insurance policy.
- **Login**: Update truck availability, routes, and capacity details.

---

## API Endpoints

### GET Endpoints
- `/`: Render the homepage.
- `/client`: Render the client registration page.
- `/driver`: Render the driver registration page.
- `/book`: Render the booking page.

### POST Endpoints
- `/client`: Handle client registration.
- `/driver`: Handle driver registration.
- `/booked`: Confirm a booking.
- `/update`: Update truck availability details.

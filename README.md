## Session Log

This web application is a **Node.js** app comprised of a **React.js** front-end (*client* directory), an **Express.js** server (*app.js* file), and a **MongoDB** database.

The website offers three main functions:
- **Check the surf forecast.**
The user can generate surf forecast details for Linda Mar and Ocean Beach up to five days into the future. The forecast information is provided by the [Magicseaweed](https://magicseaweed.com) API.
- **Log a surf session.**
The user can log a surf session report in the public database or the private database. When a report is logged, the session information and the corresponding forecast information is saved in the database. The only difference between the two databases is that a password is required when logging a session in the private database.
- **View the session reports.**
The user can view all session log entries in both the public database and the private database, along with the associated forecast details for each session. The purpose of the public database is to allow website visitors to test the functionality of the website.

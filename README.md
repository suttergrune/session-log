## Session Log

https://session-log.herokuapp.com/

This web application is a **Node.js** app comprised of a **React.js** front-end (*client* directory), an **Express.js** server (*app.js* file), and a **MongoDB** database.

The website offers 4 main functionalities:
- **Check the surf forecast.**
The user can generate surf forecast details for either Linda Mar, Pacifica or Ocean Beach, San Francisco. The forecast information is provided by the [Magicseaweed](https://magicseaweed.com/) API.
- **Record a session.**
The user can log a surf session into one of the two databases (password required for the private database). Once submitted and validated, the form information is inserted into the database. In addition, the session's corresponding forecast is also inserted, according to the specified location, date, and time of the session. 
- **View the public database.**
The user can view all session log entries in the public database, along with each session's associated forecast details. Correspondence between the session time and forecast time will likely not be exact, as the forecast API provides information only at hour intervals. This database is mainly for allowing website visitors to test the funcionality of the website.
- **View the private database.**
The user can view all session log entries in the private database, along with each session's associated forecast details. The idea is to accumulate data overtime in order to eventually draw conclusions and determine patterns between the surf forecast variables and the surf session experience, in order to make more confident decisions when deciding *when* and *where* to surf.

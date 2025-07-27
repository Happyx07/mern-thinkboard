 Learn to build a REST API with Express.js
 first we will create a simple route
 API - Application Programming Interface
 Express.js - A web application framework for Node.js
 Node.js - A JavaScript runtime built on Chrome's V8 JavaScript engine
 API is a set of rules that allows different software applications to communicate with each other
 REST - Representational State Transfer
 CRUD - Create, Read, Update, Delete
 REST API - A set of rules that allows different software applications to communicate with each other over the internet
 RESTful API - An API that follows the principles of REST
 HTTP - Hypertext Transfer Protocol
 GET - Retrieve data from the server
 POST - Send data to the server
 PUT - Update data on the server
 DELETE - Delete data from the server
 JSON - JavaScript Object Notation
 Middleware - A function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle
 Body Parser - A middleware that parses the request body and makes it available under req.body
 CORS - Cross-Origin Resource Sharing
 Mongoose - A MongoDB object modeling tool designed to work in an asynchronous environment
 MongoDB - A NoSQL database
 MongoDB Atlas - A cloud database service by MongoDB



 _--------------------------------------------------
 ______________HTTP STATUS CODES____________________
  _--------------------------------------------------
  1XX - Informational responses
  2XX - Success
  3XX - Redirection
  4XX - Client errors
  5XX - Server errors
  _-----------------------------------------  ---------
  100 Continue - The server has received the request headers and the client should proceed to send the request body
  101 Switching Protocols - The requester has asked the server to switch protocols
  200 OK - The request has succeeded
  201 Created - The request has been fulfilled and resulted in a new resource being created
  202 Accepted - The request has been accepted for processing, but the processing has not been completed
  
  301 Moved Permanently - The requested resource has been assigned a new permanent URI
  302 Found - The requested resource resides temporarily under a different URI
  303 See Other - The response to the request can be found under a different URI
 
  400 Bad Request - The server cannot or will not process the request due to a client error
  401 Unauthorized - The request has not been applied because it lacks valid authentication credentials for the target resource
  403 Forbidden - The server understood the request but refuses to authorize it
  
  500 Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request
  503 Service Unavailable - The server is currently unable to handle the request due to temporary overloading or maintenance of the server
  _--------------------------------------------------
  ________________HTTP METHODS____________________
  _--------------------------------------------------
  GET - Retrieve data from the server
  POST - Send data to the server  
  PUT - Update data on the server
  DELETE - Delete data from the server
  PATCH - Apply partial modifications to a resource
  HEAD - Same as GET, but only retrieves the headers
  OPTIONS - Describe the communication options for the target resource
  ---------------------------------------------------



  ________________ENDPOINTS____________________
  _--------------------------------------------------
  WHAT IS AN ENDPOINT?
  An endpoint is a combination of a URL and an HTTP method that lets the client interact with a specific resource on the server.
  For example, the endpoint /api/users is a combination of the URL /api/users and the HTTP method GET, which retrieves a list of users from the server.

  **//what is an endpoint?**
// An endpoint is a specific URL where an API can be accessed by a client application. It is a point of interaction between the client and the server, allowing the client to send requests and receive responses.
Task list manager
   - node client.js

TCP networking with the Net Module
  - node net.js              //server side
  - nc localhost 8000        //client side

DNS module
  - node dns.js

UDP Datagram Sockets
  - node udp.js

HTTP server - Basic Streamming
  -  node http-server.js
    response headers
      Connection: keep-alive    - means: Connection stays open after the current transaction finishes, won't be killed after request/response, multiple request on the same connection is enabled.

      Transfer-Encoding: chunked    - means: response has been streamed, chunked encoding is useful when larger amounts of data are sent to the client and the total size of the response may not be known until the request has been fully processed. 
      For example, when generating a large HTML table resulting from a database query or when transmitting large images. A chunked response looks like this:
      
      HTTP/1.1 200 OK 
      Content-Type: text/plain 
      Transfer-Encoding: chunked

      7\r\n
      Mozilla\r\n 
      9\r\n
      Developer\r\n
      7\r\n
      Network\r\n
      0\r\n 
      \r\n

      Node is ok with it as partial chunked response, because the response object is a writalbe stream.

Requesting HTTP/HTTPS Data
  node request.js
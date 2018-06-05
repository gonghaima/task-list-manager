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

Routes
  node server.js
  curl -i localhost:8000/api
  curl -i localhost:8000/home

Parsing URLs and Query Strings#

parse a string, returns a URL object.
url.parse('https://www.pluralsight.com/search?q=buna')

returns a URL object, and query as an object
url.parse('https://www.pluralsight.com/search?q=buna', true)

return query only, as an object
url.parse('https://www.pluralsight.com/search?q=buna', true).query.q

parse an object, return a url string
url.format({
...   protocol: 'https:',
...   host: 'www.pluralsight.com',
...   search: '?q=buna',
...   pathname: '/search',
... })
'https://www.pluralsight.com/search?q=buna'


If only care about query string, querystring module can be used.
querystring.stringify({name:'Samer BUna', website: 'www.pluralsight.com'})
'name=Samer%20BUna&website=www.pluralsight.com'

query string to object
querystring.parse('name=Samer%20BUna&website=www.pluralsight.com')
{ name: 'Samer BUna', website: 'www.pluralsight.com' }


URL Strings and URL Objects - REFERENCE - https://nodejs.org/api/url.html

A URL string is a structured string containing multiple meaningful components. When parsed, a URL object is returned containing properties for each of these components.

The url module provides two APIs for working with URLs: a legacy API that is Node.js specific, and a newer API that implements the same WHATWG URL Standard used by web browsers.

While the Legacy API has not been deprecated, it is maintained solely for backwards compatibility with existing applications. New application code should use the WHATWG API.

A comparison between the WHATWG and Legacy APIs is provided below. Above the URL 'http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash', properties of an object returned by the legacy url.parse() are shown. Below it are properties of a WHATWG URL object.

WHATWG URL's origin property includes protocol and host, but not username or password.

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘


Operating System
const os = require('os')
os.cpus()
os.networkInterfaces().en0
os.networkInterfaces().en0.map(i=>i.address)
os.freemem()
os.type()
os.release()
os.userInfo()

Stream
node create-big-file.js
node server-stream.js

Implementing Readable & Writable Streams
node writable.js
node readable.js
node readable.js | head -c3

Duplex & Transform streams
node duplex.js
node transform.js
*** ll -h to check file size on big.file.gz from 54M to 162k ***
*** gunzip big.file.gz ***
*** rm big.file ***
node zip.js big.file
node unzip.js big.file.zz

  Composability with streams
  Stream types
    - pipe() vs events
    - Implementing vs consuming
    - Paused vs flowing
  new
    - stream.Readable
    - stream.Writable
    - stream.Duplex
    - stream.Transform
  The zlib/crypto transform streams

Scalability Strategies - for the benefits of workload, availability, fault tolerance.
  - Cloning (clone multiple instances, effective & little cost on development)
  - Decomposing (based on functionality and services, known as micro-service)
  - SPlitting (split application into multiple instances, where each instance handle a portion of the funcitonality, known as horizontal partitioning, or shalding in database) require look-up step before each operation to determine which instance of the application to use.

Buildin tools for cloning strategy
  - Child Processes Events and Standard IO
  - ways to create child processes
    1. spawn()
    2. fork()
    3. exec()
    4. execFile()

node spawn
  - run command in child process, can register listener on event
node spawn-pipe
  - wc in child process, enter 'hello world', control+d, then 0 2 11 result as output
node find-wc.jos
  - pipe stdin & stdout
  - the result of the first process 'find' - find all files, as input of second process 'wc' - calculate lines
node exec.js
  execFile() create shell, while spawn does not, which makes spawn slightly more efficient. execFile buffers the commands generated output, and pass the whole value into a callback function. It buffers result into memoery, not good for big files.

node detach.js
ps -ef | grep timer.js
  make child process to run independently from parent process, exact behaviour depend on os. (on Windows, own console window. on Linux, the detach child process will be in the leader of group child session.)

  execFile() - executing file without using the shell. A little efficient without shell.

  all of the command has its syncronized version
  spawnSync(), forkSync(), execSync(), execFileSync();


fork() - variation of spawn function running node processes, the difference is the fork starting communication channel from child process, can use the same method (event module ) to exchange message between child to parent process, via event.
node parent.js
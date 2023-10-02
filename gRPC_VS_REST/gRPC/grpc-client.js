const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
var now = require("performance-now")

// Loading the protocol buffer definition
let PROTO_PATH = __dirname + "/../book.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
   });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Creating a new gRPC client
const client = new protoDescriptor.BookService(
  'localhost:8080',
  grpc.credentials.createInsecure()
);

// Creating a request object
const request = { search_query: 'Lord of the Rings' };

// Sending the request to the server
let start = now()
client.BookSearch(request, (error, response) => {
  let end = now()
  console.log((end-start).toFixed(3))
  if (error) {
    console.error('Error:', error.message);
    return;
  }


  // Handle the response
  console.log('Book Information:');
  console.log('Title:', response.title);
  console.log('Description:', response.description);
  console.log('Author:', response.author);
});
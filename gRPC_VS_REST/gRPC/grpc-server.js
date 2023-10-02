const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Loading the protocol buffer definition
let PROTO_PATH = __dirname + "/../book.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Implementing the gRPC service methods
const BookService = {
  BookSearch: (call, callback) => {
    const searchQuery = call.request.search_query;
    console.log("searchQuery",call.request)


    // Querying the book database for the book titled "Lord of the Rings"
    const book = {
      title: "Lord of the Rings",
      description:
        "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil...",
      author: "J. R. R. Tolkien",
    };

    // Returning the book information as the response
    callback(null, book);
  },
};

// Creating a new gRPC server
const server = new grpc.Server();

// Adding the BookService implementation to the server
server.addService(protoDescriptor.BookService.service, BookService);

// Starting the server and binding it to a port
const port = 8080;
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log(`gRPC server started on port ${port}`);
  }
);

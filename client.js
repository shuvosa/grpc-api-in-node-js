// client.js

// Import necessary gRPC modules
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Define the path to your .proto file
const PROTO_PATH = './protos/greet.proto';

// Load the protobuf definition, similar to the server.
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

// Load the gRPC package definition.
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;

/**
 * Main function to run the gRPC client.
 */
function main() {
    // Create a new gRPC client instance for the Greeter service.
    // The first argument is the address of the gRPC server.
    // The second argument specifies the credentials; in this case, insecure credentials for local testing.
    const client = new greetProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

    // Define the request data. This must match the HelloRequest message structure.
    const request = { name: 'World' };

    // Call the SayHello RPC method on the server.
    // The first argument is the request object.
    // The second argument is the callback function to handle the response or error.
    client.SayHello(request, (err, response) => {
        if (err) {
            // If an error occurred during the RPC call, log it.
            console.error('Error calling SayHello:', err.details || err.message);
            return;
        }
        // If the call was successful, log the response.
        // The response object matches the HelloReply message structure.
        console.log('Greeting:', response.message);
    });
}

// Call the main function to execute the client logic.
main();

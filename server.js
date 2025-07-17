// server.js

// Import necessary gRPC modules
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Define the path to your .proto file
const PROTO_PATH = './protos/greet.proto';

// Load the protobuf definition
// The options object ensures that the generated code is compatible with the gRPC library.
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,         // Preserve field names as they are in the .proto file
        longs: String,          // Represent 'long' numbers as JavaScript strings
        enums: String,          // Represent enums as their string names
        defaults: true,         // Apply default values for fields if not provided
        oneofs: true            // Group oneof fields correctly
    });

// Load the gRPC package definition.
// grpc.loadPackageDefinition loads a package definition object, creating gRPC service and message objects.
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;

/**
 * Implements the SayHello RPC method.
 * This function will be called when a client invokes the SayHello method on the Greeter service.
 * @param {Object} call - The call object contains the request data (call.request) and methods to send response.
 * @param {Function} callback - The callback function to send the response back to the client.
 * It takes two arguments: error (if any) and the response object.
 */
function sayHello(call, callback) {
    // Log the incoming request for debugging purposes
    console.log(`Received request for SayHello: ${call.request.name}`);

    // Construct the response message
    const responseMessage = `Hello, ${call.request.name}!`;

    // Send the response back to the client
    // The response object must match the structure defined in HelloReply message in .proto file.
    callback(null, { message: responseMessage });
}

/**
 * Starts the gRPC server.
 */
function main() {
    // Create a new gRPC server instance
    const server = new grpc.Server();

    // Add the Greeter service to the server.
    // The first argument is the service definition from the loaded proto.
    // The second argument is an object containing the implementations of the service's RPC methods.
    server.addService(greetProto.Greeter.service, {
        SayHello: sayHello, // Map the SayHello RPC method to our sayHello function
    });

    // Bind the server to a specific address and port.
    // Insecure server credentials mean no SSL/TLS is used (suitable for local development).
    const port = '0.0.0.0:50051';
    server.bindAsync(
        port,
        grpc.ServerCredentials.createInsecure(), // Use insecure credentials for simplicity
        (err, port) => {
            if (err) {
                // If there's an error during binding, log it and exit.
                console.error('Failed to bind server:', err);
                return;
            }
            // Start the server and log the port it's listening on.
            server.start();
            console.log(`gRPC server running on port ${port}`);
        }
    );
}

// Call the main function to start the server when this script is executed.
main();

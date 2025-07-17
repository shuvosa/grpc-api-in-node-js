# My gRPC App: A Simple Node.js gRPC Example

> A forward-thinking, beginner-friendly guide to building and extending a gRPC service in Node.js.

This repository contains a basic example of a gRPC (Google Remote Procedure Call) service implemented in Node.js, along with a client to interact with it. It’s designed to teach the fundamentals of gRPC, Protocol Buffers, HTTP/2 transport, and modern best practices for extending into CI/CD, containerization, observability, and more.

---

## What is gRPC?

gRPC is a modern, high-performance, open-source RPC framework that uses Protocol Buffers as its IDL and HTTP/2 for transport. It enables transparent, strongly-typed, bi-directional streaming communication between services, making it ideal for microservices and polyglot environments.

---

## Key Benefits

- **High Performance**  
  Binary serialization with ProtoBuf + HTTP/2 multiplexing.

- **Language Agnostic**  
  Define once, generate code for Node.js, Python, Go, Java, and more.

- **Strongly Typed**  
  Catch schema errors at compile time.

- **Streaming**  
  Supports unary, server-streaming, client-streaming, and bidirectional.

- **Ecosystem Friendly**  
  Integrate with Envoy, Istio, Prometheus, and more for modern service meshes.

---

## Features

- ✅ Simple **Greeter** service with a `SayHello` RPC.  
- ✅ Node.js server and client implementations.  
- ✅ Clean project layout.  
- ✅ Example of GUI testing via BloomRPC.  
- 🚀 Foundation for CI/CD pipelines, Docker, observability, and multi-language clients.

---
```
## Project Structure

my-grpc-app/
├── node_modules/ # Node.js dependencies
├── protos/
│ └── greet.proto # Protocol Buffer definition
├── package.json # Metadata & dependencies
├── package-lock.json # Lock file
├── server.js # gRPC server implementation
├── client.js # gRPC client for testing
└── README.md # This guide
```


---

## Prerequisites

- **Node.js** (LTS recommended)  
- **npm** (bundled with Node.js)  
- **BloomRPC** (or [Insomnia](https://insomnia.rest/) with gRPC plugin)  

---

## Installation

1. **Clone** this repo (or scaffold files manually):  
   ```bash
   git clone https://github.com/shuvosa/grpc-api-in-node-js.git
   cd my-grpc-app
Install dependencies:
```
bash
npm install
```

How to Run
Starting the Server
```
bash
node server.js
```
You should see:
```
nginx
gRPC server running on port 50051
```
Running the Client
In a new terminal:
```
bash
node client.js
```
Expected output:
```
Greeting: Hello, World!
Testing with BloomRPC
Launch BloomRPC.
```
```
Import protos/greet.proto.

Select Greeter → SayHello.

Set Address: localhost:50051.
```
In request body:
```
json
{
  "name": "BloomRPC User"
}
Click Send.
```
Response:
```
json

{
  "message": "Hello, BloomRPC User!"
}

```
How it Works
Protocol Definition (greet.proto):
```
proto
syntax = "proto3";

package greet;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
Server (server.js):
```


Server js
```
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('./protos/greet.proto');
const grpcObj = grpc.loadPackageDefinition(packageDef).greet;

function sayHello(call, callback) {
  const reply = { message: `Hello, ${call.request.name}!` };
  callback(null, reply);
}

const server = new grpc.Server();
server.addService(grpcObj.Greeter.service, { SayHello: sayHello });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server running on port 50051');
});
Client (client.js):
```

Client js
```
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('./protos/greet.proto');
const grpcObj = grpc.loadPackageDefinition(packageDef).greet;

const client = new grpcObj.Greeter('localhost:50051', grpc.credentials.createInsecure());

client.SayHello({ name: 'World' }, (err, response) => {
  if (err) return console.error(err);
  console.log('Greeting:', response.message);
});
```
Future Directions
Streaming RPCs: Add server-streaming, client-streaming, and bidirectional examples.

Authentication: Integrate TLS certificates and JWT/OAuth2 for secure channels.

Docker & Kubernetes: Containerize server & client; deploy on k8s with Helm charts.

CI/CD: Implement GitHub Actions for build, test, lint, and publish.

Observability: Export metrics to Prometheus, trace with Jaeger/Zipkin.

Polyglot Clients: Generate gRPC clients in Go, Python, Java, and more.

Contributing
Fork this repo.

Create a feature branch: git checkout -b feature/awesome-feature.

Commit changes: git commit -m "Add awesome feature".

Push branch: git push origin feature/awesome-feature.

Open a Pull Request.

Please follow the Contributor Covenant Code of Conduct.

License
Distributed under the MIT License. See LICENSE for details.





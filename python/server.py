import socket

HOST = 'localhost'
PORT = 3003

def tcp_server():
    # Create a TCP socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to the specified address and port
    server_socket.bind((HOST, PORT))

    # Listen for incoming connections (1 connection at a time)
    server_socket.listen(1)
    print(f"TCP server listening on {HOST}:{PORT}")

    while True:
        # Wait for a client to connect
        client_socket, client_address = server_socket.accept()

        print(f"Connection established with {client_address}")

        try:
            while True:
                # Receive data from the client
                data = client_socket.recv(1024)
                if not data:
                    break  # No more data from client

                # Print the received data
                print(f"Addr: {client_address} Data: {data.decode()}")
                client_socket.send(data)

        except Exception as e:
            print(f"Error occurred: {e}")

        finally:
            # Close the client socket
            client_socket.close()
            print(f"Connection with {client_address} closed")

    # Close the server socket
    server_socket.close()

if __name__ == "__main__":
    tcp_server()


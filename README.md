# Secure Chat App

This Chat App works in "real-time" using Sockets.  
Only the person who was tagged in a message can see its content and others can't.  

A person can simply be tagged using an **@** in front of their username, i.e. **@user**.
Multiple people can be tagged in a single message.

## Deployment

Both the server and client are deployed using Vercel using "now".

The client is deployed at https://chat-app-eosin.now.sh/

## Locally

To test the application locally, simply clone the repository 
```
git clone https://github.com/ShauryaAg/Secure-Chat-App.git
```

run ```npm install``` in each of the subfolders to install the dependencies

and run ```npm run dev``` in ```./server``` directory to run the server on PORT 8000  
and ```npm start``` in ```./client``` directory to run the client on PORT 3000

**Note:** You also need to create a ```.env``` file in ```./server``` directory which contains the mongoDB URL (mongoURL) and a SECRET for jw-token.
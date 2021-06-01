# A Secure Online Chat App - (SOCA)
## [Live Site](https://mh-saeed-chat.netlify.app/)  |  [Server-side source code ](https://github.com/mh-saeed/server_BackEndOfChatApp/)

![UI](https://github.com/mh-saeed/client_frontEndOfChatApp/blob/master/src/icons/UI_img.jpg?raw=true)

## `How to install SOCA locally in your pc`
### `Prerequisite`
Node.js must be installed in your PC, to install nodejs [visit](https://nodejs.org/en/).

After installing nodejs, follow the below instructions⬇️.

Create an empty folder, name chat-app.
clone both, [client-Side](https://github.com/mh-saeed/client_frontEndOfChatApp) and [Server-side](https://github.com/mh-saeed/server_BackEndOfChatApp/) in the chat-app folder.
now open client-side repository folder with terminal, and run the below command:

    npm install

and then, open server-side repository folder with terminal, and run the below command:

     npm install

Now, open the chat-app folder in your code editor and in client folder open chat component(Path: src/components/Chat/Chat.js).
and comment out line: 14 and uncomment line: 15

![code]()

then, open the server folder and open index.js and then at line:15 change the or origins to 'http://localhost:3000/'

![code2]()



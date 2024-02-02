import UDPClient from 'react-native-udp';

function randomPort() {
    return Math.floor(Math.random() * 60536) + 5000; // 5000-65535
}

const udpLogger = {
    client: null,
    isInitialized: false,


    initialize: function () {
         return new Promise((resolve, reject) => {
           this.client = UDPClient.createSocket('udp4');
           this.client.bind(randomPort(), () => {
             this.isInitialized = true;
             console.log('UDP client is initialized');
             this.messageCount = 0;
             resolve();
           });
         });
    },

    sendLogMessage: async function (sessionId, ...messages) {
        if (!this.isInitialized) {
          await this.initialize();
        }

        if (this.client) {

          const logStrings = messages.map((message) => {
            if (typeof message === 'object') {
              return JSON.stringify(message);
            }
            return message;
          });

          const logString = `[Session ID: ${sessionId}] ` + logStrings.join(' ');
          const buffer = new Uint8Array(logString.length);
          for (let i = 0; i < logString.length; i++) {
            buffer[i] = logString.charCodeAt(i);
          }
          this.client.send(buffer, 0, buffer.length, 12201, 'dl.solution-ami.com', (err) => {
            if (err) {
              console.log('Error sending log message:', err);
            } else {
              console.log('Log message sent successfully');
            }
          });
        } else {
          console.log('UDP client is not initialized');
        }
    },

};

export default udpLogger;


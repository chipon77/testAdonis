'use strict'

const Message = use('App/Models/Message');

class ChatController {
    constructor({socket, request}) {
        this.socket = socket
        this.request = request
    }

    onMessage(message) {
        Message.create({id_channel: this.socket.topic, id_client: message.id, content: message.body});

        this.socket.broadcastToAll('message', message)
    }
}

module.exports = ChatController

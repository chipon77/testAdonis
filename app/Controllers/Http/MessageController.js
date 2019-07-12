'use strict'

const Message = use('App/Models/Message');

class MessageController {
    /**
     * Get message already send.
     */
    getMessage() {
        let messages = Message.all();
        return messages;
    }
}

module.exports = MessageController

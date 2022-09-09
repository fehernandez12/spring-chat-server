package edu.utadeo.chatserver.application.services;

import edu.utadeo.chatserver.application.ports.in.SendMessageUseCase;
import edu.utadeo.chatserver.domain.aggregate.MessagesAggregate;
import edu.utadeo.chatserver.domain.entities.ChatMessage;
import edu.utadeo.chatserver.domain.entities.OutputMessage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessagesService implements SendMessageUseCase {

    private final MessagesAggregate messagesAggregate;

    @Override
    public OutputMessage sendMessage(ChatMessage message) {
        return messagesAggregate.sendMessage(message);
    }
}

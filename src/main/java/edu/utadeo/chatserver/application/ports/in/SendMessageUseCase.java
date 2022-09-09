package edu.utadeo.chatserver.application.ports.in;

import edu.utadeo.chatserver.domain.entities.ChatMessage;
import edu.utadeo.chatserver.domain.entities.OutputMessage;

public interface SendMessageUseCase {
    OutputMessage sendMessage(ChatMessage message);
}

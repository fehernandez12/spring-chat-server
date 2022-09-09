package edu.utadeo.chatserver.infrastructure.controllers;

import edu.utadeo.chatserver.application.ports.in.SendMessageUseCase;
import edu.utadeo.chatserver.domain.entities.ChatMessage;
import edu.utadeo.chatserver.domain.entities.OutputMessage;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class ChatController implements CommonController {

    private final SendMessageUseCase sendMessageUseCase;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public OutputMessage send(ChatMessage message) throws Exception {
        return sendMessageUseCase.sendMessage(message);
    }

}

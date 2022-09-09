package edu.utadeo.chatserver.domain.aggregate;

import edu.utadeo.chatserver.domain.entities.ChatMessage;
import edu.utadeo.chatserver.domain.entities.OutputMessage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@AllArgsConstructor
public class MessagesAggregate {

    public OutputMessage sendMessage(ChatMessage message) {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        OutputMessage response = new OutputMessage(message.getFrom(), message.getText(), time, message.getImage());
        return response;
    }
}

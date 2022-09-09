package edu.utadeo.chatserver.infrastructure.controllers;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

public interface CommonController {
    @InitBinder
    default void initBinder(WebDataBinder binder) { binder.setDisallowedFields("");}
}

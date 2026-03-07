package com.prueba.backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@RestController
@RequestMapping("/external")
public class ExternalController {
    
    @GetMapping("/joke")
    public Map<String, String> getJoke() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.chucknorris.io/jokes/random";
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        return Map.of("value", (String) response.get("value")); // Retorna solo el valor [cite: 21, 23]
    }
}
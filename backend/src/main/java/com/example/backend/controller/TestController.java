package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "API is working!");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/hello/{name}")
    public ResponseEntity<Map<String, String>> hello(@PathVariable String name) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello, " + name + "!");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/data")
    public ResponseEntity<Map<String, Object>> receiveData(@RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Data received successfully");
        response.put("receivedData", data);
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}


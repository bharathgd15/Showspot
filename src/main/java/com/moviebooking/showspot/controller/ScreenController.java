package com.moviebooking.showspot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.moviebooking.showspot.entity.Screen;
import com.moviebooking.showspot.service.ScreenService;

@RestController
@RequestMapping("/screen")
public class ScreenController {

    @Autowired
    private ScreenService screenService;

    // Save Screen
    @PostMapping("/save")
    public Screen saveScreen(@RequestBody Screen screen) {
        return screenService.saveScreen(screen);
    }

    // Get All Screens
    @GetMapping("/getAll")
    public List<Screen> getAllScreens() {
        return screenService.getAllScreens();
    }

    // Get Screen By ID
    @GetMapping("/get/{id}")
    public Screen getScreenById(@PathVariable int id) {
        return screenService.getScreenById(id);
    }

    // Update Screen
    @PutMapping("/update")
    public Screen updateScreen(@RequestBody Screen screen) {
        return screenService.updateScreen(screen);
    }

    // Delete Screen
    @DeleteMapping("/delete/{id}")
    public String deleteScreen(@PathVariable int id) {
        return screenService.deleteScreen(id);
    }
}
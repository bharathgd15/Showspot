package com.moviebooking.showspot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviebooking.showspot.entity.Screen;
import com.moviebooking.showspot.repository.ScreenRepository;

@Service
public class ScreenService {

    @Autowired
    private ScreenRepository screenRepository;

    // Save Screen
    public Screen saveScreen(Screen screen) {
        return screenRepository.save(screen);
    }

    // Get All Screens
    public List<Screen> getAllScreens() {
        return screenRepository.findAll();
    }

    // Get Screen By ID
    public Screen getScreenById(int id) {

        return screenRepository
                .findById(id)
                .orElse(null);
    }

    // Update Screen
    public Screen updateScreen(Screen screen) {

        return screenRepository.save(screen);
    }

    // Delete Screen
    public String deleteScreen(int id) {

        if (!screenRepository.existsById(id)) {
            return "Screen Not Found";
        }

        screenRepository.deleteById(id);

        return "Screen Deleted Successfully";
    }
}
package com.moviebooking.showspot.entity;

import jakarta.persistence.*;

@Entity
public class Screen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String screenName;

    private int capacity;

    @ManyToOne
    @JoinColumn(name = "theatre_id")
    private Theatre theatre;

    public Screen() {
    }

    public Screen(int id, String screenName, int capacity, Theatre theatre) {
        this.id = id;
        this.screenName = screenName;
        this.capacity = capacity;
        this.theatre = theatre;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Theatre getTheatre() {
        return theatre;
    }

    public void setTheatre(Theatre theatre) {
        this.theatre = theatre;
    }
}
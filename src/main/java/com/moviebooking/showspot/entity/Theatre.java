package com.moviebooking.showspot.entity;

import jakarta.persistence.*;

@Entity
public class Theatre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String theatreName;
    private String city;
    private String address;
    private int totalScreens;

    public Theatre() {
    }

    public Theatre(int id, String theatreName, String city, String address, int totalScreens) {
        this.id = id;
        this.theatreName = theatreName;
        this.city = city;
        this.address = address;
        this.totalScreens = totalScreens;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTheatreName() {
        return theatreName;
    }

    public void setTheatreName(String theatreName) {
        this.theatreName = theatreName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTotalScreens() {
        return totalScreens;
    }

    public void setTotalScreens(int totalScreens) {
        this.totalScreens = totalScreens;
    }
}

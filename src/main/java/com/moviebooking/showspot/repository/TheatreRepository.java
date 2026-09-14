package com.moviebooking.showspot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviebooking.showspot.entity.Theatre;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre, Integer> {

}

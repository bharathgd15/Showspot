package com.moviebooking.showspot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviebooking.showspot.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

}
package com.api.happy.repositories;

import com.api.happy.models.PhotoModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PhotoRepository extends JpaRepository<PhotoModel, UUID> {
}

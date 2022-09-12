package com.api.happy.repositories;

import com.api.happy.models.OrphanageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrphanageRepository extends JpaRepository<OrphanageModel, UUID> {

    boolean existsByName(String name);
}

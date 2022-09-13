package com.api.happy.controllers;

import com.api.happy.models.OrphanageModel;
import com.api.happy.repositories.OrphanageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/orphanages")
public class OrphanageController {

    @Autowired
    private OrphanageRepository orphanageRepository;

    @GetMapping
    public ResponseEntity<Page<OrphanageModel>> getAllOrphanages(
            @PageableDefault(page = 0, size = 250, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(orphanageRepository.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<Object> saveOrphanage(@RequestBody OrphanageModel orphanageModel) {

        if (orphanageRepository.existsByName(orphanageModel.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Orphanage name is already in use.");
        }

        if (orphanageModel.getPhotos() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Photo is required.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(orphanageRepository.save(orphanageModel));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneOrphanage(@PathVariable(value = "id") UUID id) {

        Optional<OrphanageModel> orphanageModelOptional = orphanageRepository.findById(id);

        if (!orphanageModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Orphanage not found.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(orphanageModelOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateOrphanage(@PathVariable(value = "id") UUID id, @RequestBody @Valid OrphanageModel orphanageModel) {

        Optional<OrphanageModel> orphanageModelOptional = orphanageRepository.findById(id);

        if (!orphanageModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Orphanage not found.");
        }

        if (orphanageRepository.existsByName(orphanageModel.getName()) && !orphanageModelOptional.get().getName().equals(orphanageModel.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Orphanage name is already in use.");
        }

        orphanageModel.setId(orphanageModelOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(orphanageRepository.save(orphanageModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOrphanage(@PathVariable(value = "id") UUID id){

        Optional<OrphanageModel> orphanageModelOptional = orphanageRepository.findById(id);

        if (!orphanageModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Orphanage not found.");
        }

        orphanageRepository.delete(orphanageModelOptional.get());

        return ResponseEntity.status(HttpStatus.OK).body("Orphanage deleted successfully.");
    }
}

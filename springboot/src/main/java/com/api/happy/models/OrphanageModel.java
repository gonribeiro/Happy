package com.api.happy.models;

import javax.persistence.*;

import java.io.Serializable;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "TB_ORPHANAGES")
public class OrphanageModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(nullable = false, unique = true)
    private String name;
    @Column(nullable = false)
    private String latitude;
    @Column(nullable = false)
    private String longitude;
    @Column(nullable = false)
    private String about;
    @Column(nullable = false)
    private String instructions;
    @Column(nullable = false)
    private String opening_hours;
    @Column(nullable = false)
    private boolean open_on_weekends;

    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
    @JoinColumn(name = "orphanage_id", referencedColumnName = "id")
    private List<PhotoModel> photoModel;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getOpeningHours() {
        return opening_hours;
    }

    public void setOpeningHours(String opening_hours) {
        this.opening_hours = opening_hours;
    }

    public boolean getOpenOnWeekends() {
        return open_on_weekends;
    }

    public void setOpenOnWeekends(boolean open_on_weekends) {
        this.open_on_weekends = open_on_weekends;
    }

    public List<PhotoModel> getPhotos() {
        return photoModel;
    }

    public void setPhotos(List<PhotoModel> photoModel) {
        this.photoModel = photoModel;
    }
}

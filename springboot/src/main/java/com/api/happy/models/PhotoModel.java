package com.api.happy.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "TB_PHOTOS")
public class PhotoModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    // @Column(nullable = false)
    // private String name;
    @Column(nullable = false)
    private String path;
    // @Column(nullable = false)
    // private String type;
    // @Column(nullable = false)
    // private String size;

    @ManyToOne
    @JoinColumn(name = "orphanage_id")
    private OrphanageModel orphanageModel;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}

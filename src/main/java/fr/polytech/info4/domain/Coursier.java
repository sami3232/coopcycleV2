package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Coursier.
 */
@Entity
@Table(name = "coursier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Coursier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "coordonne", nullable = false)
    private String coordonne;

    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "note_coursier")
    private Integer noteCoursier;

    @OneToOne(mappedBy = "coursier")
    @JsonIgnore
    private Utilisateur utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCoordonne() {
        return coordonne;
    }

    public Coursier coordonne(String coordonne) {
        this.coordonne = coordonne;
        return this;
    }

    public void setCoordonne(String coordonne) {
        this.coordonne = coordonne;
    }

    public Integer getNoteCoursier() {
        return noteCoursier;
    }

    public Coursier noteCoursier(Integer noteCoursier) {
        this.noteCoursier = noteCoursier;
        return this;
    }

    public void setNoteCoursier(Integer noteCoursier) {
        this.noteCoursier = noteCoursier;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Coursier utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Coursier)) {
            return false;
        }
        return id != null && id.equals(((Coursier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Coursier{" +
            "id=" + getId() +
            ", coordonne='" + getCoordonne() + "'" +
            ", noteCoursier=" + getNoteCoursier() +
            "}";
    }
}

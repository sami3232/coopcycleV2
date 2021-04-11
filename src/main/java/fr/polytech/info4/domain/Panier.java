package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Panier.
 */
@Entity
@Table(name = "panier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Panier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Pattern(regexp = "^[A-Z][a-z]+\\d$")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Min(value = 0)
    @Column(name = "prix", nullable = false)
    private Integer prix;

    @OneToMany(mappedBy = "panier")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Commerce> commerce = new HashSet<>();

    @OneToMany(mappedBy = "panier")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Course> courses = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "panier_produit",
               joinColumns = @JoinColumn(name = "panier_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "produit_id", referencedColumnName = "id"))
    private Set<Produit> produits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "paniers", allowSetters = true)
    private Utilisateur utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Panier name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrix() {
        return prix;
    }

    public Panier prix(Integer prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public Set<Commerce> getCommerce() {
        return commerce;
    }

    public Panier commerce(Set<Commerce> commerce) {
        this.commerce = commerce;
        return this;
    }

    public Panier addCommerce(Commerce commerce) {
        this.commerce.add(commerce);
        commerce.setPanier(this);
        return this;
    }

    public Panier removeCommerce(Commerce commerce) {
        this.commerce.remove(commerce);
        commerce.setPanier(null);
        return this;
    }

    public void setCommerce(Set<Commerce> commerce) {
        this.commerce = commerce;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Panier courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Panier addCourse(Course course) {
        this.courses.add(course);
        course.setPanier(this);
        return this;
    }

    public Panier removeCourse(Course course) {
        this.courses.remove(course);
        course.setPanier(null);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Set<Produit> getProduits() {
        return produits;
    }

    public Panier produits(Set<Produit> produits) {
        this.produits = produits;
        return this;
    }

    public Panier addProduit(Produit produit) {
        this.produits.add(produit);
        produit.getPaniers().add(this);
        return this;
    }

    public Panier removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.getPaniers().remove(this);
        return this;
    }

    public void setProduits(Set<Produit> produits) {
        this.produits = produits;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Panier utilisateur(Utilisateur utilisateur) {
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
        if (!(o instanceof Panier)) {
            return false;
        }
        return id != null && id.equals(((Panier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Panier{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", prix=" + getPrix() +
            "}";
    }
}

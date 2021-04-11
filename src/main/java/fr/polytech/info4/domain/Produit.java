package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Produit implements Serializable {

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

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "produit_commerce",
               joinColumns = @JoinColumn(name = "produit_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "commerce_id", referencedColumnName = "id"))
    private Set<Commerce> commerce = new HashSet<>();

    @ManyToMany(mappedBy = "produits")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Panier> paniers = new HashSet<>();

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

    public Produit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrix() {
        return prix;
    }

    public Produit prix(Integer prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return description;
    }

    public Produit description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Commerce> getCommerce() {
        return commerce;
    }

    public Produit commerce(Set<Commerce> commerce) {
        this.commerce = commerce;
        return this;
    }

    public Produit addCommerce(Commerce commerce) {
        this.commerce.add(commerce);
        commerce.getProduits().add(this);
        return this;
    }

    public Produit removeCommerce(Commerce commerce) {
        this.commerce.remove(commerce);
        commerce.getProduits().remove(this);
        return this;
    }

    public void setCommerce(Set<Commerce> commerce) {
        this.commerce = commerce;
    }

    public Set<Panier> getPaniers() {
        return paniers;
    }

    public Produit paniers(Set<Panier> paniers) {
        this.paniers = paniers;
        return this;
    }

    public Produit addPanier(Panier panier) {
        this.paniers.add(panier);
        panier.getProduits().add(this);
        return this;
    }

    public Produit removePanier(Panier panier) {
        this.paniers.remove(panier);
        panier.getProduits().remove(this);
        return this;
    }

    public void setPaniers(Set<Panier> paniers) {
        this.paniers = paniers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", prix=" + getPrix() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}

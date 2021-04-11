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
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Utilisateur implements Serializable {

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
    @Pattern(regexp = "^[A-Z][a-z]+\\d$")
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotNull
    @Column(name = "mail", nullable = false)
    private String mail;

    @NotNull
    @Column(name = "tel", nullable = false)
    private String tel;

    @OneToOne
    @JoinColumn(unique = true)
    private Client client;

    @OneToOne
    @JoinColumn(unique = true)
    private Commercant commercant;

    @OneToOne
    @JoinColumn(unique = true)
    private Coursier coursier;

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Panier> paniers = new HashSet<>();

    @OneToOne(mappedBy = "utilisateur")
    @JsonIgnore
    private Commerce commerce;

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

    public Utilisateur name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstname() {
        return firstname;
    }

    public Utilisateur firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMail() {
        return mail;
    }

    public Utilisateur mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getTel() {
        return tel;
    }

    public Utilisateur tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Client getClient() {
        return client;
    }

    public Utilisateur client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Commercant getCommercant() {
        return commercant;
    }

    public Utilisateur commercant(Commercant commercant) {
        this.commercant = commercant;
        return this;
    }

    public void setCommercant(Commercant commercant) {
        this.commercant = commercant;
    }

    public Coursier getCoursier() {
        return coursier;
    }

    public Utilisateur coursier(Coursier coursier) {
        this.coursier = coursier;
        return this;
    }

    public void setCoursier(Coursier coursier) {
        this.coursier = coursier;
    }

    public Set<Panier> getPaniers() {
        return paniers;
    }

    public Utilisateur paniers(Set<Panier> paniers) {
        this.paniers = paniers;
        return this;
    }

    public Utilisateur addPanier(Panier panier) {
        this.paniers.add(panier);
        panier.setUtilisateur(this);
        return this;
    }

    public Utilisateur removePanier(Panier panier) {
        this.paniers.remove(panier);
        panier.setUtilisateur(null);
        return this;
    }

    public void setPaniers(Set<Panier> paniers) {
        this.paniers = paniers;
    }

    public Commerce getCommerce() {
        return commerce;
    }

    public Utilisateur commerce(Commerce commerce) {
        this.commerce = commerce;
        return this;
    }

    public void setCommerce(Commerce commerce) {
        this.commerce = commerce;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Utilisateur)) {
            return false;
        }
        return id != null && id.equals(((Utilisateur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", mail='" + getMail() + "'" +
            ", tel='" + getTel() + "'" +
            "}";
    }
}

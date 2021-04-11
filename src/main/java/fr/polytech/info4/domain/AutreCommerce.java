package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A AutreCommerce.
 */
@Entity
@Table(name = "autre_commerce")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AutreCommerce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "type_commerce", nullable = false)
    private String typeCommerce;

    @OneToOne(mappedBy = "autreCommerce")
    @JsonIgnore
    private Commerce commerce;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeCommerce() {
        return typeCommerce;
    }

    public AutreCommerce typeCommerce(String typeCommerce) {
        this.typeCommerce = typeCommerce;
        return this;
    }

    public void setTypeCommerce(String typeCommerce) {
        this.typeCommerce = typeCommerce;
    }

    public Commerce getCommerce() {
        return commerce;
    }

    public AutreCommerce commerce(Commerce commerce) {
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
        if (!(o instanceof AutreCommerce)) {
            return false;
        }
        return id != null && id.equals(((AutreCommerce) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AutreCommerce{" +
            "id=" + getId() +
            ", typeCommerce='" + getTypeCommerce() + "'" +
            "}";
    }
}

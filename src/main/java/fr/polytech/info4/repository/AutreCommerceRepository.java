package fr.polytech.info4.repository;

import fr.polytech.info4.domain.AutreCommerce;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AutreCommerce entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutreCommerceRepository extends JpaRepository<AutreCommerce, Long> {
}

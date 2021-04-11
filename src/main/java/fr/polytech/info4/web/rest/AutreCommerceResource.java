package fr.polytech.info4.web.rest;

import fr.polytech.info4.domain.AutreCommerce;
import fr.polytech.info4.repository.AutreCommerceRepository;
import fr.polytech.info4.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link fr.polytech.info4.domain.AutreCommerce}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AutreCommerceResource {

    private final Logger log = LoggerFactory.getLogger(AutreCommerceResource.class);

    private static final String ENTITY_NAME = "autreCommerce";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutreCommerceRepository autreCommerceRepository;

    public AutreCommerceResource(AutreCommerceRepository autreCommerceRepository) {
        this.autreCommerceRepository = autreCommerceRepository;
    }

    /**
     * {@code POST  /autre-commerces} : Create a new autreCommerce.
     *
     * @param autreCommerce the autreCommerce to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new autreCommerce, or with status {@code 400 (Bad Request)} if the autreCommerce has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/autre-commerces")
    public ResponseEntity<AutreCommerce> createAutreCommerce(@Valid @RequestBody AutreCommerce autreCommerce) throws URISyntaxException {
        log.debug("REST request to save AutreCommerce : {}", autreCommerce);
        if (autreCommerce.getId() != null) {
            throw new BadRequestAlertException("A new autreCommerce cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AutreCommerce result = autreCommerceRepository.save(autreCommerce);
        return ResponseEntity.created(new URI("/api/autre-commerces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /autre-commerces} : Updates an existing autreCommerce.
     *
     * @param autreCommerce the autreCommerce to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated autreCommerce,
     * or with status {@code 400 (Bad Request)} if the autreCommerce is not valid,
     * or with status {@code 500 (Internal Server Error)} if the autreCommerce couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/autre-commerces")
    public ResponseEntity<AutreCommerce> updateAutreCommerce(@Valid @RequestBody AutreCommerce autreCommerce) throws URISyntaxException {
        log.debug("REST request to update AutreCommerce : {}", autreCommerce);
        if (autreCommerce.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AutreCommerce result = autreCommerceRepository.save(autreCommerce);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, autreCommerce.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /autre-commerces} : get all the autreCommerces.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of autreCommerces in body.
     */
    @GetMapping("/autre-commerces")
    public List<AutreCommerce> getAllAutreCommerces(@RequestParam(required = false) String filter) {
        if ("commerce-is-null".equals(filter)) {
            log.debug("REST request to get all AutreCommerces where commerce is null");
            return StreamSupport
                .stream(autreCommerceRepository.findAll().spliterator(), false)
                .filter(autreCommerce -> autreCommerce.getCommerce() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all AutreCommerces");
        return autreCommerceRepository.findAll();
    }

    /**
     * {@code GET  /autre-commerces/:id} : get the "id" autreCommerce.
     *
     * @param id the id of the autreCommerce to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the autreCommerce, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/autre-commerces/{id}")
    public ResponseEntity<AutreCommerce> getAutreCommerce(@PathVariable Long id) {
        log.debug("REST request to get AutreCommerce : {}", id);
        Optional<AutreCommerce> autreCommerce = autreCommerceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(autreCommerce);
    }

    /**
     * {@code DELETE  /autre-commerces/:id} : delete the "id" autreCommerce.
     *
     * @param id the id of the autreCommerce to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/autre-commerces/{id}")
    public ResponseEntity<Void> deleteAutreCommerce(@PathVariable Long id) {
        log.debug("REST request to delete AutreCommerce : {}", id);
        autreCommerceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

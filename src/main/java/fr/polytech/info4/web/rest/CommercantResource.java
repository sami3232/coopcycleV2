package fr.polytech.info4.web.rest;

import fr.polytech.info4.domain.Commercant;
import fr.polytech.info4.repository.CommercantRepository;
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
 * REST controller for managing {@link fr.polytech.info4.domain.Commercant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CommercantResource {

    private final Logger log = LoggerFactory.getLogger(CommercantResource.class);

    private static final String ENTITY_NAME = "commercant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommercantRepository commercantRepository;

    public CommercantResource(CommercantRepository commercantRepository) {
        this.commercantRepository = commercantRepository;
    }

    /**
     * {@code POST  /commercants} : Create a new commercant.
     *
     * @param commercant the commercant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commercant, or with status {@code 400 (Bad Request)} if the commercant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commercants")
    public ResponseEntity<Commercant> createCommercant(@Valid @RequestBody Commercant commercant) throws URISyntaxException {
        log.debug("REST request to save Commercant : {}", commercant);
        if (commercant.getId() != null) {
            throw new BadRequestAlertException("A new commercant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Commercant result = commercantRepository.save(commercant);
        return ResponseEntity.created(new URI("/api/commercants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commercants} : Updates an existing commercant.
     *
     * @param commercant the commercant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commercant,
     * or with status {@code 400 (Bad Request)} if the commercant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commercant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commercants")
    public ResponseEntity<Commercant> updateCommercant(@Valid @RequestBody Commercant commercant) throws URISyntaxException {
        log.debug("REST request to update Commercant : {}", commercant);
        if (commercant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Commercant result = commercantRepository.save(commercant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commercant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /commercants} : get all the commercants.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commercants in body.
     */
    @GetMapping("/commercants")
    public List<Commercant> getAllCommercants(@RequestParam(required = false) String filter) {
        if ("utilisateur-is-null".equals(filter)) {
            log.debug("REST request to get all Commercants where utilisateur is null");
            return StreamSupport
                .stream(commercantRepository.findAll().spliterator(), false)
                .filter(commercant -> commercant.getUtilisateur() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Commercants");
        return commercantRepository.findAll();
    }

    /**
     * {@code GET  /commercants/:id} : get the "id" commercant.
     *
     * @param id the id of the commercant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commercant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commercants/{id}")
    public ResponseEntity<Commercant> getCommercant(@PathVariable Long id) {
        log.debug("REST request to get Commercant : {}", id);
        Optional<Commercant> commercant = commercantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(commercant);
    }

    /**
     * {@code DELETE  /commercants/:id} : delete the "id" commercant.
     *
     * @param id the id of the commercant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commercants/{id}")
    public ResponseEntity<Void> deleteCommercant(@PathVariable Long id) {
        log.debug("REST request to delete Commercant : {}", id);
        commercantRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

package fr.polytech.info4.web.rest;

import fr.polytech.info4.domain.Coursier;
import fr.polytech.info4.repository.CoursierRepository;
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
 * REST controller for managing {@link fr.polytech.info4.domain.Coursier}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CoursierResource {

    private final Logger log = LoggerFactory.getLogger(CoursierResource.class);

    private static final String ENTITY_NAME = "coursier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoursierRepository coursierRepository;

    public CoursierResource(CoursierRepository coursierRepository) {
        this.coursierRepository = coursierRepository;
    }

    /**
     * {@code POST  /coursiers} : Create a new coursier.
     *
     * @param coursier the coursier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new coursier, or with status {@code 400 (Bad Request)} if the coursier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/coursiers")
    public ResponseEntity<Coursier> createCoursier(@Valid @RequestBody Coursier coursier) throws URISyntaxException {
        log.debug("REST request to save Coursier : {}", coursier);
        if (coursier.getId() != null) {
            throw new BadRequestAlertException("A new coursier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Coursier result = coursierRepository.save(coursier);
        return ResponseEntity.created(new URI("/api/coursiers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /coursiers} : Updates an existing coursier.
     *
     * @param coursier the coursier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coursier,
     * or with status {@code 400 (Bad Request)} if the coursier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the coursier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/coursiers")
    public ResponseEntity<Coursier> updateCoursier(@Valid @RequestBody Coursier coursier) throws URISyntaxException {
        log.debug("REST request to update Coursier : {}", coursier);
        if (coursier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Coursier result = coursierRepository.save(coursier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coursier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /coursiers} : get all the coursiers.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of coursiers in body.
     */
    @GetMapping("/coursiers")
    public List<Coursier> getAllCoursiers(@RequestParam(required = false) String filter) {
        if ("utilisateur-is-null".equals(filter)) {
            log.debug("REST request to get all Coursiers where utilisateur is null");
            return StreamSupport
                .stream(coursierRepository.findAll().spliterator(), false)
                .filter(coursier -> coursier.getUtilisateur() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Coursiers");
        return coursierRepository.findAll();
    }

    /**
     * {@code GET  /coursiers/:id} : get the "id" coursier.
     *
     * @param id the id of the coursier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the coursier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/coursiers/{id}")
    public ResponseEntity<Coursier> getCoursier(@PathVariable Long id) {
        log.debug("REST request to get Coursier : {}", id);
        Optional<Coursier> coursier = coursierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(coursier);
    }

    /**
     * {@code DELETE  /coursiers/:id} : delete the "id" coursier.
     *
     * @param id the id of the coursier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/coursiers/{id}")
    public ResponseEntity<Void> deleteCoursier(@PathVariable Long id) {
        log.debug("REST request to delete Coursier : {}", id);
        coursierRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

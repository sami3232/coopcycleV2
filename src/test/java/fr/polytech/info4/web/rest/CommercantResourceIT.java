package fr.polytech.info4.web.rest;

import fr.polytech.info4.CoopcycleApp;
import fr.polytech.info4.domain.Commercant;
import fr.polytech.info4.repository.CommercantRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CommercantResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CommercantResourceIT {

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    @Autowired
    private CommercantRepository commercantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommercantMockMvc;

    private Commercant commercant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commercant createEntity(EntityManager em) {
        Commercant commercant = new Commercant()
            .adresse(DEFAULT_ADRESSE);
        return commercant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commercant createUpdatedEntity(EntityManager em) {
        Commercant commercant = new Commercant()
            .adresse(UPDATED_ADRESSE);
        return commercant;
    }

    @BeforeEach
    public void initTest() {
        commercant = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommercant() throws Exception {
        int databaseSizeBeforeCreate = commercantRepository.findAll().size();
        // Create the Commercant
        restCommercantMockMvc.perform(post("/api/commercants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commercant)))
            .andExpect(status().isCreated());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeCreate + 1);
        Commercant testCommercant = commercantList.get(commercantList.size() - 1);
        assertThat(testCommercant.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    public void createCommercantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commercantRepository.findAll().size();

        // Create the Commercant with an existing ID
        commercant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommercantMockMvc.perform(post("/api/commercants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commercant)))
            .andExpect(status().isBadRequest());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = commercantRepository.findAll().size();
        // set the field null
        commercant.setAdresse(null);

        // Create the Commercant, which fails.


        restCommercantMockMvc.perform(post("/api/commercants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commercant)))
            .andExpect(status().isBadRequest());

        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommercants() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        // Get all the commercantList
        restCommercantMockMvc.perform(get("/api/commercants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commercant.getId().intValue())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)));
    }
    
    @Test
    @Transactional
    public void getCommercant() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        // Get the commercant
        restCommercantMockMvc.perform(get("/api/commercants/{id}", commercant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commercant.getId().intValue()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE));
    }
    @Test
    @Transactional
    public void getNonExistingCommercant() throws Exception {
        // Get the commercant
        restCommercantMockMvc.perform(get("/api/commercants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommercant() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();

        // Update the commercant
        Commercant updatedCommercant = commercantRepository.findById(commercant.getId()).get();
        // Disconnect from session so that the updates on updatedCommercant are not directly saved in db
        em.detach(updatedCommercant);
        updatedCommercant
            .adresse(UPDATED_ADRESSE);

        restCommercantMockMvc.perform(put("/api/commercants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommercant)))
            .andExpect(status().isOk());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
        Commercant testCommercant = commercantList.get(commercantList.size() - 1);
        assertThat(testCommercant.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    public void updateNonExistingCommercant() throws Exception {
        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommercantMockMvc.perform(put("/api/commercants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commercant)))
            .andExpect(status().isBadRequest());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommercant() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        int databaseSizeBeforeDelete = commercantRepository.findAll().size();

        // Delete the commercant
        restCommercantMockMvc.perform(delete("/api/commercants/{id}", commercant.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

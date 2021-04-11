package fr.polytech.info4.web.rest;

import fr.polytech.info4.CoopcycleApp;
import fr.polytech.info4.domain.Commerce;
import fr.polytech.info4.repository.CommerceRepository;

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
 * Integration tests for the {@link CommerceResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CommerceResourceIT {

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_NOTE_COMMERCE = 0;
    private static final Integer UPDATED_NOTE_COMMERCE = 1;

    @Autowired
    private CommerceRepository commerceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommerceMockMvc;

    private Commerce commerce;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commerce createEntity(EntityManager em) {
        Commerce commerce = new Commerce()
            .adresse(DEFAULT_ADRESSE)
            .name(DEFAULT_NAME)
            .noteCommerce(DEFAULT_NOTE_COMMERCE);
        return commerce;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commerce createUpdatedEntity(EntityManager em) {
        Commerce commerce = new Commerce()
            .adresse(UPDATED_ADRESSE)
            .name(UPDATED_NAME)
            .noteCommerce(UPDATED_NOTE_COMMERCE);
        return commerce;
    }

    @BeforeEach
    public void initTest() {
        commerce = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommerce() throws Exception {
        int databaseSizeBeforeCreate = commerceRepository.findAll().size();
        // Create the Commerce
        restCommerceMockMvc.perform(post("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commerce)))
            .andExpect(status().isCreated());

        // Validate the Commerce in the database
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeCreate + 1);
        Commerce testCommerce = commerceList.get(commerceList.size() - 1);
        assertThat(testCommerce.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testCommerce.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCommerce.getNoteCommerce()).isEqualTo(DEFAULT_NOTE_COMMERCE);
    }

    @Test
    @Transactional
    public void createCommerceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commerceRepository.findAll().size();

        // Create the Commerce with an existing ID
        commerce.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommerceMockMvc.perform(post("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commerce)))
            .andExpect(status().isBadRequest());

        // Validate the Commerce in the database
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = commerceRepository.findAll().size();
        // set the field null
        commerce.setAdresse(null);

        // Create the Commerce, which fails.


        restCommerceMockMvc.perform(post("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commerce)))
            .andExpect(status().isBadRequest());

        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = commerceRepository.findAll().size();
        // set the field null
        commerce.setName(null);

        // Create the Commerce, which fails.


        restCommerceMockMvc.perform(post("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commerce)))
            .andExpect(status().isBadRequest());

        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommerce() throws Exception {
        // Initialize the database
        commerceRepository.saveAndFlush(commerce);

        // Get all the commerceList
        restCommerceMockMvc.perform(get("/api/commerce?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commerce.getId().intValue())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].noteCommerce").value(hasItem(DEFAULT_NOTE_COMMERCE)));
    }
    
    @Test
    @Transactional
    public void getCommerce() throws Exception {
        // Initialize the database
        commerceRepository.saveAndFlush(commerce);

        // Get the commerce
        restCommerceMockMvc.perform(get("/api/commerce/{id}", commerce.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commerce.getId().intValue()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.noteCommerce").value(DEFAULT_NOTE_COMMERCE));
    }
    @Test
    @Transactional
    public void getNonExistingCommerce() throws Exception {
        // Get the commerce
        restCommerceMockMvc.perform(get("/api/commerce/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommerce() throws Exception {
        // Initialize the database
        commerceRepository.saveAndFlush(commerce);

        int databaseSizeBeforeUpdate = commerceRepository.findAll().size();

        // Update the commerce
        Commerce updatedCommerce = commerceRepository.findById(commerce.getId()).get();
        // Disconnect from session so that the updates on updatedCommerce are not directly saved in db
        em.detach(updatedCommerce);
        updatedCommerce
            .adresse(UPDATED_ADRESSE)
            .name(UPDATED_NAME)
            .noteCommerce(UPDATED_NOTE_COMMERCE);

        restCommerceMockMvc.perform(put("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommerce)))
            .andExpect(status().isOk());

        // Validate the Commerce in the database
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeUpdate);
        Commerce testCommerce = commerceList.get(commerceList.size() - 1);
        assertThat(testCommerce.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testCommerce.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCommerce.getNoteCommerce()).isEqualTo(UPDATED_NOTE_COMMERCE);
    }

    @Test
    @Transactional
    public void updateNonExistingCommerce() throws Exception {
        int databaseSizeBeforeUpdate = commerceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommerceMockMvc.perform(put("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commerce)))
            .andExpect(status().isBadRequest());

        // Validate the Commerce in the database
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommerce() throws Exception {
        // Initialize the database
        commerceRepository.saveAndFlush(commerce);

        int databaseSizeBeforeDelete = commerceRepository.findAll().size();

        // Delete the commerce
        restCommerceMockMvc.perform(delete("/api/commerce/{id}", commerce.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

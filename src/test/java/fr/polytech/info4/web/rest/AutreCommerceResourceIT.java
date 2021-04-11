package fr.polytech.info4.web.rest;

import fr.polytech.info4.CoopcycleApp;
import fr.polytech.info4.domain.AutreCommerce;
import fr.polytech.info4.repository.AutreCommerceRepository;

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
 * Integration tests for the {@link AutreCommerceResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AutreCommerceResourceIT {

    private static final String DEFAULT_TYPE_COMMERCE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_COMMERCE = "BBBBBBBBBB";

    @Autowired
    private AutreCommerceRepository autreCommerceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAutreCommerceMockMvc;

    private AutreCommerce autreCommerce;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AutreCommerce createEntity(EntityManager em) {
        AutreCommerce autreCommerce = new AutreCommerce()
            .typeCommerce(DEFAULT_TYPE_COMMERCE);
        return autreCommerce;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AutreCommerce createUpdatedEntity(EntityManager em) {
        AutreCommerce autreCommerce = new AutreCommerce()
            .typeCommerce(UPDATED_TYPE_COMMERCE);
        return autreCommerce;
    }

    @BeforeEach
    public void initTest() {
        autreCommerce = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutreCommerce() throws Exception {
        int databaseSizeBeforeCreate = autreCommerceRepository.findAll().size();
        // Create the AutreCommerce
        restAutreCommerceMockMvc.perform(post("/api/autre-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autreCommerce)))
            .andExpect(status().isCreated());

        // Validate the AutreCommerce in the database
        List<AutreCommerce> autreCommerceList = autreCommerceRepository.findAll();
        assertThat(autreCommerceList).hasSize(databaseSizeBeforeCreate + 1);
        AutreCommerce testAutreCommerce = autreCommerceList.get(autreCommerceList.size() - 1);
        assertThat(testAutreCommerce.getTypeCommerce()).isEqualTo(DEFAULT_TYPE_COMMERCE);
    }

    @Test
    @Transactional
    public void createAutreCommerceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = autreCommerceRepository.findAll().size();

        // Create the AutreCommerce with an existing ID
        autreCommerce.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutreCommerceMockMvc.perform(post("/api/autre-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autreCommerce)))
            .andExpect(status().isBadRequest());

        // Validate the AutreCommerce in the database
        List<AutreCommerce> autreCommerceList = autreCommerceRepository.findAll();
        assertThat(autreCommerceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeCommerceIsRequired() throws Exception {
        int databaseSizeBeforeTest = autreCommerceRepository.findAll().size();
        // set the field null
        autreCommerce.setTypeCommerce(null);

        // Create the AutreCommerce, which fails.


        restAutreCommerceMockMvc.perform(post("/api/autre-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autreCommerce)))
            .andExpect(status().isBadRequest());

        List<AutreCommerce> autreCommerceList = autreCommerceRepository.findAll();
        assertThat(autreCommerceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAutreCommerces() throws Exception {
        // Initialize the database
        autreCommerceRepository.saveAndFlush(autreCommerce);

        // Get all the autreCommerceList
        restAutreCommerceMockMvc.perform(get("/api/autre-commerces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autreCommerce.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeCommerce").value(hasItem(DEFAULT_TYPE_COMMERCE)));
    }
    
    @Test
    @Transactional
    public void getAutreCommerce() throws Exception {
        // Initialize the database
        autreCommerceRepository.saveAndFlush(autreCommerce);

        // Get the autreCommerce
        restAutreCommerceMockMvc.perform(get("/api/autre-commerces/{id}", autreCommerce.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(autreCommerce.getId().intValue()))
            .andExpect(jsonPath("$.typeCommerce").value(DEFAULT_TYPE_COMMERCE));
    }
    @Test
    @Transactional
    public void getNonExistingAutreCommerce() throws Exception {
        // Get the autreCommerce
        restAutreCommerceMockMvc.perform(get("/api/autre-commerces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutreCommerce() throws Exception {
        // Initialize the database
        autreCommerceRepository.saveAndFlush(autreCommerce);

        int databaseSizeBeforeUpdate = autreCommerceRepository.findAll().size();

        // Update the autreCommerce
        AutreCommerce updatedAutreCommerce = autreCommerceRepository.findById(autreCommerce.getId()).get();
        // Disconnect from session so that the updates on updatedAutreCommerce are not directly saved in db
        em.detach(updatedAutreCommerce);
        updatedAutreCommerce
            .typeCommerce(UPDATED_TYPE_COMMERCE);

        restAutreCommerceMockMvc.perform(put("/api/autre-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutreCommerce)))
            .andExpect(status().isOk());

        // Validate the AutreCommerce in the database
        List<AutreCommerce> autreCommerceList = autreCommerceRepository.findAll();
        assertThat(autreCommerceList).hasSize(databaseSizeBeforeUpdate);
        AutreCommerce testAutreCommerce = autreCommerceList.get(autreCommerceList.size() - 1);
        assertThat(testAutreCommerce.getTypeCommerce()).isEqualTo(UPDATED_TYPE_COMMERCE);
    }

    @Test
    @Transactional
    public void updateNonExistingAutreCommerce() throws Exception {
        int databaseSizeBeforeUpdate = autreCommerceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutreCommerceMockMvc.perform(put("/api/autre-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autreCommerce)))
            .andExpect(status().isBadRequest());

        // Validate the AutreCommerce in the database
        List<AutreCommerce> autreCommerceList = autreCommerceRepository.findAll();
        assertThat(autreCommerceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAutreCommerce() throws Exception {
        // Initialize the database
        autreCommerceRepository.saveAndFlush(autreCommerce);

        int databaseSizeBeforeDelete = autreCommerceRepository.findAll().size();

        // Delete the autreCommerce
        restAutreCommerceMockMvc.perform(delete("/api/autre-commerces/{id}", autreCommerce.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AutreCommerce> autreCommerceList = autreCommerceRepository.findAll();
        assertThat(autreCommerceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

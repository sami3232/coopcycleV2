package fr.polytech.info4.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.polytech.info4.web.rest.TestUtil;

public class AutreCommerceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AutreCommerce.class);
        AutreCommerce autreCommerce1 = new AutreCommerce();
        autreCommerce1.setId(1L);
        AutreCommerce autreCommerce2 = new AutreCommerce();
        autreCommerce2.setId(autreCommerce1.getId());
        assertThat(autreCommerce1).isEqualTo(autreCommerce2);
        autreCommerce2.setId(2L);
        assertThat(autreCommerce1).isNotEqualTo(autreCommerce2);
        autreCommerce1.setId(null);
        assertThat(autreCommerce1).isNotEqualTo(autreCommerce2);
    }
}

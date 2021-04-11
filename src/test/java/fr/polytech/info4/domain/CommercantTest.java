package fr.polytech.info4.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.polytech.info4.web.rest.TestUtil;

public class CommercantTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commercant.class);
        Commercant commercant1 = new Commercant();
        commercant1.setId(1L);
        Commercant commercant2 = new Commercant();
        commercant2.setId(commercant1.getId());
        assertThat(commercant1).isEqualTo(commercant2);
        commercant2.setId(2L);
        assertThat(commercant1).isNotEqualTo(commercant2);
        commercant1.setId(null);
        assertThat(commercant1).isNotEqualTo(commercant2);
    }
}

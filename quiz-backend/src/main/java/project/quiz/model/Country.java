package project.quiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "countries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String capital;

    @Column(name = "iso2_code", unique = true, length = 2)
    private String iso2Code;

    @Column(name = "iso3_code", unique = true, length = 3)
    private String iso3Code; // e.g., USA, FRA, IND

    private String region;

    private String subregion;

    private Long population;

    @Column(name = "flag_png_url", length = 500)
    private String flagPngUrl;

    @Column(name = "flag_svg_url", length = 500)
    private String flagSvgUrl;
}

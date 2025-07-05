package project.quiz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import project.quiz.model.Country;
import project.quiz.service.CountryService;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/populate")
    public ResponseEntity<String> populateDatabase() {
        try {
            List<Country> countries = countryService.populateCountriesFromApi();
            return ResponseEntity.ok("Database populated with " + countries.size() + " countries.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error populating database: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    @GetMapping("/quiz")
    public ResponseEntity<List<Country>> getQuizCountries(@RequestParam(defaultValue = "10") int count) {
        if (count <= 0) {
            return ResponseEntity.badRequest().body(null);
        }
        List<Country> countries = countryService.getRandomCountries(count);
        return ResponseEntity.ok(countries);
    }
}

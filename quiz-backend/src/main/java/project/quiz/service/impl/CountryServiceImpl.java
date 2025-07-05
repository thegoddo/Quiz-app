package project.quiz.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import project.quiz.model.Country;
import project.quiz.repository.CountryRepository;
import project.quiz.service.CountryService;

import java.util.ArrayList;
import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${app.restcountries.api.url}")
    private String restCountriesApiUrl;

    public CountryServiceImpl(CountryRepository countryRepository, RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.countryRepository = countryRepository;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public List<Country> populateCountriesFromApi() {
        System.out.println("Attempting to fetch data from: " + restCountriesApiUrl);
        String jsonResponse = restTemplate.getForObject(restCountriesApiUrl, String.class);

        List<Country> countriesToSave = new ArrayList<>();
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            for (JsonNode countryNode : rootNode) {
                Country country = new Country();

                country.setName(countryNode.path("name").path("common").asText("Unknown Country"));

                JsonNode capitalNode = countryNode.path("capital");
                if (capitalNode.isArray() && capitalNode.size() > 0) {
                    country.setCapital(capitalNode.get(0).asText());
                } else {
                    country.setCapital(null); // Or "Unknown Capital"
                }

                country.setFlagPngUrl(countryNode.path("flags").path("png").asText(null));
                if (!"Unknown Country".equals(country.getName())) { // Only save valid names
                    countriesToSave.add(country);
                } else {
                    System.out.println("Skipping country due to missing name: " + countryNode.toPrettyString());
                }
            }

            countryRepository.deleteAll(); // Be cautious with this in production!
            System.out.println("Cleared existing country data.");

            List<Country> savedCountries = countryRepository.saveAll(countriesToSave);
            System.out.println("Successfully imported " + savedCountries.size() + " countries.");
            return savedCountries;

        } catch (Exception e) {
            System.err.println("Error parsing API response or saving data: " + e.getMessage());
            e.printStackTrace();
            return List.of(); // Return empty list on error
        }
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public List<Country> getRandomCountries(int count) {
        List<Country> allCountries = countryRepository.findAll();
        java.util.Collections.shuffle(allCountries); // Shuffles the list randomly
        return allCountries.stream().limit(count).toList();
    }
}

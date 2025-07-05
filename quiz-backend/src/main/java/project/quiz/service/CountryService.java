package project.quiz.service;

import project.quiz.model.Country;
import project.quiz.repository.CountryRepository;

import java.util.List;

public interface CountryService {
    public List<Country> populateCountriesFromApi();

    public List<Country> getAllCountries();

    public List<Country> getRandomCountries(int count);

}

package com.icc.web.service;

import com.icc.web.model.Book;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FakerService {
    private final Faker faker = new Faker();
    private final Random random = new Random();

    private static final String PICSUM_URL = "https://picsum.photos/600/400";
    private static final int REDIRECTION_CODE_MIN = 300;
    private static final int REDIRECTION_CODE_MAX = 399;

    public List<Book> generateBooks(int amountOfBooks) {
        return Stream.generate(
                        () -> {
                            try {
                                return generateBook();
                            } catch (IOException e) {
                                e.printStackTrace();
                                return null;
                            }
                        })
                .limit(amountOfBooks)
                .toList();
    }

    private Book generateBook() throws IOException {
        final int MIN_AMOUNT_OF_GENRES = 1;
        final int MAX_AMOUNT_OF_GENRES = 5;
        int numberOfGenres = random.nextInt(MIN_AMOUNT_OF_GENRES, MAX_AMOUNT_OF_GENRES);

        final int MAX_AMOUNT_OF_DECIMALS = 2;
        final int MIN_BOOK_PRICE = 200;
        final int MAX_BOOK_PRICE = 1000;
        Double price =
                faker.number().randomDouble(MAX_AMOUNT_OF_DECIMALS, MIN_BOOK_PRICE, MAX_BOOK_PRICE);

        List<String> genres = generateRandomGenres(numberOfGenres);
        LocalDateTime randomDate = generateRandomDate();
        String coverImageUrl = getImageUrlFromPicsum();

        return Book.builder()
                .title(faker.book().title())
                .description(faker.lorem().paragraph())
                .author(faker.book().author())
                .genres(genres)
                .price(price)
                .cover(coverImageUrl)
                .createdAt(randomDate)
                .build();
    }

    private List<String> generateRandomGenres(int numberOfGenres) {
        return Stream.generate(faker.book()::genre)
                .distinct()
                .limit(numberOfGenres)
                .filter(genre -> !genre.isEmpty())
                .toList();
    }

    private LocalDateTime generateRandomDate() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime pastDate = now.minusYears(5);
        long days = ChronoUnit.DAYS.between(pastDate.toLocalDate(), now.toLocalDate());
        long randomDays = faker.random().nextLong(days);
        return pastDate.plusDays(randomDays);
    }

    private String getImageUrlFromPicsum() throws IOException {
        URL url = URI.create(PICSUM_URL).toURL();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setInstanceFollowRedirects(false);
        connection.setRequestMethod("GET");
        connection.connect();

        int responseCode = connection.getResponseCode();

        if (responseCode < REDIRECTION_CODE_MIN || responseCode > REDIRECTION_CODE_MAX) {
            return url.toString();
        }

        String location = connection.getHeaderField("Location");
        if (location == null) {
            throw new IOException("No redirect location found in the response headers.");
        }

        url = URI.create(location).toURL();
        connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.connect();
        connection.getResponseCode();

        return url.toString();
    }
}

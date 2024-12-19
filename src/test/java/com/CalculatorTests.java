package com;

import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given; // Import JUnit Jupiter (JUnit 5) test annotation

public class CalculatorTests {

    @Test // Annotate the method as a JUnit test
    public void testAddition() {
        given()
            .contentType("application/json")
            .body("{ \"operation\": \"add\", \"number1\": 10, \"number2\": 20 }")
        .when()
            .post("http://playground1.azurewebsites.net/calculate")
        .then()
            .statusCode(200)
            .body("result", is(30.0F));
           // .time(lessThan(500L));
    }

    // ...existing code...
}

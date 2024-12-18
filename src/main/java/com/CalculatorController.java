package com;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*") // Allow all origins for testing purposes
public class CalculatorController {

    @PostMapping("/calculate")
    public CalculationResult calculate(@RequestBody CalculationRequest request) {
        double result;

        switch (request.getOperation()) {
            case "add":
                result = request.getNumber1() + request.getNumber2();
                break;
            case "subtract":
                result = request.getNumber1() - request.getNumber2();
                break;
            case "multiply":
                result = request.getNumber1() * request.getNumber2();
                break;
            case "divide":
                result = request.getNumber1() / request.getNumber2(); 
                break;
            case "area":
                result = 0.5 * request.getNumber1() * request.getNumber2();
                break;
            default:
                throw new IllegalArgumentException("Invalid operation"); 
        }

        return new CalculationResult(result);
    }
}

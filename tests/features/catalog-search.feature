@PST-008 @ui @gherkin
Feature: Catalog search
  As a Toolshop visitor
  I want to search the product catalog
  So that I can find relevant products

  Scenario: Searching for a product with no matches
    Given I am on the Toolshop catalog
    When I search for a product that does not exist
    Then no product cards should be displayed

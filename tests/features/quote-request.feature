@MOV-008 @ui @gherkin
Feature: Requesting a moving quote
  As a Movelo visitor
  I want a quote link prepared for the type of move I need
  So that I can start a WhatsApp conversation with the right context

  Scenario: Preparing a furniture move request
    Given I am on the Movelo landing page
    When I inspect the furniture quote option
    Then the quote link is prepared for WhatsApp without sending a message

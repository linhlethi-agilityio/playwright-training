@auth
@login
Feature: LO01 - PocketBase Login

  Background:
    Given I am on the login page

  @PK001
  Scenario: Should show validation error for empty login fields
    When I clear all fields and click Login
    Then I should see required field validation on email
    And I should remain on the login page

  @PK002
  Scenario Outline: Should show error for invalid credentials
    When I enter email "<email>" and password "<password>"
    And I click the Login button
    Then I should see error message "Invalid login credentials."
    And I should remain on the login page

    Examples:
      | email            | password  |
      | test@example.com | 123456789 |
      | wrong@test.com   | 123456    |

  @PK003
  Scenario: Should login successfully with valid credentials
    When I enter email "test@example.com" and password "123456"
    And I click the Login button
    Then I should be redirected to the dashboard

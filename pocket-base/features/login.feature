@auth
@login
Feature: LO01 - PocketBase Login

  Background:
    Given I am on the login page

  @PK001
  @PK002
  Scenario Outline: Should show error for invalid login
    When I enter email "<email>" and password "<password>"
    And I click the Login button
    Then I should see login error "<error>"
    And I should remain on the login page

    Examples:
      | email            | password  | error                      |
      |                  |           | fill out this field        |
      | test@example.com | 123456789 | Invalid login credentials. |
      | wrong@test.com   | 123456    | Invalid login credentials. |

  @PK003
  Scenario: Should login successfully with valid credentials
    When I enter email "test@example.com" and password "123456"
    And I click the Login button
    Then I should be redirected to the dashboard

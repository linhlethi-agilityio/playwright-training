@user
@create
Feature: Create User

  Background:
    Given I am on the users page
    When I click the New record button

  @PK009
  Scenario: Should create a new user with valid data
    When I create a user with the following data:
      | field           | value                |
      | email           | testuser@example.com |
      | password        | Test123456           |
      | username        | testuser             |
      | name            | Test User            |
      | emailVisibility | true                 |
    And I click the Create button
    Then the create API response status should be 200
    And the create API response should contain the correct user data
    And I should see the message "Successfully created record."
    And the user row in the table should contain:
      | field    | value                |
      | email    | testuser@example.com |
      | username | testuser             |
      | name     | Test User            |

  @PK010
  Scenario Outline: Should show validation error for <case>
    When I fill the form with "<case>" validation case
    And I click the Create button without expecting API response
    Then I should see field error "<error>" on "<field>"
    And the create form should still be visible

    Examples:
      | case                        | error               | field            |
      | empty email                 | fill out this field | email            |
      | empty password              | fill out this field | Password         |
      | empty password confirm      | fill out this field | Password confirm |
      | mismatched password confirm | values don't match. | Password confirm |

@user
@search
Feature: Search User

  Background:
    Given I have 1 prepared user on the search users page

  @PK007
  Scenario: Should show filtered user list when searching with a valid value
    When I search by the user email
    Then all results should contain the search value
    And I clear the search field

  @PK008
  Scenario: Should show no records when searching with an invalid value
    When I search for "nonexistent_xyz_2020"
    Then the API should return no users for "nonexistent_xyz_2020"
    And I should see the no records found message
    And I clear the search field

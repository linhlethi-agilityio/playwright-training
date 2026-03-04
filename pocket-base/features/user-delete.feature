@user
@delete
Feature: Delete User

  @PK011
  Scenario: Should delete a single user from the table
    Given I have 1 prepared user on the delete users page
    And the user exists in the table
    When I select the checkbox of the user to delete
    And I click the Delete selected button
    Then I should see the single delete confirmation dialog
    When I confirm the deletion
    Then the delete API response status should be 204
    And I should see the message "Successfully deleted the selected record."
    And the user should be removed from the table

  @PK012
  Scenario: Should delete two users from the table
    Given I have 2 prepared users on the delete users page
    And all users exist in the table
    When I select the checkboxes of all users to delete
    Then I should see "Selected"
    When I click the Delete selected button for multiple
    Then I should see the multiple delete confirmation dialog
    When I confirm the multiple deletion
    Then the delete API response status should be 204
    And I should see the message "Successfully deleted the selected records."
    And all users should be removed from the table

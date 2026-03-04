@user
@update
Feature: Update User

  @PK013
  Scenario: Should update an existing user successfully
    Given I have 1 prepared user on the update users page
    When I click the user row to open the edit form
    And I enable password change
    And I fill the update form with new data
    And I click the Save changes button
    Then the update API response status should be 200
    And the update API response should contain the correct updated data
    And I should see the message "Successfully updated record."
    And the updated user row in the table should match the API response

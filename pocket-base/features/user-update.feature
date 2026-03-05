@user
@update
Feature: Update User

  @PK013
  Scenario: Should update an existing user successfully
    Given I have 1 prepared user on the update users page
    When I click the user row to open the edit form
    And I enable password change
    And I fill the update form with the following data:
      | field    | value               |
      | email    | updated@example.com |
      | password | NewPassword123      |
      | username | updated_user        |
      | name     | Updated Name        |
    And I click the Save changes button
    Then the update API response status should be 200
    And the updated user row in the table should contain:
      | field    | value               |
      | email    | updated@example.com |
      | username | updated_user        |
      | name     | Updated Name        |
    And I should see the message "Successfully updated record."

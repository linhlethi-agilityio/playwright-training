@user
@sort
Feature: Sort User

  Background:
    Given I have 4 prepared users on the sort users page

  @PK004
  @PK006
  Scenario Outline: Should sort users by <column> in descending and ascending order
    When I click sort on column "<column>"
    Then column "<column>" should be sorted in descending order
    When I click sort on column "<column>"
    Then column "<column>" should be sorted in ascending order

    Examples:
      | column |
      | email  |
      | name   |

  @PK005
  Scenario: Should sort users by username in descending order
    When I click sort on column "username"
    Then column "username" should be sorted in descending order

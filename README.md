# CatProject - Helping cats organize themselves
## Must have
* Login
* [(Shared) ToDos](#what-is-a-todo---a-task)
* [(Shared) Lists](#what-is-a-list)
* [Events/meetings](#what-is-an-event)
* [Expence Tracker](#what-are-expense-tracker-functionalities) - has [expenses](#what-is-an-expense)
* [Travel Planner](#what-are-travel-planner-functionalities) - has [travels](#what-is-a-travel)

## Nice to have
* Integrate Google Calendar
* Notifications based on events
	- When someone has arrived at a destination
	- Birthdays
	- Reccuring notifications
	- Scheduled meetings/events/going outs
  * Reminder

* Customizable themes for each user
* Chrome extension
	- Quickly skim through lists
	- Add new items to lists
	- Open app

## [Trello board](https://trello.com/b/3KqpvFHp)

## [Figma prototype](https://www.figma.com/file/QYijIcEPN5W3Jw25dcAy5f8Z/CatProject?node-id=0%3A1)

# Description
## What is a ToDo - a task
* Required attributes:
	* Title
	* Category
* Optional attributes:
	* Date
	* Time
	* Location
	* Image
	* Shared - if shared should indicate if it is in progress

## What is a List?
* Required attrbitutes:
	* Title
	* [List Items](#what-is-a-list-item---checkbox-with-content) - can be added/removed dynamically(think Google keep)
* Optional attributes:
	* Shared

## What is a List item - checkbox with content
* Required attributes:
	* Content
	* Checked/unchecked
* Optional attributes:
	* Image

## What is an Event?
* Required attributes:
	* Title
	* Date
* Optional attributes:
	* Start/end date and/or time
	* Additional details/notes for the event
	* Location
	* Shared

## What are Expense tracker functionalities?
* Aggregate(sum) money spent for a period of time
* Aggregate(sum) money gained for a period of time
* How much money do I owe/have to get based on shared expenses
	> if I have paid full price for a shared dishwasher ($500) I have to get back $250.

## What is an Expense
* Required attributes:
	* Title
	* Type - income/expense
	* Amount
	* Currency(with some default value)
	* Date(with default for today)
* Optional attributes:
	* Category
	* Shared - who has paid or if it has been split evenly(cleared)

## What are Travel planner functionalities
* Aggregates [travels](#what-is-a-travel) for a period of time

## What is a Travel
* Required attributes:
	* Destination
	* Start date
	* End date
* Optional attributes:
	* Reservation
	* Ticket
	* Notes - can contain a list of needed documents
	* Link an existing list to the travel
	* Shared

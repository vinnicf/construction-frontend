# Construction Budgeting Web App
This web application is a front-end tool designed to facilitate the creation and management of construction budgets. It connects to an API to fetch relevant construction composition data and then performs various calculations and manipulations to present a user-friendly interface for budgeting.

## Features
Data Fetching: The app fetches construction compositions from an external API. Each composition represents a particular construction-related item, complete with information like cost, unit, and other relevant details.

Hierarchical Data Structure: Compositions are organized into stages (like "Foundations" or "Roofing") and sub-stages when necessary. This hierarchy ensures that the budgeting process is organized and understandable.

Interactive Table: Budget items are presented in a table format. This table is not just for display; users can click on items to edit them directly within the table. This interactivity ensures that budget adjustments are straightforward and intuitive.

Dynamic Calculations: When creating a construction budget, various calculations like quantities, unit costs, and the inclusion of a BDI (Budget Differential Index) are essential. The app automatically updates these values as the user inputs or changes data.

Sort and Filter: To enhance user experience, the app includes functionality to sort and filter the displayed compositions, making it easy to find, view, and edit specific items.

## How It Works
-When the app is initialized, it begins by fetching the necessary construction compositions from the API.
-These compositions are then processed and categorized into stages and sub-stages. Each item (be it a stage, sub-stage, or individual composition) is assigned a unique refId to maintain hierarchy and order.
-As users interact with the app, they can click on individual budget items in the table to edit them. As they make changes, the table dynamically updates to reflect the new budget calculations.
-Once all edits are finalized, users can save or export their budget, ensuring that their construction planning process is efficient and accurate.

## Future Enhancements
-Export Functionality: One potential future feature is the ability to export the finalized budget into various formats like PDF or Excel, facilitating sharing and presentation.
-More Detailed Analysis: With more data and user input, the app can provide insights into the budget, highlighting areas of high expenditure or potential savings.

## Tech Stack
-React: The primary library used for building the UI.
-Bootstrap: For styling and responsive design.
-Backend API: While this document focuses on the frontend, the app connects to a backend API that provides construction composition data.

## Conclusion

This Construction Budgeting Web App streamlines the traditionally complex task of creating construction budgets. By fetching real-world data and providing an interactive user interface, it transforms budgeting from a tedious chore into an efficient, intuitive process.
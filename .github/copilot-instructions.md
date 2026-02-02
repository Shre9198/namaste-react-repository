# GitHub Copilot Instructions for Namaste React

## Project Overview
This project is a React application that simulates a restaurant listing service. It fetches restaurant data and displays it with a shimmer effect while loading. The application allows users to filter restaurants based on ratings and search by name.

## Architecture
- **Components**: The main components include `Body`, `Header`, and `RestaurantCard`. The `Body` component handles the state and rendering of restaurant data.
- **Data Flow**: Data is fetched from a mock API or a local mock data file (`mockData.js`). The `Body` component manages the state of all restaurants and filtered results.
- **Service Boundaries**: The application primarily interacts with the restaurant data service and the UI components.

## Developer Workflows
- **Running the Application**: Use `npm start` to run the application in development mode.
- **Building for Production**: Use `npm run build` to create an optimized build of the application.
- **Testing**: Ensure to write tests for components using Jest and React Testing Library.

## Project Conventions
- **Component Structure**: Each component is placed in the `src/components` directory. Components should be named using PascalCase.
- **State Management**: Use React hooks (`useState`, `useEffect`) for managing component state and side effects.

## Integration Points
- **External Dependencies**: The project uses React and may include additional libraries for routing or state management as needed.
- **Cross-Component Communication**: Props are used to pass data between components, ensuring a unidirectional data flow.

## Examples
- **Filtering Restaurants**: The `Body` component includes a button to filter restaurants based on their average rating.
- **Searching Restaurants**: Users can search for restaurants by name using an input field in the `Body` component.

## Additional Notes
- Ensure to handle CORS issues when fetching data from external APIs. Use mock data as a fallback if necessary.

---
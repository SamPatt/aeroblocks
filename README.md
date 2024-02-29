# Aeroblocks

Aeroblocks is a React no code configurator, giving users the ability to visually display and arrange code blocks on a canvas.

## Technologies used

React DnD is used to handle the drag and drop functionality.

Aeroblocks talks to a Flask [backend server](https://github.com/SamPatt/aeroblocks-backend) hosting an API for user authentication, code lexing, and canvas storage.

## User Flow

The main `App` component uses `React-Router` to create four routes:

1. `HomePage` - Displays the registration / login
2. `CanvasSelection` - Displays a user's canvases to load
3. `CodeUploadForm`  - The interface for uploading new code
4. `CanvasPage` - Displays the main canvas

### HomePage

This page displays the `auth/LoginForm` and `auth/RegistrationForm` components, and manages the user's authentication with the `context/AuthContext` component.

### CanvasSelection

Once logged in, a call is made to check if the user has and canvases in their profile. If they do, they are shown the `canvas/CanvasSelection` component. Choosing a canvas loads the data into the `canvasData` state managed by `context/CanvasContext`, then navigates to the `CanvasPage`.

### CodeUploadForm

If the user is logged in and has no canvases in their profile, or if they select `New Canvas` from the Canvas dropdown menu, they are shown the `canvas/CodeUploadForm`. This allows them to choose from three example code selection, or add their own code. Submitting the code sends an API request to the server, which lexes the code and returns back a JSON object containing the `blocks`. An initial `grid` is created and combined with the `blocks` to make the `canvasData` state object, managed by `context/CanvasContext`. The user then moves to the `CanvasPage`.

### CanvasPage

This is the main display. It consists of a `BlockSelection` component on top of the page, and the `CanvasArea` component underneath.

When blocks are initialized on the server, they are given a `position` property which is null. `BlockSelection` displays any blocks with null position data, meaning the user hasn't yet interacted with them.

Once a user drags and drops a block onto the canvas, `canvasData` state is updated with position data for both the individual block and the grid array. `CanvasArea` displays any blocks with non-null position data.

### Header

The `common/Header` component displays the header, which contains a dropdown menu allowing the user to save canvases, load them, create new canvases, and log out.

The menu will only display on the `CanvasPage`.

## Next steps

### Undo / Redo

Adding the ability to undo or redo actions shouldn't be too difficult - since the canvas state is in a single JSON object, past states could be stored and loaded into state when needed.

### Building new code

Building code from the canvas state would be more difficult. Blocks have `input`, `output`, and `connection` fields, along with their `type`. Conditionals will need to be added, and then a flow determined. Given the grid structure, a flow could be create used top-left to bottom-right. Connections could also be given directionality.
# Earthshot Product Scores

This application is built with Next.js and captures user scores for the different products, by country, and then display them on a map.

## Getting Started

This was tested using Node v22.15.0. I have not tested older versions, although it may work.

After cloning the repo, copy `.env.example` as `.env` and add the keys. These should come from Emily via email.

Then, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Requirements

**Functional**:

- Users can post scores for each product & country combo with the following information
- Users can see all posts for a product & country combination
- Users can visualize all the country scores for a specific product in one or potentially multiple maps
- Frontend has the ability to switch between different products or all product scores are visually displayed somehow

**Non-functional**:

- Accessible
- Secure
- Performant
- Browser/device support
- Observability

## Tech Stack

- Next.js: for quick prototyping + performance
- MapBox for a fun challenge, supports interactivity, has a React-compatible library
- Tailwind CSS for styling
- Zod for schema validation
- Fly for hosting

## Architecture and Folder Structure

- using the new-ish AppRouter - built-in support for RSC, nested layouts
- components folder to hold non-route, potentially reusable code
- actions folder to hold server actions
- utils
- libs - holds functions to be used server-side (by server components, api, etc.)

## Implementation and Decisions

1. Data fetching & mutations

- Made server actions/server utils instead of hitting the FastAPI directly from the client so I could hide the API key
- Queried data from server components via libs
- Mutated data via server actions (actions folder)

2. Map integration

- create a Mapbox design
- ENV for public map key
- showing popover when clicking a country

3. Post(s)

- Auto updating the product in the URL when you hit the page so links can be shared
- use selector to change product
- ability to create a new post via form

## Future Work, Bugs, and Enhancements

- Passing the country name as a URL param but would preferred to have queried country info from some endpoint
- Wanted the popup to show if ISO is in the URL on page load but my quick centering function is not the best
- Add country ISO to the URL params and auto open/loading details popup
- Accounts and user management -> you currently make comments as anonymous and can delete anyone elses comments
- Better checking of URL params (invariant, make sure it's in the list)
- Zoom to selected country based on ISO URL param
- Pagination of comments
- BUG: if you click a country, then create a new comment, the country color recalculates but because the MapPopup does not update with the new value
- BUG: would have preferred to have the country labels go over top of the coloring label
- BUG: numbers are calculated and can be multiple digits -> should we truncate somewhere? ex. score of 42.555556666888
- Ability to delete a comment
- Ability to edit a comment
- Unit tests
- Better mobile experience

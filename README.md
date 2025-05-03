# Earthshot Product Scores

This application is built with Next.js and captures user scores for the different products, by country, and then display them on a map.

## Getting Started

This was tested using Node v22.15.0. I have not tested older versions, although it may work.

First, copy `.env.example` as `.env` and add the keys. These should come from Emily via email.

Then, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Decisions

- made server actions/server utils instead of hitting the FastAPI directly from the client to hide the API key
- passing the country name as a URL param but would preferred to have queried country info from some endpoint
- wanted the popup to show if ISO is in the URL on page load but my centering function is not the best

## Future Work and Enhancements

- add country ISO to the URL params and auto open/loading details
- accounts and user management -> you currently make comments as anonymous and can delete anyone elses comments
- better checking of URL params (invariant, make sure it's in the list)
- zoom to selected country based on ISO URL param
- Pagination
- Edit a comment
- BUG: if you click a country, then create a new comment, the country color recalculates but because the MapPopup does not update with the new value
- BUG: would have preferred to have the country labels go over top of the coloring label
- BUG: numbers are calculated and can be multiple digits -> should we truncate somewhere?
- Ability to delete a comment
- Unit tests

## Todo

- make dev deps are correct in package.json

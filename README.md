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

## Decisions

- Went with Next.js for quick prototyping, MapBox for a fun challenge, and Tailwind for styling
- Made server actions/server utils instead of hitting the FastAPI directly from the client so I could hide the API key
- Queried data from server components via libs
- Mutated data via server actions (actions folder)
- Passing the country name as a URL param but would preferred to have queried country info from some endpoint
- Wanted the popup to show if ISO is in the URL on page load but my quick centering function is not the best

## Future Work, Bugs, and Enhancements

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

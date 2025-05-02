# Earthshot Product Scores

This application is built with Next.js and captures user scores for the different products, by country, and then display them on a map.

## Getting Started

First, copy `.env.example` as `.env` and add the keys. These should come from Emily via email.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Function Specs

## Non-functional Specs

## Decisions

- made an API route instead of hitting the FastAPI directly to hide the API key
- passing the country name as a URL param but would preferred to have queried country info from some endpoint
- wanted the popup to show if ISO is in the URL on page load but my centering function is not the best

## Future Work and Enhancements

- add country ISO to the URL params and auto open/loading details
- accounts and user management -> you currently make comments as anonymous and can delete anyone elses comments
- better checking of URL params (invariant, make sure it's in the list)
- zoom to selected country based on ISO URL param
- Pagination
- Edit a comment

## Todo

- make dev deps are correct in package.json

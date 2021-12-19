# Kibana Clone

![](screen.gif)

## Built With
 - Next.js
 - Material UI
 - react-query
 - recharts

## Getting Started

1. Install Docker
2. Clone the repository
3. Run npm install
3. Run “docker-compose up -d” to install ElasticSearch and Kibana
4. Install kibana sample data “Sample web logs”
5. Create a env.local file that with `ELASTIC_SEARCH_NODE` set to your elastic search node url:
    
    Example:
    
    ```
    ELASTIC_SEARCH_NODE=http://localhost:9200
    ```

To run the development server:

```bash
npm run dev
```

To run a production build locally:

```bash
npm run start
```

To run tests:

```bash
npm run test
```

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Clone the repo onto your local machine
2. Run `npm i` in the project directory to install dependencies.
3. Run the development server. This will start the frontend and the backend.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open up Postman and make some requests, or do them via the UI (see #5 below)
- Create a discount, e.g.,:
```
POST -> http://localhost:3000/api/discount
HEADERS: { Key: 'Content-Type', Value: 'application/json' }
BODY: {
    "nthTransaction": 1,
    "discountCode": "discount10",
    "discountedAmount": 0.1
}
```

- Retrieve all discounts:
```
GET -> http://localhost:3000/api/discounts
```

- Check if a customer can use a discount:
```
GET -> http://localhost:3000/api/discount?discountCode=discount203&customerId=1
```

- Create a purchase, e.g.,:
```
POST -> http://localhost:3000/api/purchase
HEADERS: { Key: 'Content-Type', Value: 'application/json' }
{ 
    "discountCode": "discount20",
    "itemName": "candle",
    "originalPrice": 10,
    "customerId": 1
}

```

- Generate a report that returns the count of the purchases as well as the total count of discounts that were given out:
```
GET -> http://localhost:3000/api/report
```

5. Navigate to http://localhost:3000 in the browser 
6. Go to the /admin page and create some discount records
7. Go to the /customer page and create some purchases. You can use "Check discount code" to see if the discount code will work for that customerId

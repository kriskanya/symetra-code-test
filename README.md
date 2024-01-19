This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Assignment
### Description

Imagine an ecommerce store where the store owner gives out discounts to every nth transaction. Customers, as they login, get to see if they have discount and the appropriate discount code. Customers can then purchase items using the discount code if available. The store owner reviews at various times what the count of purchases that were made in the store as well as the total count of discounts that were given out.

### Goal: Develop API resources to enable:

An admin to set the n, and the discount code.
Customers to check if there is a discount code and then make a purchase with or without the discount code
Admin to see the report described above

### Stretch Goal:

Develop a simple UI with different pages for admin and customer

### Assumptions:

Server side state can be maintained all in memory, so no persistence layer is required
No authentication or authorization required on API/UI
Reports and any other data can be simple JSON – don’t worry about prettying it up

### Deliverables:

Publish your code on GitHub and share the link
Share documentation about how to run code

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
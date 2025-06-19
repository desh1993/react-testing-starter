// src/mocks/db.js
import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

const commerce = faker.commerce;

export const db = factory({
  // Create a "product" model,
  product: {
    // ...with these properties and value getters.
    id: primaryKey(faker.number.int),
    name: commerce.productName,
    price: () =>
      faker.number.int({
        min: 1,
        max: 100,
      }),
  },
});

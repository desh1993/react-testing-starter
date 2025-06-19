import { http, HttpResponse } from "msw";
import { products, categories } from "./data";
import { db } from "./db";

export const handlers = [
  /*
  http.get("/categories", () => {
    return HttpResponse.json(categories);
  }),

  http.get("/products", () => {
    return HttpResponse.json(products);
  }),

  http.get<{ id: string }>("/products/:id", ({ params }) => {
    const id = parseInt(params.id as string);
    const product = products.find((prod) => prod.id === id);

    if (!product) {
      return HttpResponse.json(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),
*/
  ...db.product.toHandlers("rest"),
];

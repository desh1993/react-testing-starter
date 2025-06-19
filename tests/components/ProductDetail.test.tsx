import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
// import { products } from "../mocks/data";
import { db } from "../mocks/db";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("ProductDetail", () => {
  let productId: number;

  beforeAll(() => {
    const product = db.product.create();
    productId = product.id;
  });

  afterAll(() => {
    db.product.deleteMany({
      where: {
        id: {
          equals: productId,
        },
      },
    });
  });

  const renderProductDetail = (productId: number) => {
    render(<ProductDetail productId={productId} />);
    return {
      getName: (name: RegExp) => screen.findByText(name),
      getPrice: (price: number) => screen.findByText(`Price: $${price}`),
      getNoProductFound: () =>
        screen.findByText(/The given product was not found./i),
      getError: () => {
        return screen.findByText(/Invalid ProductId/i);
      },
    };
  };

  it("Should return product name if correct product is found", async () => {
    const product = db.product.findFirst({
      where: {
        id: {
          equals: productId,
        },
      },
    });
    const { getName } = renderProductDetail(productId);

    const name = await getName(new RegExp(product!.name));

    expect(name).toBeInTheDocument();
  });

  it("Should return product price if correct product is found", async () => {
    const product = db.product.findFirst({
      where: {
        id: {
          equals: productId,
        },
      },
    });

    const { getPrice } = renderProductDetail(productId);

    const price = await getPrice(product!.price);

    expect(price).toBeInTheDocument();
  });

  it("Should return the given product was not found if no product was found", async () => {
    server.use(http.get("/products/1", () => HttpResponse.json(null)));

    const { getNoProductFound } = renderProductDetail(1);

    const message = await getNoProductFound();

    expect(message).toBeInTheDocument();
  });

  it("Should show 'Invalid ProductId' if productId is 0", async () => {
    server.use(http.get("/products/0", () => HttpResponse.error()));

    const { getError } = renderProductDetail(0);

    const error = await getError();

    expect(error).toBeInTheDocument();
  });
});

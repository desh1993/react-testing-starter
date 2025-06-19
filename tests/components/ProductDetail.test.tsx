import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { db } from "../mocks/db";
import { server } from "../mocks/server";
import { http, HttpResponse, delay } from "msw";

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

  it("Should render loading when fetching data", async () => {
    server.use(
      http.get("/products/1", async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<ProductDetail productId={productId} />);

    const loading = await screen.findByText(/loading/i);

    expect(loading).toBeInTheDocument();
  });

  it("Should remove the loading indicator if fetching data fails", async () => {
    server.use(
      http.get(`/products/${productId}`, async () => {
        await delay(100); // optional, helps ensure 'Loading...' is visible
        return HttpResponse.error();
      })
    );

    render(<ProductDetail productId={productId} />);

    // await screen.findByText(/loading/i); // wait until it renders

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i)); // wait until it disappears
  });

  it("Should remove the loading indicator after fetching data", async () => {
    server.use(
      http.get(`/products/${productId}`, async () => {
        await delay(100); // optional, helps ensure 'Loading...' is visible
        return HttpResponse.json(null);
      })
    );

    render(<ProductDetail productId={productId} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});

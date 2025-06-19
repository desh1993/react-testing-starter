import { it, expect, describe } from "vitest";
import { faker } from "@faker-js/faker";
import { db } from "./mocks/db";

describe("group", () => {
  it("Should respond with the categories", async () => {
    const product = db.product.create({ name: "Orange" });
    const count = db.product.count();
    console.log({ product, count });
  });
});

import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";
/**
 * Test case 1 : With empty array
 * Test case 2 : Render right src attribute
 */
describe("ProductImageGallery", () => {
  it("Should return null when empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
    expect(container.firstChild).toBeNull();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("Should render right image src", () => {
    const images = [
      "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];
    render(<ProductImageGallery imageUrls={images} />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(2);
    imgs.forEach((image, i) => {
      expect(image).toHaveAttribute("src", images[i]);
    });
  });
});

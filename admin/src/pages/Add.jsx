import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";

const sizesList = ["S", "M", "L", "XL", "XXL"];

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateImage = (index, file) => {
    const nextImages = [...images];
    nextImages[index] = file || null;
    setImages(nextImages);
  };

  const toggleSize = (size) => {
    setSizes((currentSizes) =>
      currentSizes.includes(size)
        ? currentSizes.filter((item) => item !== size)
        : [...currentSizes, size]
    );
  };

  const resetForm = () => {
    setImages([null, null, null, null]);
    setName("");
    setDescription("");
    setCategory("Women");
    setSubCategory("Topwear");
    setPrice("");
    setSizes([]);
    setBestseller(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!images.some(Boolean)) {
      toast.error("Please upload at least one product image");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please select at least one product size");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-6xl">
      <div className="mb-5 border-l-4 border-gray-800 bg-white px-4 py-3 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Add Product</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill the details, choose sizes, and upload product images.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <section className="rounded border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-gray-800">Product images</p>
              <p className="text-xs text-gray-500">Upload at least one image</p>
            </div>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {images.filter(Boolean).length}/4
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 xl:grid-cols-2">
            {images.map((image, index) => (
              <label
                key={`image-${index + 1}`}
                htmlFor={`image-${index + 1}`}
                className="flex h-20 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500 transition-colors hover:border-gray-600 hover:bg-white sm:h-24 xl:h-32"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product upload ${index + 1}`}
                    className="h-full w-full rounded object-cover"
                  />
                ) : (
                  <>
                    <span className="text-xl leading-none">+</span>
                    <span>Image {index + 1}</span>
                  </>
                )}
                <input
                  id={`image-${index + 1}`}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) =>
                    updateImage(index, event.target.files[0])
                  }
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-800">
                Product name
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Type here"
                required
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-800">
                Product description
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Write content here"
                required
                rows={3}
                className="w-full resize-none rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-800">
                Product category
              </label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              >
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-800">
                Sub category
              </label>
              <select
                value={subCategory}
                onChange={(event) => setSubCategory(event.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-800">
                Product Price
              </label>
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                type="number"
                min="1"
                placeholder="25"
                required
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-800">
                Product Sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {sizesList.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`min-w-10 rounded px-3 py-2 text-sm transition-colors ${
                      sizes.includes(size)
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between lg:col-span-2">
              <label className="flex cursor-pointer items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={bestseller}
                  onChange={() => setBestseller((current) => !current)}
                  className="h-4 w-4 accent-gray-800"
                />
                Add to bestseller
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800 disabled:bg-gray-500 sm:w-auto"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
};

export default Add;

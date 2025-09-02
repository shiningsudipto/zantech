import Share from "@/components/helper/Share";
import { baseUrl } from "@/constants/urls";
import { AxiosInstance } from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import { ProductDetails, Response } from "@/types/product.type";
import { CheckCircle2, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

const getLastId = (input: string): string => {
  const parts = input.split("-");
  return parts[parts.length - 1];
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  // console.log(slug);
  const res = await AxiosInstance.get(`/products/${getLastId(slug)}`);
  const data = res?.data as Response<ProductDetails>;
  // console.log(data);
  const {
    name,
    price,
    quantity,
    short_description,
    description,
    images,
    categories,
    tags,
  } = data?.data;

  const productUrl = baseUrl + "/" + slug;

  const isInStock = quantity > 0;
  const mainImage = images?.[0]?.path;
  const categoryName = categories?.[0]?.name || "Uncategorized";

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Product Image */}
          <div className="flex justify-center items-start">
            {mainImage ? (
              <div className="relative aspect-square w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={mainImage}
                  alt={name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-square w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div>
            <div className="mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {categoryName}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              {name}
            </h1>

            <div className="mb-6">
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                ৳{price?.toFixed(2)}
              </p>
              {isInStock ? (
                <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  <span>In Stock ({quantity} available)</span>
                </div>
              ) : (
                <div className="mt-2 text-sm text-red-500">Out of Stock</div>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {short_description}
            </p>

            {/* Actions: Quantity & Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <button
                disabled={!isInStock}
                className={cn(
                  "flex-grow inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm",
                  "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                  "disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
                )}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                className="inline-flex items-center justify-center px-4 py-3 text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                title="Add to Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
            {/* share */}
            <Share url={productUrl} name={name} />
          </div>
        </div>

        {/* Full Width Section: Description & Tags */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Description
          </h2>
          {/* Safely render HTML from the API response */}
          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Related Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;

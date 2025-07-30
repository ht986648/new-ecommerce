import FormSubmitButton from "@/components/formSubmitButtonts"; // fixed typo
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth/authOptions";
import { FaPlus, FaImage, FaDollarSign, FaTag, FaFileAlt, FaArrowLeft, FaUpload, FaEye } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);
  
  if (!name || !description || !imageUrl || !price) {
    throw new Error("Missing required fields");
  }
  
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  
  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-products");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-base-content/70 mb-4">
            <Link href="/" className="hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <span>Add Product</span>
          </div>

          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors duration-200 mb-6"
          >
            <FaArrowLeft />
            <span>Back to Products</span>
          </Link>

          {/* Page Title */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-focus rounded-2xl shadow-lg">
              <FaPlus className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Add New Product
              </h1>
              <p className="text-lg text-base-content/70 mt-2">
                Create a new product listing for your store
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300/50 backdrop-blur-sm">
          <div className="card-body p-8">
            <form action={addProduct} className="space-y-6">
              {/* Product Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold flex items-center gap-2">
                    <FaTag className="text-primary" />
                    Product Name
                  </span>
                  <span className="label-text-alt text-error">Required</span>
                </label>
                <input
                  required
                  name="name"
                  placeholder="Enter product name..."
                  className="input input-bordered input-lg w-full focus:input-primary transition-all duration-300 bg-base-100/80"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Choose a clear, descriptive name for your product
                  </span>
                </label>
              </div>

              {/* Product Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold flex items-center gap-2">
                    <FaFileAlt className="text-secondary" />
                    Description
                  </span>
                  <span className="label-text-alt text-error">Required</span>
                </label>
                <textarea
                  required
                  name="description"
                  placeholder="Describe your product features, benefits, and specifications..."
                  rows={4}
                  className="textarea textarea-bordered textarea-lg w-full focus:textarea-secondary transition-all duration-300 bg-base-100/80 resize-none"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Provide detailed information to help customers understand your product
                  </span>
                </label>
              </div>

              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold flex items-center gap-2">
                    <FaImage className="text-accent" />
                    Product Image
                  </span>
                  <span className="label-text-alt text-error">Required</span>
                </label>
                <div className="relative">
                  <input
                    required
                    name="imageUrl"
                    placeholder="https://example.com/product-image.jpg"
                    type="url"
                    className="input input-bordered input-lg w-full pl-12 focus:input-accent transition-all duration-300 bg-base-100/80"
                  />
                  <FaUpload className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                </div>
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Upload a high-quality image URL (JPG, PNG, WebP recommended)
                  </span>
                </label>
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold flex items-center gap-2">
                    <FaDollarSign className="text-success" />
                    Price (USD)
                  </span>
                  <span className="label-text-alt text-error">Required</span>
                </label>
                <div className="relative">
                  <input
                    required
                    name="price"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    className="input input-bordered input-lg w-full pl-12 focus:input-success transition-all duration-300 bg-base-100/80"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-success font-semibold">
                    $
                  </span>
                </div>
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Set a competitive price for your product
                  </span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="divider my-8"></div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                {/* Preview Button */}
                <button 
                  type="button"
                  className="btn btn-outline btn-lg gap-2 hover:btn-info transition-all duration-300"
                >
                  <FaEye />
                  Preview Product
                </button>

                {/* Submit Button */}
                <FormSubmitButton className="btn-primary btn-lg gap-2 min-w-[200px] hover:btn-primary-focus hover:scale-105 transition-all duration-300 shadow-lg">
                  <FaPlus />
                  Add Product
                </FormSubmitButton>
              </div>
            </form>

            {/* Help Section */}
            <div className="mt-8 p-6 bg-info/10 border border-info/20 rounded-lg">
              <h3 className="font-semibold text-info flex items-center gap-2 mb-3">
                <FaTag />
                Product Tips
              </h3>
              <ul className="text-sm text-base-content/70 space-y-2">
                <li>• Use high-quality images (minimum 800x600 pixels)</li>
                <li>• Write detailed descriptions with key features and benefits</li>
                <li>• Research competitive pricing for similar products</li>
                <li>• Include relevant keywords in your product name</li>
                <li>• Consider seasonal demand when setting prices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <div className="card-body text-center p-6">
              <FaImage className="text-3xl text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Image Guidelines</h3>
              <p className="text-sm text-base-content/70">
                Use clear, well-lit photos with white backgrounds for best results
              </p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20">
            <div className="card-body text-center p-6">
              <FaFileAlt className="text-3xl text-secondary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Description Tips</h3>
              <p className="text-sm text-base-content/70">
                Include dimensions, materials, care instructions, and key benefits
              </p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <div className="card-body text-center p-6">
              <FaDollarSign className="text-3xl text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Pricing Strategy</h3>
              <p className="text-sm text-base-content/70">
                Consider your costs, competitor prices, and target profit margin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

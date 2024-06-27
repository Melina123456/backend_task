import axios from "axios";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
const prisma = new PrismaClient();
async function fetchAndStoreProducts() {
    try {
        // Fetch product data from the API
        const response = await axios.get("https://dummyjson.com/products");
        const products = response.data.products;
        // Normalize and store data
        for (const product of products) {
            let category = await prisma.category.findUnique({
                where: { name: product.category },
            });
            // If category doesn't exist, create it
            if (!category) {
                category = await prisma.category.create({
                    data: { name: product.category },
                });
            }
            // Create product with relations
            await prisma.product.create({
                data: {
                    title: product.title,
                    description: product.description,
                    categoryId: category.id,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    rating: product.rating,
                    stock: product.stock,
                    brand: product.brand || null,
                    sku: product.sku,
                    weight: product.weight,
                    dimensions: product.dimensions
                        ? {
                            create: {
                                width: product.dimensions.width,
                                height: product.dimensions.height,
                                depth: product.dimensions.depth,
                            },
                        }
                        : undefined,
                    warrantyInformation: product.warrantyInformation,
                    shippingInformation: product.shippingInformation,
                    availabilityStatus: product.availabilityStatus,
                    returnPolicy: product.returnPolicy,
                    minimumOrderQuantity: product.minimumOrderQuantity,
                    meta: product.meta
                        ? {
                            create: {
                                createdAt: new Date(product.meta.createdAt),
                                updatedAt: new Date(product.meta.updatedAt),
                                barcode: product.meta.barcode,
                                qrCode: product.meta.qrCode,
                            },
                        }
                        : undefined,
                    images: {
                        create: product.images.map((image) => ({ url: image })),
                    },
                    tags: {
                        create: product.tags.map((tag) => ({ name: tag })),
                    },
                    reviews: {
                        create: product.reviews.map((review) => ({
                            rating: review.rating,
                            comment: review.comment,
                            date: new Date(review.date),
                            reviewerName: review.reviewerName,
                            reviewerEmail: review.reviewerEmail,
                        })),
                    },
                    thumbnail: product.thumbnail,
                },
            });
        }
        console.log("Data successfully stored in the database.");
    }
    catch (error) {
        console.error("Error fetching or storing data:", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
fetchAndStoreProducts();
//# sourceMappingURL=fetch_store.js.map
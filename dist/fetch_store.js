import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function fetchAndStoreData() {
    try {
        const response = await axios.get("https://dummyjson.com/products");
        const products = response.data.products;
        for (const product of products) {
            const dimension = product.dimensions
                ? await prisma.dimension.create({
                    data: {
                        width: product.dimensions.width,
                        height: product.dimensions.height,
                        depth: product.dimensions.depth,
                    },
                })
                : null;
            const meta = product.meta
                ? await prisma.meta.create({
                    data: {
                        createdAt: new Date(product.meta.createdAt),
                        updatedAt: new Date(product.meta.updatedAt),
                        barcode: product.meta.barcode,
                        qrCode: product.meta.qrCode,
                    },
                })
                : null;
            const category = await prisma.category.upsert({
                where: { name: product.category },
                update: {},
                create: { name: product.category },
            });
            const newProduct = await prisma.product.create({
                data: {
                    title: product.title,
                    description: product.description,
                    categoryId: category.id,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    rating: product.rating,
                    stock: product.stock,
                    brand: product.brand,
                    sku: product.sku,
                    weight: product.weight,
                    dimensionsId: dimension ? dimension.id : null,
                    warrantyInformation: product.warrantyInformation,
                    shippingInformation: product.shippingInformation,
                    availabilityStatus: product.availabilityStatus,
                    returnPolicy: product.returnPolicy,
                    minimumOrderQuantity: product.minimumOrderQuantity,
                    metaId: meta ? meta.id : null,
                    thumbnail: product.thumbnail,
                },
            });
            for (const tagName of product.tags) {
                await prisma.tag.create({
                    data: {
                        name: tagName,
                        productId: newProduct.id,
                    },
                });
            }
            for (const image of product.images) {
                await prisma.image.create({
                    data: {
                        url: image,
                        productId: newProduct.id,
                    },
                });
            }
            for (const review of product.reviews) {
                await prisma.review.create({
                    data: {
                        rating: review.rating,
                        comment: review.comment,
                        date: new Date(review.date),
                        reviewerName: review.reviewerName,
                        reviewerEmail: review.reviewerEmail,
                        productId: newProduct.id,
                    },
                });
            }
        }
        console.log("Data fetched and stored successfully");
    }
    catch (error) {
        console.error("Error fetching and storing data:", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
fetchAndStoreData();
//# sourceMappingURL=fetch_store.js.map
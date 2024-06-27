import AdminJS from "adminjs";
import express from "express";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

AdminJS.registerAdapter({ Database, Resource });

const PORT = 3000;

const start = async () => {
  const adminOptions = {
    resources: [
      {
        resource: { model: getModelByName("Product"), client: prisma },
        options: {
          listProperties: ["images", "title", "category", "price", "rating"],
        },
      },
      {
        resource: { model: getModelByName("Tag"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Dimension"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Image"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Review"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Category"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Meta"), client: prisma },
        options: {},
      },
    ],
  };
  const app = express();

  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();

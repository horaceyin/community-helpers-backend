/*
  Warnings:

  - You are about to drop the `CategoriesOnServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnServices" DROP CONSTRAINT "CategoriesOnServices_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnServices" DROP CONSTRAINT "CategoriesOnServices_service_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_providerId_fkey";

-- DropTable
DROP TABLE "CategoriesOnServices";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "ServiceCategory";

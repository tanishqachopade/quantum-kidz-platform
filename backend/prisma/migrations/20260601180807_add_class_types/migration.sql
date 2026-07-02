/*
  Warnings:

  - You are about to drop the column `name` on the `Class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[branchId,type]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('PLAYGROUP', 'NURSERY', 'JR_KG', 'SR_KG');

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "name",
ADD COLUMN     "type" "ClassType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Class_branchId_type_key" ON "Class"("branchId", "type");

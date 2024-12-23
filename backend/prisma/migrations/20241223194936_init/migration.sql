/*
  Warnings:

  - Added the required column `name` to the `Gist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gist" ADD COLUMN     "name" TEXT NOT NULL;

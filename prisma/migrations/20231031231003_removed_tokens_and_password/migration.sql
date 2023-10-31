/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserTokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coins_amount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTokens" DROP CONSTRAINT "UserTokens_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "UserTokens" DROP CONSTRAINT "UserTokens_user_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "coins_amount" BIGINT NOT NULL;

-- DropTable
DROP TABLE "UserTokens";

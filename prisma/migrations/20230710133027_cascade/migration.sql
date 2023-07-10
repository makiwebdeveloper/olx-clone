-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_category_group_id_fkey";

-- DropForeignKey
ALTER TABLE "FavoritePost" DROP CONSTRAINT "FavoritePost_post_id_fkey";

-- DropForeignKey
ALTER TABLE "FavoritePost" DROP CONSTRAINT "FavoritePost_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritePost" ADD CONSTRAINT "FavoritePost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritePost" ADD CONSTRAINT "FavoritePost_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_category_group_id_fkey" FOREIGN KEY ("category_group_id") REFERENCES "CategoryGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

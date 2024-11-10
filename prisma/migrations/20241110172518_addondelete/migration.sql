-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorid_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postid_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postid_fkey" FOREIGN KEY ("postid") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

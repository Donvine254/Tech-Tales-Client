-- CreateIndex
CREATE INDEX "Blog_slug_authorId_idx" ON "Blog"("slug", "authorId");

-- CreateIndex
CREATE INDEX "Comment_blogId_authorId_idx" ON "Comment"("blogId", "authorId");

-- CreateIndex
CREATE INDEX "SocialMedia_userId_idx" ON "SocialMedia"("userId");

-- CreateIndex
CREATE INDEX "User_handle_email_idx" ON "User"("handle", "email");

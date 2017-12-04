
#Name	                   #Path                #HTTP Verb	           #Purpose	                           #Mongoose Method

Index	           /blogs	                       GET	                  List all blogs	                   Blog.find().
New	             /blogs/new	                   GET	                  Show new blog form	               N/A
Create	         /blogs                        POST	                 Create a new blog,                  Blog.create().
                                                                     then redirect somewhere
Show	           /blogs/:id	                   GET	                 Show info about one                 Blog.findById().
                                                                     specific blog.	
Edit	           /blogs/:id/edit               GET	                 Show edit form for one blog.	       Blog.findById().
Update	         /blogs/:id	                   PUT	                 Update particular blog,             Blog.findByIdAndUpdate().
                                                                     then redirect somewhere	
Destroy	         /blogs/:id	                   DELETE	               Delete a particular blog,           Blog.findByIdAndRemove().
                                                                     then redirect somewhere
New              /blogs/:id/comments/new       GET                   Get a particular comment for        Blog.findById().
{Comments}                                                           specific blog        
Create           /blogs/:id/comments           POST                  Post a particular comment           Blog.findById()-
                                                                                                         Comment.create().  
Sign up          /register                     GET-POST              Create new account

Login            /login                        GET-POST              Login into existing account

Logout           /logout                       GET                   Logout from existing account
Subscribe        /subscribe                    POST                  Subscribe to specific blog
Like             /like                         POST                  Like to specific 
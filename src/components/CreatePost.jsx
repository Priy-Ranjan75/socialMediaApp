import { useContext, useRef } from "react";
import { PostList } from "../store/Post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostList);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => addPost(post));
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div class="mb-3">
        <label htmlFor="userId" class="form-label">
          Enter your user Id
        </label>
        <input
          type="text"
          ref={userIdElement}
          class="form-control"
          id="userId"
          placeholder="Your User Id"
        />
      </div>

      <div class="mb-3">
        <label htmlFor="title" class="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          class="form-control"
          id="title"
          placeholder="How are you feeling Today..."
        />
      </div>

      <div class="mb-3">
        <label htmlFor="title" class="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postBodyElement}
          rows="4"
          class="form-control"
          id="title"
          placeholder="Tell us more about it"
        />
      </div>

      <div class="mb-3">
        <label htmlFor="reactions" class="form-label">
          Number of Reactions
        </label>
        <input
          type="text"
          ref={reactionsElement}
          class="form-control"
          id="reactions"
          placeholder="How many people reacted to this post "
        />
      </div>

      <div class="mb-3">
        <label htmlFor="tags" class="form-label">
          Add Tags
        </label>
        <input
          type="text"
          ref={tagsElement}
          class="form-control"
          id="title"
          placeholder="Please enter your tags using space"
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Post
      </button>
    </form>
  );
};
export default CreatePost;
